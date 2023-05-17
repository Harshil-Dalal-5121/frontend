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
import FlashMessage from "app/components/FlashMessage";

const initialValues = {
  name: "",
  taskDate: "",
  taskEndDate: "",
  project: "",
  priority: "",
  status: {
    name: "New",
    id: 1,
    version: 0,
  },
  typeSelect: "task",
  parentTask: "",
  progressSelect: 0,
  assignedTo: {
    code: "admin",
    fullName: "Admin",
    id: 1,
    version: 6,
  },
};

const taskStatus = [
  {
    name: "New",
    id: 5,
    version: 0,
  },
  {
    name: "In progress",
    id: 6,
    version: 0,
  },
  {
    name: "Done",
    id: 7,
    version: 0,
  },
  {
    name: "Canceled",
    id: 8,
    version: 0,
  },
];

const errorMessages = {
  name: `Subject is required`,
  project: `Project  is required`,
  assignedTo: `This field is required`,
  priority: `Hell`,
};

const TaskForm = () => {
  const [formData, setFormData] = useState(initialValues);
  const [open, setOpen] = useState(false);
  const [error, setErrors] = useState({});
  const [parentTasks, setParentTasks] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

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
    const errors = handleValidation(
      formData,
      errorMessages,
      taskDate,
      taskEndDate
    );
    setErrors(errors);
    if (Object.keys(errors)?.length === 0) {
      setOpen(true);
    }
  };

  const fetchAssignedApi = async ({ value }) => {
    return await formApi.taskAssigned({
      value: value,
      projectId: project?.id,
    });
  };

  const handleSave = async () => {
    const response = await api.save(formData);
    setShowMessage(response ? true : false);
    setOpen(false);
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
            <Typography component="h3" variant="h3" p={2} align="center">
              {id ? "Update Task Data" : "Add a new Task"}
            </Typography>
            <Grid
              id="container"
              className={styles["box-shadow"]}
              p={1}
              container
              spacing={2}
              justifyContent="space-between"
            >
              <Grid item xs={10}>
                <Grid
                  id="form-fields"
                  item
                  p={1}
                  xl={12}
                  className={styles["border-radius-2"]}
                >
                  {id ? (
                    <Grid id="status" container>
                      <Grid id="status-bar" item xs={12}>
                        <StatusSelect
                          data={formData}
                          status={taskStatus}
                          setData={setFormData}
                          property="status"
                          defaultValue={status?.name || "New"}
                        />
                      </Grid>
                    </Grid>
                  ) : null}
                  <Grid id="subject" container spacing={2} p={1}>
                    <Grid id="subject" item sm={9} xs={12}>
                      <InputLabel error={error?.name ? true : false}>
                        Subject
                      </InputLabel>
                      <TextField
                        value={name || ""}
                        onChange={(e, value) =>
                          onChange?.change(e, formData, setFormData)
                        }
                        fullWidth
                        error={error?.name ? true : false}
                        helperText={error?.name ? `${error.name}` : ""}
                        id="name"
                        name="name"
                        variant="standard"
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} id="project-parentTask" p={2}>
                    <Grid id="project" item sm={5.5} xs={12}>
                      <Selection
                        label="Parent Project"
                        name="project"
                        fetchApi={formApi?.availableProject}
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

                    <Grid id="parentTask" item sm={5.5} xs={12}>
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
                  <Grid id="assignedto" container spacing={2} p={2}>
                    <Grid id="assigned to" item sm={6} xs={12}>
                      {project ? (
                        <>
                          <Selection
                            fetchApi={fetchAssignedApi}
                            value={assignedTo}
                            error={error?.assignedTo ? true : false}
                            helperText={
                              error?.assignedTo ? `${error.assignedTo}` : ""
                            }
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

                      <Grid container p={2} spacing={4}>
                        <Grid id="priority" item sm={5} xs={12}>
                          <Selection
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
                        <Grid id="progress-bar" item sm={5} xs={12}>
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

                  <Grid container p={2} spacing={2}>
                    <Grid id="fromDate" item sm={5} xs={12}>
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
                    <Grid id="to date" item sm={5} xs={12}>
                      <InputLabel error={error?.endDate ? true : false}>
                        To Date
                      </InputLabel>
                      <TextField
                        id="taskEndDate"
                        name="taskEndDate"
                        type="date"
                        error={error?.endDate ? true : false}
                        helperText={error?.endDate ? `${error.endDate}` : ""}
                        value={taskEndDate || ""}
                        onChange={(e) =>
                          onChange?.change(e, formData, setFormData)
                        }
                        variant="standard"
                        fullWidth
                        InputProps={{
                          inputProps: { min: taskDate?.slice(0, 10) || "" },
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={2} xs={12}>
                <Grid id="add-btn" item md={12} xs={5} m={1} p={1}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="info"
                    type="submit"
                    className={styles["box-shadow"]}
                    startIcon={
                      id ? (
                        <EditIcon className={styles["form-btn-icon"]} />
                      ) : (
                        <Add className={styles["form-btn-icon"]} />
                      )
                    }
                    onClick={handleSubmit}
                  >
                    {id ? "Update" : "Add"}
                  </Button>
                </Grid>
                <Grid id="cancel-btn" item md={12} xs={5} m={1} p={1}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="error"
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
      {showMessage ? (
        <FlashMessage
          message={id ? "Record Updated!" : "New Record Added!"}
          path="tasks"
        />
      ) : null}
    </>
  );
};

export default TaskForm;
