import {
  Button,
  CircularProgress,
  Grid,
  Typography,
  Container,
  TextField,
  InputLabel,
} from "@mui/material";
import DialogBox from "app/components/Dialog";
import ProgressBar from "app/components/ProgressBar";
import Selection from "app/components/Selection";
import StatusSelect from "app/components/StatusSelect";

import useFetchRecord from "app/services/custom-hooks/useFetchRecord";
import handleValidation from "app/utils/handleValidation";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../tasks/api";
import formApi from "./api";
import styles from "./Forms.module.css";
import onChange from "../../utils/onChange";
import EditIcon from "@mui/icons-material/Edit";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Add } from "@mui/icons-material";
import LoadOnOpenSelection from "app/components/LoadOnOpenSelection";

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
      project: value?.fullName
        ? { id: value?.id, fullName: value?.fullName, code: value?.code }
        : "",
    });

    const options = await formApi.parentTask({
      projectId: value?.id,
      taskId: +id,
    });
    setParentTasks(options);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = handleValidation(formData, errorMessages);
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
          <div className={styles["container"]}>
            <Typography
              component="h3"
              variant="h3"
              className={styles["p-2"]}
              align="center"
            >
              {id ? "Update Task Data" : "Add a new Task"}
            </Typography>
            <Grid
              id="container"
              className={`${styles["p-2"]} ${styles["box-shadow"]}`}
              container
              spacing={2}
              justifyContent="center"
            >
              <Grid item xl={10} className={styles["p-2"]}>
                <Grid
                  id="form-fields"
                  item
                  xl={12}
                  className={styles["border-radius-2"]}
                >
                  {id ? (
                    <Grid
                      id="status"
                      container
                      spacing={2}
                      className={styles["p-2"]}
                    >
                      <Grid id="status-bar" item xl={12}>
                        <StatusSelect
                          data={formData}
                          setData={setFormData}
                          defaultValue={status?.name || "New"}
                        />
                      </Grid>
                    </Grid>
                  ) : null}
                  <Grid
                    id="subject"
                    container
                    spacing={2}
                    className={styles["p-2"]}
                  >
                    <Grid id="subject" item xl={9}>
                      <TextField
                        value={name || ""}
                        onChange={(e) =>
                          onChange?.change(e, formData, setFormData)
                        }
                        fullWidth
                        error={error?.name ? true : false}
                        helperText={error?.name ? `${error.name}` : ""}
                        id="name"
                        name="name"
                        variant="standard"
                        label="Subject"
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    spacing={2}
                    id="project-parentTask"
                    className={styles["p-2"]}
                  >
                    <Grid id="project" item xl={5.5}>
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
                        handleChange={(e, value) => {
                          handleProjectChange(e, value);
                        }}
                      />
                    </Grid>

                    <Grid id="parentTask" item xl={5.5}>
                      {project ? (
                        <>
                          <Selection
                            label=" Parent Task"
                            fetchApi={formApi?.parentTask}
                            value={parentTask}
                            options={parentTasks}
                            getOptionLabel={(option) => {
                              return option?.fullName;
                            }}
                            handleChange={(e, value) =>
                              onChange?.parentTask(
                                e,
                                value,
                                formData,
                                setFormData
                              )
                            }
                          />
                        </>
                      ) : (
                        <>
                          <InputLabel>Parent Task</InputLabel>
                        </>
                      )}
                    </Grid>
                  </Grid>
                  <Grid
                    id="assignedto"
                    container
                    spacing={2}
                    className={styles["p-2"]}
                  >
                    <Grid id="assigned to" item xl={6}>
                      {project ? (
                        <>
                          <Selection
                            fetchApi={formApi?.assignedTo}
                            value={assignedTo}
                            getOptionLabel={(option) => {
                              return option?.fullName;
                            }}
                            handleChange={(e, value) =>
                              onChange?.assignedTo(
                                e,
                                value,
                                formData,
                                setFormData
                              )
                            }
                            label="Assigned To"
                          />
                        </>
                      ) : (
                        <>
                          <InputLabel>Assigned To</InputLabel>
                          <TextField
                            id="assignedTo"
                            defaultValue="Admin"
                            InputProps={{
                              readOnly: true,
                              disableUnderline: true,
                            }}
                            variant="standard"
                          />
                        </>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                {project ? (
                  <>
                    <Grid container id="Characteristics">
                      <Typography component="h6" variant="h6">
                        Characteristics
                      </Typography>

                      <Grid container className={styles["p-2"]} spacing={4}>
                        <Grid id="priority" item xl={5}>
                          <LoadOnOpenSelection
                            label=" Priority"
                            fetchApi={formApi?.priority}
                            value={priority}
                            getOptionLabel={(option) => {
                              return option?.name;
                            }}
                            handleChange={(e, value) =>
                              onChange?.priority(
                                e,
                                value,
                                formData,
                                setFormData
                              )
                            }
                          />
                        </Grid>
                        <Grid id="progress-bar" item xl={5}>
                          <InputLabel>Progress</InputLabel>
                          <ProgressBar
                            name="progressSelect"
                            value={progressSelect}
                            step={10}
                            onChange={(e) =>
                              onChange?.change(e, formData, setFormData)
                            }
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </>
                ) : (
                  <></>
                )}

                <Grid container id="dates" xl={12}>
                  <Typography component="h6" variant="h6">
                    Dates
                  </Typography>
                  <hr style={{ backgroundColor: "rgba(0, 0, 0, 0.15)" }} />
                  <Grid container className={styles["p-2"]} spacing={2}>
                    <Grid id="fromDate" item xl={5}>
                      <InputLabel>From Date</InputLabel>
                      <TextField
                        fullWidth
                        onChange={(e) =>
                          onChange?.change(e, formData, setFormData)
                        }
                        value={taskDate || ""}
                        id="taskDate"
                        name="taskDate"
                        type="date"
                        variant="standard"
                      />
                    </Grid>
                    <Grid id="to date" item xl={5}>
                      <InputLabel>To Date</InputLabel>

                      <TextField
                        fullWidth
                        onChange={(e) =>
                          onChange?.change(e, formData, setFormData)
                        }
                        value={taskEndDate || ""}
                        id="taskEndDate"
                        name="taskEndDate"
                        type="date"
                        variant="standard"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xl={2}>
                <Grid
                  id="add-btn"
                  item
                  xl={12}
                  className={`${styles["box-shadow"]} ${styles["m-y-1"]}`}
                >
                  <Button
                    fullWidth
                    variant="contained"
                    color="success"
                    type="submit"
                    startIcon={
                      id ? (
                        <Add className={styles["form-btn-icon"]} />
                      ) : (
                        <EditIcon className={styles["form-btn-icon"]} />
                      )
                    }
                    onClick={handleSubmit}
                  >
                    {id ? "Update" : "Add"}
                  </Button>
                </Grid>
                <Grid
                  id="cancel-btn"
                  item
                  xl={12}
                  className={styles["box-shadow"]}
                >
                  <Button
                    fullWidth
                    variant="contained"
                    color="warning"
                    startIcon={
                      <ArrowBackIosIcon className={styles["form-btn-icon"]} />
                    }
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    Back
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </div>
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
