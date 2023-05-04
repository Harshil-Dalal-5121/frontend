import React, { useEffect, useState } from "react";
import useFetchRecord from "app/services/custom-hooks/useFetchRecord";
import {
  Button,
  CircularProgress,
  Grid,
  Typography,
  Container,
  TextField,
  Slider,
} from "@mui/material";
import DialogBoxComponent from "app/components/Dialog";
import Selection from "app/components/Selection";
import StatusSelect from "app/components/StatusSelect";

import { useNavigate, useParams } from "react-router";
import api from "../tickets/api";
import formApi from "./api";
import styles from "./Forms.module.css";

const initialValues = {
  name: "",
  taskDate: "",
  taskEndDate: "",
  project: "",
  priority: "",
  typeSelect: "ticket",
  progressSelect: 0,
};

const TicketForm = () => {
  const [formData, setFormData] = useState(initialValues);
  const [open, setOpen] = useState(false);
  const [error, setErrors] = useState({});
  const [parentTasks, setParentTasks] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();
  const { loading } = useFetchRecord(id, api.fetch, setFormData);

  const {
    name,
    taskDate,
    taskEndDate,
    project,
    priority,
    status,
    parentTask,
    progressSelect,
    assignedTo,
  } = formData;

  const validateForm = () => {
    const error = {};
    const errorMessages = {
      name: `Subject is required`,
      project: `Project  is required`,
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
  };

  const handleProjectChange = async (e, value) => {
    setFormData({
      ...formData,
      project: {
        id: value?.id || "",
        fullName: value?.fullName || "",
        code: value?.code || null,
      },
    });

    const options = await formApi.parentTask({
      projectId: value?.id,
      taskId: +id,
    });
    setParentTasks(options);
  };

  const handleAssignChange = (e, value) => {
    setFormData({
      ...formData,
      assignedTo: {
        id: value?.id,
        fullName: value?.fullName || "",
      },
    });
  };

  const handleParentTaskChange = (e, value) => {
    setFormData({
      ...formData,
      parentTask: {
        id: value?.id,
        name: value?.name,
        fullName: value?.fullName,
        version: value?.version,
      },
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
    setOpen(false);
    api.save(formData);
    navigate(-1);
  };

  useEffect(() => {
    if (project) {
      (async () => {
        const options = await formApi.parentTask({
          projectId: project?.id,
          taskId: +id,
        });
        setParentTasks(options || []);
      })();
    }
  }, [project, id]);
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
            {id ? "Update Task Data" : "Add a new Task"}
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
                      data={formData}
                      setData={setFormData}
                      defaultValue={status?.name || "New"}
                    />
                  </Grid>
                ) : null}

                <Grid item xs={12} sm={8}>
                  <TextField
                    value={name || ""}
                    onChange={handleChange}
                    fullWidth
                    error={error?.name ? true : false}
                    helperText={error?.name ? `${error.name}` : ""}
                    id="name"
                    name="name"
                    label="Subject"
                  />
                </Grid>
                <Grid align="center" item xs="auto" sm={10}>
                  <Typography>Progress :</Typography>
                  <Slider
                    value={progressSelect || 0}
                    id="progressSelect"
                    name="progressSelect"
                    onChange={handleChange}
                    sx={{ width: 300 }}
                    defaultValue={0}
                    valueLabelDisplay="auto"
                    step={10}
                    color="info"
                    min={0}
                    max={100}
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Selection
                    label="Parent Project"
                    fetchApi={formApi?.projects}
                    value={project}
                    getOptionLabel={(option) => {
                      return option?.fullName;
                    }}
                    handleChange={handleProjectChange}
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Selection
                    label=" Priority"
                    fetchApi={formApi?.priority}
                    value={priority}
                    getOptionLabel={(option) => {
                      return option?.name;
                    }}
                    handleChange={handleProjectChange}
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Selection
                    label=" Parent Task"
                    fetchApi={formApi?.parentTask}
                    value={parentTask}
                    options={parentTasks}
                    getOptionLabel={(option) => {
                      return option?.fullName;
                    }}
                    handleChange={handleParentTaskChange}
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Selection
                    fetchApi={formApi?.assignedTo}
                    value={assignedTo}
                    getOptionLabel={(option) => {
                      return option?.fullName;
                    }}
                    handleChange={handleAssignChange}
                    label="Assigned To"
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField
                    fullWidth
                    onChange={handleChange}
                    value={taskDate || ""}
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
                    value={taskEndDate || ""}
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
