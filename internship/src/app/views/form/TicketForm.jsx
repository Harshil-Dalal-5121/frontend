import React, { forwardRef, useEffect, useState } from "react";
import {
  getTicket,
  getOptions,
  getPriority,
  saveTicket,
} from "app/services/services";

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

function valuetext(value) {
  return `${value}°C`;
}

const TicketForm = () => {
  const [formData, setFormData] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [projectOptions, setProjectOptions] = useState([]);
  const [priority, setPriority] = useState([]);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [verify, setVerify] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const optionReqBody = {
    data: {
      _domain: "self.projectStatus.isCompleted = false",
      _domainContext: {
        _project: null,
        _projectIds: [0],
        _typeSelect: "ticket",
        toInvoice: false,
        hasDateOrFrequencyChanged: false,
        "project.isShowStatus": true,
        discountAmount: "0",
        typeSelect: "ticket",
        isFirst: true,
        progressSelect: 0,
        unitPrice: "0",
        plannedProgress: "0",
        invoiced: false,
        isTaskRefused: false,
        isPaid: false,
        "project.isShowTimeSpent": false,
        totalRealHrs: "0",
        "project.isShowFrequency": false,
        "project.isShowTaskCategory": true,
        isPrivate: false,
        doApplyToAllNextTasks: false,
        discountTypeSelect: 3,
        "project.isShowProgress": true,
        "project.invoicingSequenceSelect": 0,
        isOrderAccepted: false,
        quantity: "0",
        assignment: 2,
        "project.isShowPlanning": true,
        isOrderProposed: false,
        exTaxTotal: "0",
        totalPlannedHrs: "0",
        invoicingType: "",
        "project.isShowSection": true,
        priceDiscounted: "0",
        budgetedTime: "0",
        "project.isShowPriority": true,
        taskDate: "2023-04-12",
        project: null,
        assignedTo: {
          code: "admin",
          fullName: "Admin",
          id: "1",
        },
        attrs: "{}",
        _model: "com.axelor.apps.project.db.ProjectTask",
      },
    },
    fields: ["id", "fullName", "name", "code"],
    limit: 10,
  };

  const priorityReqBody = {
    data: {
      criteria: [],
      operator: "and",
      _domain: "self.id IN (1,2,3,4)",
      _domainContext: {
        _project: null,
        _projectIds: [0],
        _typeSelect: "ticket",
        toInvoice: false,
        hasDateOrFrequencyChanged: false,
        "project.isShowStatus": true,
        discountAmount: "0",
        typeSelect: "ticket",
        isFirst: true,
        progressSelect: 70,
        unitPrice: "0",
        plannedProgress: "70",
        invoiced: false,
        isTaskRefused: false,
        isPaid: false,
        "project.isShowTimeSpent": false,
        totalRealHrs: "0",
        "project.isShowFrequency": false,
        "project.isShowTaskCategory": true,
        isPrivate: false,
        doApplyToAllNextTasks: false,
        discountTypeSelect: 3,
        "project.isShowProgress": true,
        "project.invoicingSequenceSelect": 0,
        isOrderAccepted: false,
        quantity: "0",
        assignment: 2,
        "project.isShowPlanning": true,
        isOrderProposed: false,
        exTaxTotal: "0.00",
        totalPlannedHrs: "0",
        invoicingType: 3,
        "project.isShowSection": true,
        priceDiscounted: "0",
        budgetedTime: "0",
        "project.isShowPriority": true,
        taskDate: "2023-04-13",
        project: {
          id: 2,
          isShowTaskCategory: true,
          invoicingSequenceSelect: 0,
          isShowPlanning: true,
          isShowStatus: true,
          fullName: "SO0011-123 Services_project",
          isShowFrequency: false,
          isShowTimeSpent: false,
          isShowPriority: true,
          isShowSection: true,
          isShowProgress: true,
        },
        assignedTo: {
          code: "admin",
          fullName: "Admin",
          id: 1,
        },
        name: "Test 7",
        membersUserSet: null,
        projectTaskCategory: null,
        priority: {
          name: "Normal",
          id: 2,
        },
        status: {
          name: "New",
          id: 5,
        },
        taskEndDate: "2023-04-14",
        attrs: "{}",
        _model: "com.axelor.apps.project.db.ProjectTask",
      },
      fields: ["name", "technicalTypeSelect"],
      limit: 40,
    },
  };

  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    getOptions(setProjectOptions, optionReqBody);
    getPriority(setPriority, priorityReqBody);
  }, []);

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getTicket(id, setFormData);
    }
  }, [id]);
  console.log(formData);

  const handleChange = (e) => {
    const { name, value } = e.target || {};

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateForm(formData));
    if (Object.keys(errors)?.length === 0) {
      setVerify(true);
    }
    console.log(errors);
  };

  console.log(verify);

  const handleClose = () => {
    setOpen(false);
    navigate("/projects");
  };
  const handleSave = () => {
    setOpen(false);
    saveTicket(formData);
    console.log(formData);
    // navigate("/tickets");
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

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <Container>
          <Typography component="h3" variant="h3" align="center">
            {id ? "Update ticket" : "Add new ticket"}
          </Typography>
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
                  getAriaValueText={valuetext}
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
                  value={formData.project}
                  options={projectOptions}
                  getOptionLabel={(option) => {
                    return option.fullName || "";
                  }}
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
                  value={formData.priority}
                  options={priority}
                  getOptionLabel={(option) => {
                    return option.name || "";
                  }}
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
                      helperText={errors?.priority ? `${errors.priority}` : ""}
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
                  onClick={verify ? handleClickOpen : handleSubmit}
                  style={{ margin: "0 10px" }}
                >
                  {id ? "Update" : "Add"}
                </Button>

                <Button
                  variant="contained"
                  color="success"
                  onClick={() => {
                    navigate("/tickets");
                  }}
                >
                  Back
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
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
