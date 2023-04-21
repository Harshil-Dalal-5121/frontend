import React, { useState } from "react";

import {
  Button,
  Container,
  Grid,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { getData, model, saveData, tableFields } from "app/services/services";
import { useNavigate, useParams } from "react-router";
import useFetchRecord from "app/services/custom-hooks/useFetchRecord";
import ProjectTaskTable from "./sideTable/ProjectTaskTable";
import DialogBoxComponent from "app/components/Dialog";

const initialValues = {
  name: "",
  fromDate: "",
  parentProject: "",
  clientPartner: "",
  toDate: "",
  imputable: false,
  assignedTo: "",
  code: "",
};

const Form = () => {
  const [formData, setFormData] = useState(initialValues);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const navigate = useNavigate();

  const handleCancel = () => {
    setOpen(false);
  };

  const { id } = useParams();
  const { loading } = useFetchRecord(
    id,
    getData,
    setFormData,
    `${model}/${id}/fetch`,
    tableFields
  );

  const handleChange = (e) => {
    const { name, value, checked } = e.target || {};
    setFormData({
      ...formData,
      [name]: name === "imputable" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    setErrors(errors);
    if (Object.keys(errors)?.length === 0) {
      handleClickOpen();
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = () => {
    saveData(`${model}`, formData);
    navigate("/projects");
    setOpen(false);
  };

  const validateForm = () => {
    const error = {};
    const errorMessages = {
      name: `Task Name is required`,
      code: `Code is required`,
      fromDate: `Start Date is required`,
      toDate: `End Date is required`,
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
            height: "50vh",
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
            {id ? "Update Project Data" : "Add a new Project"}
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
                onSubmit={handleSubmit}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    id="name"
                    name="name"
                    error={errors?.name ? true : false}
                    helperText={errors?.name ? `${errors.name}` : ""}
                    value={formData.name || ""}
                    onChange={handleChange}
                    label="Add Name"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    id="code"
                    name="code"
                    error={errors?.code ? true : false}
                    helperText={errors?.code ? `${errors.code}` : ""}
                    onChange={handleChange}
                    value={formData.code || ""}
                    label="Add Code"
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12} sm={8}>
                  <TextField
                    fullWidth
                    id="fromDate"
                    name="fromDate"
                    error={errors?.fromDate ? true : false}
                    helperText={errors?.fromDate ? `${errors.fromDate}` : ""}
                    onChange={handleChange}
                    type="date"
                    variant="outlined"
                    value={formData.fromDate?.slice(0, 10) || ""}
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField
                    fullWidth
                    id="toDate"
                    name="toDate"
                    error={errors?.toDate ? true : false}
                    helperText={errors?.toDate ? `${errors.toDate}` : ""}
                    onChange={handleChange}
                    type="date"
                    variant="outlined"
                    value={formData.toDate?.slice(0, 10) || ""}
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Typography style={{ margin: "10px" }}>
                    Imputable :
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Switch
                      onClick={handleChange}
                      checked={formData?.imputable}
                      color="success"
                      name="imputable"
                    />
                  </Stack>
                </Grid>

                {id ? (
                  <>
                    <Grid item xs={8}>
                      <Typography component="h6" variant="h6">
                        Task Tree
                      </Typography>
                      <ProjectTaskTable id={id} />
                    </Grid>
                  </>
                ) : null}
                <Grid item xs={12} sm={8}>
                  <Button
                    variant="contained"
                    color="success"
                    type="submit"
                    style={{ margin: "0 10px" }}
                    onClick={handleSubmit}
                  >
                    {id ? "Update" : "Add"}
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => {
                      navigate("/projects");
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

      <DialogBoxComponent
        type="Save"
        id={id}
        open={open}
        handleCancel={handleCancel}
        handleClose={handleClose}
        onClick={handleSave}
      />
    </>
  );
};

export default Form;
