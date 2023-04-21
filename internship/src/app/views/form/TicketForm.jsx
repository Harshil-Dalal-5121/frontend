import React, { forwardRef, useState } from "react";
import {
  saveData,
  model,
  getData,
  ticketTableFields,
} from "app/services/services";
import AutoCompleteCompenent from "app/components/AutoCompleteCompenent";

import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Slide,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { useTheme } from "@emotion/react";
import { Slider } from "@mui/material";
import { CircularProgress } from "@mui/material";
import useFetchRecord from "app/services/custom-hooks/useFetchRecord";

const initialValues = {
  name: "",
  taskDate: "",
  taskEndDate: "",
  project: "",
  priority: "",
  typeSelect: "ticket",
  progressSelect: 0,
};

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TicketForm = () => {
  const [formData, setFormData] = useState(initialValues);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { id } = useParams();
  const { loading } = useFetchRecord(
    id,
    getData,
    setFormData,
    `${model}Task/${id}/fetch`,
    ticketTableFields
  );

  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target || {};
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === "taskDate") {
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    setErrors(errors);
    if (Object.keys(errors)?.length === 0) {
      handleClickOpen();
    }
  };

  const handleProjectChange = (e, value) => {
    setFormData({
      ...formData,
      project: {
        id: value.id,
        fullName: value.fullName,
        code: value.code || null,
      },
    });
  };

  const handlePriorityChange = (e, value) => {
    setFormData({
      ...formData,
      priority: {
        id: value.id,
        name: value.name,
        $version: 0,
      },
    });
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = () => {
    setOpen(false);
    saveData(`${model}Task`, formData);
    navigate(-1);
  };

  // const validateForm = () => {
  //   const error = {};

  //   if (!formData.name) {
  //     error.name = `Task Name is required`;
  //   }
  //   if (!formData.project) {
  //     error.project = `Project  is required`;
  //   }
  //   if (!formData.priority) {
  //     error.priority = `priority  is required`;
  //   }
  //   if (!formData.taskDate) {
  //     error.taskDate = `Start Date is required`;
  //   }
  //   if (!formData.taskEndDate) {
  //     error.taskEndDate = `End Date is required`;
  //   }
  //   if (formData.taskDate > formData.taskEndDate) {
  //     error.taskEndDate = `End Date is invalid`;
  //   }
  //   return error;
  // };

  const validateForm = () => {
    const error = {};
    const errorMessages = {
      name: `Task Name is required`,
      project: `Project  is required`,
      priority: `Priority  is required`,
      taskDate: `Start Date is required`,
      taskEndDate: `End Date is required`,
    };

    Object.keys(errorMessages).forEach((key) => {
      if (!formData[key]) {
        error[key] = errorMessages[key];
      }
    });

    if (formData.taskDate > formData.taskEndDate) {
      error.taskEndDate = `End Date is invalid`;
    }

    return error;
  };

  return (
    <>
      {loading ? (
        <Container
          style={{
            height: "52vh",
            width: "100vw",

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress
            style={{
              margin: "auto",
            }}
          />
        </Container>
      ) : (
        <>
          <Typography
            component="h3"
            variant="h3"
            style={{
              margin: "5vh auto",
            }}
            align="center"
          >
            {id ? "Update Ticket Data" : "Add a new Ticket"}
          </Typography>
          <Container
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <form id="form" onSubmit={handleSubmit}>
              <Grid
                container
                spacing={2}
                id="form"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={12} sm={8}>
                  <TextField
                    value={formData?.name || ""}
                    onChange={handleChange}
                    fullWidth
                    error={errors?.name ? true : false}
                    helperText={errors?.name ? `${errors.name}` : ""}
                    id="name"
                    name="name"
                    label="Add Name"
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Typography>Progress :</Typography>
                  <Slider
                    value={formData?.progressSelect || 0}
                    id="progressSelect"
                    name="progressSelect"
                    onChange={handleChange}
                    sx={{ width: 300 }}
                    aria-label="Temperature"
                    defaultValue={0}
                    valueLabelDisplay="auto"
                    step={10}
                    color="secondary"
                    min={0}
                    max={100}
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <AutoCompleteCompenent
                    data={formData}
                    setData={setFormData}
                    errors={errors}
                    title="project"
                    handleChange={handleProjectChange}
                    noOptionsText="No Project"
                    isOptionEqualToValue={(option, value) =>
                      option.fullName === value.fullName
                    }
                    getOptionLabel={(option) => {
                      return option.fullName;
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <AutoCompleteCompenent
                    data={formData}
                    setData={setFormData}
                    errors={errors}
                    title="priority"
                    handleChange={handlePriorityChange}
                    noOptionsText="Set Priority"
                    isOptionEqualToValue={(option, value) =>
                      option.name === value.name
                    }
                    getOptionLabel={(option) => {
                      return option.name;
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField
                    fullWidth
                    onChange={handleChange}
                    value={formData?.taskDate || ""}
                    error={errors?.taskDate ? true : false}
                    helperText={errors?.taskDate ? `${errors.taskDate}` : ""}
                    id="taskDate"
                    name="taskDate"
                    type="date"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField
                    fullWidth
                    onChange={handleChange}
                    value={formData?.taskEndDate || ""}
                    error={errors?.taskEndDate ? true : false}
                    helperText={
                      errors?.taskEndDate ? `${errors.taskEndDate}` : ""
                    }
                    id="taskEndDate"
                    name="taskEndDate"
                    type="date"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Button
                    variant="contained"
                    color="success"
                    type="submit"
                    onClick={handleSubmit}
                    style={{ margin: "0 10px" }}
                  >
                    {id ? "Update" : "Add"}
                  </Button>

                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    Back
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Container>
        </>
      )}
      <Dialog
        open={open}
        fullScreen={fullScreen}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        maxWidth="xs"
        onClose={handleClose}
        aria-describedby="responsive-alert-dialog-slide-description"
      >
        <DialogTitle>{" Question"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Do you want to {id ? "update" : "save"} this data ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" color="secondary">
            {id ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TicketForm;
