import React, { useState } from "react";

import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { Slider } from "@mui/material";
import { CircularProgress } from "@mui/material";

import {
  saveData,
  model,
  getData,
  ticketTableFields,
} from "app/services/services";
import AutoCompleteCompenent from "app/components/AutoComplete";
import useFetchRecord from "app/services/custom-hooks/useFetchRecord";
import DialogBoxComponent from "app/components/Dialog";

import styles from "./Forms.module.css";
import StatusSelect from "../../components/StatusSelect";

const initialValues = {
  name: "",
  taskDate: "",
  taskEndDate: "",
  project: "",
  priority: "",
  typeSelect: "ticket",
  progressSelect: 0,
};
const status = [
  {
    name: "New",
    id: "5",
  },
  {
    name: "In progress",
    id: "6",
  },
  {
    name: "Done",
    id: "7",
  },
  {
    name: "Canceled",
    id: "8",
  },
];

const TicketForm = () => {
  const [formData, setFormData] = useState(initialValues);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});

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
        <Container className={styles["loading-container"]}>
          <CircularProgress className={styles["loading"]} />
        </Container>
      ) : (
        <>
          <Typography
            component="h3"
            variant="h3"
            className={styles["form-heading"]}
            align="center"
          >
            {id ? "Update Ticket Data" : "Add a new Ticket"}
          </Typography>
          <Container className={styles["form-container"]}>
            <form id="form" onSubmit={handleSubmit}>
              <Grid
                container
                spacing={2}
                id="form"
                justifyContent="center"
                alignItems="center"
              >
                {id ? (
                  <Grid item xs={12} sm={8}>
                    <StatusSelect
                      options={status}
                      data={formData}
                      setData={setFormData}
                    />
                  </Grid>
                ) : null}
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
                    className={styles["form-btn"]}
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

export default TicketForm;
