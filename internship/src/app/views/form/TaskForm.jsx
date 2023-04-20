import React, { forwardRef, useEffect, useState } from "react";
import {
  getOptions,
  getPriority,
  fetchOptions,
  saveData,
  model,
  getData,
  taskTableFields,
} from "app/services/services";
import { debounce } from "@mui/material/utils";
import {
  Autocomplete,
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
  typeSelect: "task",
  progressSelect: 0,
};

const priorityReqBody = {
  data: {
    criteria: [],
    operator: "and",
    _domain: "self.id IN (1,2,3,4)",
    fields: ["name", "technicalTypeSelect"],
    limit: 40,
  },
};

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TaskForm = () => {
  const [formData, setFormData] = useState(initialValues);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const [projectOptions, setProjectOptions] = useState([]);
  const [priority, setPriority] = useState([]);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchOptions(getPriority, setPriority, priorityReqBody);
    };

    fetchData();
  }, []);

  const handleInputChange = async (event) => {
    const optionReqBody = {
      data: {
        code: event.target.value,
        fullName: event.target.value,

        _domainContext: {},
      },
      fields: ["id", "fullName", "code"],
    };
    await debounce(async () => {
      await fetchOptions(getOptions, setProjectOptions, optionReqBody);
    }, 1000)();
  };

  const projectOps = projectOptions.map((a) => ({
    id: a.id,
    fullName: a.fullName,
    name: a.name,
    code: a.code || null,
  }));

  const priorityOps = priority.map((a) => ({
    id: a.id,
    name: a.name,
    $version: 0,
  }));

  const handleChange = (e) => {
    const { name, value } = e.target || {};
    setFormData({
      ...formData,
      [name]: value,
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
    navigate(-1);
  };

  const validateForm = () => {
    const error = {};

    if (!formData.name) {
      error.name = `Task Name is required`;
    }
    if (!formData.project) {
      error.project = `Project  is required`;
    }
    if (!formData.priority) {
      error.priority = `priority  is required`;
    }
    if (!formData.taskDate) {
      error.taskDate = `Start Date is required`;
    }
    if (!formData.taskEndDate) {
      error.taskEndDate = `End Date is required`;
    }
    if (formData.taskDate > formData.taskEndDate) {
      error.taskEndDate = `End Date is invalid`;
    }
    return error;
  };
  const { id } = useParams();
  const { loading } = useFetchRecord(
    id,
    getData,
    setFormData,
    `${model}Task/${id}/fetch`,
    taskTableFields
  );
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
            {id ? "Update Task Data" : "Add a new Task"}
          </Typography>
          <Container
            style={{
              height: "100vh",
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
                  <Autocomplete
                    fullWidth
                    id="project"
                    name="project"
                    value={formData?.project || null}
                    options={projectOps}
                    onInputChange={handleInputChange}
                    getOptionLabel={(option) => {
                      return option.fullName;
                    }}
                    noOptionsText="Add Project"
                    isOptionEqualToValue={(option, value) =>
                      option.fullName === value.fullName
                    }
                    onChange={(e, newValue) => {
                      setFormData({
                        ...formData,
                        project: {
                          id: newValue.id,
                          fullName: newValue.fullName,
                          code: newValue.code || null,
                        },
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Project"
                        error={errors?.project ? true : false}
                        helperText={errors?.project ? `${errors.project}` : ""}
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <>
                              {loading ? (
                                <CircularProgress color="inherit" size={20} />
                              ) : null}
                              {params.InputProps.endAdornment}
                            </>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Autocomplete
                    fullWidth
                    id="priority"
                    name="priority"
                    value={formData?.priority || null}
                    options={priorityOps}
                    getOptionLabel={(option) => {
                      return option.name;
                    }}
                    isOptionEqualToValue={(option, value) =>
                      option.name === value.name
                    }
                    onChange={(e, newValue) => {
                      setFormData({
                        ...formData,
                        priority: {
                          id: newValue.id,
                          name: newValue.name,
                          $version: 0,
                        },
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Priority"
                        error={errors?.priority ? true : false}
                        helperText={
                          errors?.priority ? `${errors.priority}` : ""
                        }
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <>
                              {loading ? (
                                <CircularProgress color="inherit" size={20} />
                              ) : null}
                              {params.InputProps.endAdornment}
                            </>
                          ),
                        }}
                      />
                    )}
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

export default TaskForm;
