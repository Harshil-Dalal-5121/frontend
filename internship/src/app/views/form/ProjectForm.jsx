import React, { useState } from "react";
import {
  Button,
  Container,
  debounce,
  Grid,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate, useParams } from "react-router";

import useFetchRecord from "app/services/custom-hooks/useFetchRecord";
import {
  fetchAssign,
  fetchOptions,
  getData,
  getOptions,
  model,
  saveData,
  tableFields,
} from "app/services/services";
import ProjectTaskTable from "./sideTable/ProjectTaskTable";
import DialogBoxComponent from "app/components/Dialog";
import ClearIcon from "@mui/icons-material/Clear";

import { Add } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";

import styles from "./Forms.module.css";
import StatusSelect from "../../components/StatusSelect";
import AutoCompleteComponent from "app/components/AutoComplete";

const initialValues = {
  name: "",
  fromDate: "",
  parentProject: "",
  clientPartner: "",
  toDate: "",
  imputable: false,
  projectStatus: "",
  assignedTo: "",
  code: "",
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

const ProjectForm = () => {
  const [formData, setFormData] = useState(initialValues);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [projectOpsLoading, setProjectOpsLoading] = useState(false);
  const [assignedOpsLoading, setAssignedOpsLoading] = useState(false);
  const [assigned, setAssigned] = useState([]);
  const [projectOptions, setProjectOptions] = useState([]);

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
      setAssignedOpsLoading(true);
      await fetchOptions(fetchAssign, setAssigned, assignReqBody);
      setAssignedOpsLoading(false);
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
      setProjectOpsLoading(true);
      await fetchOptions(getOptions, setProjectOptions, projectReqBody);
      setProjectOpsLoading(false);
    }, 1000)();
  };

  const handleProjectChange = async (e, value) => {
    setFormData({
      ...formData,
      parentProject: {
        id: value.id || "",
        fullName: value.fullName || "",
        code: value.code || null,
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
    saveData(`${model}`, formData);
    navigate("/projects");
    setOpen(false);
  };

  const validateForm = () => {
    const error = {};
    const errorMessages = {
      name: `Task Name is required`,
      code: `Code is required`,
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
            {id ? "Update Project Data" : "Add a new Project"}
          </Typography>
          <Container className={styles["form-container"]}>
            <form id="form" onSubmit={handleSubmit}>
              <Grid
                container
                spacing={2}
                id="form"
                onSubmit={handleSubmit}
                justifyContent="center"
                alignItems="center"
              >
                <Grid align="center" item xs={12} sm={12}>
                  <StatusSelect
                    options={status}
                    data={formData}
                    setData={setFormData}
                    defaultValue={formData?.projectStatus?.name || "New"}
                  />
                </Grid>

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
                  <AutoCompleteComponent
                    data={formData}
                    setData={setFormData}
                    errors={errors}
                    label="Parent project"
                    title="parentProject"
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
                    opsLoading={projectOpsLoading}
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <AutoCompleteComponent
                    data={formData}
                    setData={setFormData}
                    label="Assigned To"
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
                    opsLoading={assignedOpsLoading}
                  />
                  <Grid item xs={12} sm={8}>
                    <Typography>Imputable :</Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Switch
                        onClick={handleChange}
                        checked={formData?.imputable}
                        color="success"
                        name="imputable"
                      />
                    </Stack>
                  </Grid>
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

                {id ? (
                  <>
                    <Grid item xs={12} sm={8}>
                      <Typography component="h6" variant="h6">
                        Task Tree
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <ProjectTaskTable id={id} />
                    </Grid>
                  </>
                ) : null}
                <Grid item xs={12} sm={8}>
                  <Button
                    variant="contained"
                    color="success"
                    type="submit"
                    className={styles["form-btn"]}
                    onClick={handleSubmit}
                  >
                    {id ? (
                      <>
                        Update
                        <EditIcon fontSize="small" />
                      </>
                    ) : (
                      <>
                        Add
                        <Add fontSize="small" />
                      </>
                    )}
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => {
                      navigate("/projects");
                    }}
                  >
                    Back
                    <ClearIcon fontSize="small" />
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

export default ProjectForm;
