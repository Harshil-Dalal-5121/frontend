import React, { useState } from "react";
import {
  Button,
  Container,
  debounce,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { Slider } from "@mui/material";
import { CircularProgress } from "@mui/material";

import {
  saveData,
  model,
  getData,
  taskTableFields,
  getOptions,
  fetchOptions,
  getPriority,
  fetchParentTask,
  fetchAssign,
} from "app/services/services";
import useFetchRecord from "app/services/custom-hooks/useFetchRecord";
import AutoCompleteComponent from "app/components/AutoComplete";
import DialogBoxComponent from "app/components/Dialog";

import styles from "./Forms.module.css";
import StatusSelect from "../../components/StatusSelect";

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
  const [opsLoading, setOpsLoading] = useState(false);
  const [projectOptions, setProjectOptions] = useState([]);
  const [priorityOptions, setPriorityOptions] = useState([]);
  const [parentTasks, setParentTasks] = useState([]);
  const [assigned, setAssigned] = useState([]);

  const { id } = useParams();
  const { loading } = useFetchRecord(
    id,
    getData,
    setFormData,
    `${model}Task/${id}/fetch`,
    taskTableFields
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
  };

  const handleProjectInputChange = async (e, value) => {
    const projectReqBody = {
      data: {
        code: value,
        fullName: value,
        _domainContext: {},
      },
      fields: ["id", "fullName", "code"],
    };

    await debounce(async () => {
      setOpsLoading(true);
      await fetchOptions(getOptions, setProjectOptions, projectReqBody);
      setOpsLoading(false);
    }, 1000)();
  };

  const handleProjectChange = async (e, value) => {
    setFormData({
      ...formData,
      project: {
        id: value.id || "",
        fullName: value.fullName || "",
        code: value.code || null,
      },
    });

    const domain = await fetchParentTask(value.id, id);
    setParentTasks(domain);
  };

  const handlePriorityInputChange = async (e, value) => {
    const priorityReqBody = {
      data: {
        name: value,
        _domain: "self.id IN (1,2,3,4)",
        _domainContext: {
          _model: "com.axelor.apps.project.db.ProjectTask",
          _typeSelect: "task",
        },
      },
      fields: ["id", "name"],
    };

    await debounce(async () => {
      setOpsLoading(true);
      await fetchOptions(getPriority, setPriorityOptions, priorityReqBody);
      setOpsLoading(false);
    }, 1000)();
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

  const handleAssignInputChange = async () => {
    const assignReqBody = {
      data: {
        _domain: "self.id IN(1)",
        _domainContext: {
          _typeSelect: "task",
          _model: "com.axelor.apps.project.db.ProjectTask",
        },
        operator: "and",
        criteria: [],
      },
      fields: [
        "tradingName",
        "blocked",
        "name",
        "activateOn",
        "fullName",
        "expiresOn",
        "activeCompany",
        "group",
      ],
    };

    await debounce(async () => {
      setOpsLoading(true);
      await fetchOptions(fetchAssign, setAssigned, assignReqBody);
      setOpsLoading(false);
    }, 1000)();
  };

  const handleAssignChange = (e, value) => {
    setFormData({
      ...formData,
      assignedTo: {
        id: value.id,
        fullName: value.fullName,
      },
    });
  };

  const handleParentTaskInputChange = async (e, value) => {
    const parenTaskReqBody = {
      fullName: value,
      name: value,
    };

    await debounce(async () => {
      setOpsLoading(true);
      const domain = await fetchParentTask(
        formData?.project?.id,
        id,
        parenTaskReqBody
      );
      setParentTasks(domain);
      setOpsLoading(false);
    }, 1000)();
  };

  const handleParentTaskChange = (e, value) => {
    setFormData({
      ...formData,
      parentTask: {
        id: value.id,
        name: value.name,
        fullName: value.fullName,
        version: value.version,
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
    saveData(`${model}Task`, formData);
    console.log("formData >>>", formData);
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
      parentTask: `Parent Task is required`,
      assignedTo: `AssignedTo is required`,
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
                    handleChange={handleProjectChange}
                    noOptionsText="No Project"
                    isOptionEqualToValue={(option, value) =>
                      option.fullName === value.fullName
                    }
                    getOptionLabel={(option) => {
                      return option.fullName;
                    }}
                    handleInputChange={handleProjectInputChange}
                    options={projectOptions?.map((a) => {
                      return {
                        id: a.id || "",
                        fullName: a.fullName || "",
                        code: a.code || null,
                      };
                    })}
                    opsLoading={opsLoading}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <AutoCompleteComponent
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
                    handleInputChange={handlePriorityInputChange}
                    options={priorityOptions?.map((a) => {
                      return {
                        id: a.id || "",
                        name: a.name || "",
                      };
                    })}
                    opsLoading={opsLoading}
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <AutoCompleteComponent
                    data={formData}
                    setData={setFormData}
                    errors={errors}
                    title="parentTask"
                    handleChange={handleParentTaskChange}
                    noOptionsText="No Tasks"
                    isOptionEqualToValue={(option, value) =>
                      option.fullName === value.fullName
                    }
                    getOptionLabel={(option) => {
                      return option.fullName;
                    }}
                    handleInputChange={handleParentTaskInputChange}
                    options={parentTasks?.map((a) => {
                      return {
                        id: a.id || "",
                        name: a.name || "",
                        fullName: a.fullName || "",
                        version: a.version || "",
                      };
                    })}
                    opsLoading={opsLoading}
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <AutoCompleteComponent
                    data={formData}
                    setData={setFormData}
                    errors={errors}
                    title="assignedTo"
                    handleChange={handleAssignChange}
                    noOptionsText="No Data"
                    isOptionEqualToValue={(option, value) =>
                      option.fullName === value.fullName
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
                    opsLoading={opsLoading}
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
