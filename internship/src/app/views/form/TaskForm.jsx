import React, { useEffect, useState } from "react";
import api from "../tasks/api";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { Slider } from "@mui/material";
import { CircularProgress } from "@mui/material";
import useFetchRecord from "app/services/custom-hooks/useFetchRecord";
import AutoCompleteComponent from "app/components/AutoComplete";
import DialogBoxComponent from "app/components/Dialog";

import styles from "./Forms.module.css";
import StatusSelect from "../../components/StatusSelect";
import { useDebounce } from "app/services/custom-hooks/useDebounce";
import formApi from "./api";

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

const TaskForm = () => {
  const [formData, setFormData] = useState(initialValues);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [parentProjectOpsLoading, setParentProjectOpsLoading] = useState(false);
  const [assignedOpsLoading, setAssignedOpsLoading] = useState(false);
  const [priorityOpsLoading, setPriorityOpsLoading] = useState(false);
  const [parentTaskLoading, setParentTaskLoading] = useState(false);
  const [projectOptions, setProjectOptions] = useState([]);
  const [priorityOptions, setPriorityOptions] = useState([]);
  const [parentTasks, setParentTasks] = useState([]);
  const [assigned, setAssigned] = useState([]);

  const { id } = useParams();
  const { loading } = useFetchRecord(id, api.fetch, setFormData);

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
  };

  const handleProjectInputChange = async (e, value) => {
    setParentProjectOpsLoading(true);
    const options = await formApi.projects(value);
    setProjectOptions(options?.data?.data);
    setParentProjectOpsLoading(false);
  };

  const delayedProjectSearch = useDebounce(handleProjectInputChange);

  const handleProjectChange = async (e, value) => {
    setFormData({
      ...formData,
      project: {
        id: value?.id || "",
        fullName: value?.fullName || "",
        code: value?.code || null,
      },
    });

    const options = await formApi.parentTask(value?.id, id);
    setParentTasks(options?.data?.data || []);
  };

  useEffect(() => {
    if (formData?.project) {
      (async () => {
        const options = await formApi.parentTask(formData?.project?.id, id);
        setParentTasks(options?.data?.data || []);
      })();
    }
  }, [formData?.project, id]);

  const handlePriorityInputChange = async (e, value) => {
    setPriorityOpsLoading(true);
    const options = await formApi.priority(value);
    setPriorityOptions(options?.data?.data);

    setPriorityOpsLoading(false);
  };

  const delayedPrioritySearch = useDebounce(handlePriorityInputChange);

  const handlePriorityChange = (e, value) => {
    setFormData({
      ...formData,
      priority: {
        id: value?.id,
        name: value?.name,
        $version: 0,
      },
    });
  };

  const handleAssignInputChange = async () => {
    setAssignedOpsLoading(true);
    const options = await formApi.assignedTo();
    setAssigned(options?.data?.data);
    setAssignedOpsLoading(false);
  };

  const handleAssignChange = (e, value) => {
    setFormData({
      ...formData,
      assignedTo: {
        id: value?.id,
        fullName: value?.fullName,
      },
    });
  };

  const handleParentTaskInputChange = async (e, value) => {
    const options = await formApi.parentTask(formData?.project?.id, id, value);
    setParentTasks(options);
    setParentTasks(options?.data?.data);
    setParentTaskLoading(false);
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

  const delayedParentSearch = useDebounce(handleParentTaskInputChange);

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
                      options={status}
                      data={formData}
                      setData={setFormData}
                      defaultValue={formData?.status?.name || "New"}
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
                    label="Subject"
                  />
                </Grid>
                <Grid align="center" item xs="auto" sm={10}>
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
                <Grid item xs={12} sm={4}>
                  <AutoCompleteComponent
                    data={formData}
                    setData={setFormData}
                    errors={errors}
                    title="project"
                    label="Parent project"
                    handleChange={handleProjectChange}
                    noOptionsText="No Project"
                    isOptionEqualToValue={(option, value) =>
                      option.fullName === value?.fullName ||
                      value?.fullName === ""
                    }
                    getOptionLabel={(option) => {
                      return option.fullName;
                    }}
                    handleInputChange={delayedProjectSearch}
                    options={projectOptions?.map((a) => {
                      return {
                        id: a.id || "",
                        fullName: a.fullName || "",
                        code: a.code || null,
                      };
                    })}
                    opsLoading={parentProjectOpsLoading}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <AutoCompleteComponent
                    data={formData}
                    setData={setFormData}
                    errors={errors}
                    title="priority"
                    label="Priority"
                    handleChange={handlePriorityChange}
                    noOptionsText="Set Priority"
                    isOptionEqualToValue={(option, value) =>
                      option.name === value?.name || value?.name === ""
                    }
                    getOptionLabel={(option) => {
                      return option.name;
                    }}
                    handleInputChange={delayedPrioritySearch}
                    options={priorityOptions?.map((a) => {
                      return {
                        id: a.id || "",
                        name: a.name || "",
                      };
                    })}
                    opsLoading={priorityOpsLoading}
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <AutoCompleteComponent
                    data={formData}
                    setData={setFormData}
                    errors={errors}
                    title="parentTask"
                    label="Parent Task"
                    handleChange={handleParentTaskChange}
                    noOptionsText="No Tasks"
                    isOptionEqualToValue={(option, value) =>
                      option.fullName === value?.fullName ||
                      value?.fullName === ""
                    }
                    getOptionLabel={(option) => {
                      return option.fullName;
                    }}
                    handleInputChange={delayedParentSearch}
                    options={parentTasks?.map((a) => {
                      return {
                        id: a.id || "",
                        name: a.name || "",
                        fullName: a.fullName || "",
                        version: a.version || "",
                      };
                    })}
                    opsLoading={parentTaskLoading}
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <AutoCompleteComponent
                    data={formData}
                    setData={setFormData}
                    errors={errors}
                    label="Assigned To"
                    title="assignedTo"
                    handleChange={handleAssignChange}
                    noOptionsText="No Data"
                    isOptionEqualToValue={(option, value) =>
                      option.fullName === value?.fullName ||
                      value?.fullName === ""
                    }
                    getOptionLabel={(option) => {
                      return option.fullName;
                    }}
                    handleInputChange={handleAssignInputChange}
                    options={assigned?.map((a) => {
                      return {
                        id: a.id || "",
                        fullName: a.fullName || "",
                      };
                    })}
                    opsLoading={assignedOpsLoading}
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

export default TaskForm;
