import {
  Button,
  CircularProgress,
  Grid,
  Typography,
  Container,
  TextField,
  Slider,
} from "@mui/material";
import DialogBox from "app/components/Dialog";
import Selection from "app/components/Selection";
import StatusSelect from "app/components/StatusSelect";

import useFetchRecord from "app/services/custom-hooks/useFetchRecord";
import handleValidate from "app/utils/handleValidate";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../tasks/api";
import formApi from "./api";
import styles from "./Forms.module.css";
import onChange from "./onChange";

const initialValues = {
  name: "",
  taskDate: "",
  taskEndDate: "",
  project: "",
  priority: "",
  status: "",
  typeSelect: "task",
  parentTask: "",
  progressSelect: 0,
  assignedTo: "",
};

const errorMessages = {
  name: `Subject is required`,
  project: `Project  is required`,
};

const regex = {
  name: /^[a-zA-Z]{3,20}/,
};

const regexMessege = {
  name: "Invalid Subject Name",
};
const TaskForm = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = handleValidate(formData, regex, regexMessege, errorMessages);
    setErrors(errors);
    if (Object.keys(errors)?.length === 0) {
      setOpen(true);
    }
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
                    onChange={(e) => onChange?.change(e, formData, setFormData)}
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
                    onChange={(e) => onChange?.change(e, formData, setFormData)}
                    sx={{ width: 300 }}
                    defaultValue={0}
                    valueLabelDisplay="auto"
                    step={10}
                    color={
                      progressSelect <= 20
                        ? "primary"
                        : progressSelect > 20 && progressSelect <= 50
                        ? "warning"
                        : progressSelect > 50 && progressSelect <= 80
                        ? "info"
                        : "success"
                    }
                    min={0}
                    max={100}
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Selection
                    label="Parent Project"
                    name="project"
                    fetchApi={formApi?.projects}
                    value={project}
                    error={error?.project ? true : false}
                    helperText={error?.project ? `${error.project}` : ""}
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
                    handleChange={(e, value) =>
                      onChange?.priority(e, value, formData, setFormData)
                    }
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
                    handleChange={(e, value) =>
                      onChange?.parentTask(e, value, formData, setFormData)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Selection
                    fetchApi={formApi?.assignedTo}
                    value={assignedTo}
                    getOptionLabel={(option) => {
                      return option?.fullName;
                    }}
                    handleChange={(e, value) =>
                      onChange?.assignedTo(e, value, formData, setFormData)
                    }
                    label="Assigned To"
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField
                    fullWidth
                    onChange={(e) => onChange?.change(e, formData, setFormData)}
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
                    onChange={(e) => onChange?.change(e, formData, setFormData)}
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
      <DialogBox
        type="Save"
        id={id}
        open={open}
        handleCancel={() => {
          setOpen(false);
        }}
        handleClose={() => {
          setOpen(false);
        }}
        onClick={handleSave}
      />
    </>
  );
};

export default TaskForm;
