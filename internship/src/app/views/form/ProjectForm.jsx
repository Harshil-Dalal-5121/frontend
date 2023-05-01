import React, { useEffect, useState } from "react";

import {
  Button,
  Container,
  FormControlLabel,
  Grid,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate, useParams } from "react-router";

import useFetchRecord from "app/services/custom-hooks/useFetchRecord";

import ProjectTaskTable from "./sideTable/ProjectTaskTable";
import DialogBoxComponent from "app/components/Dialog";
import ClearIcon from "@mui/icons-material/Clear";
import { Add } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import api from "../projects/api";
import styles from "./Forms.module.css";
import StatusSelect from "../../components/StatusSelect";
import AutoCompleteComponent from "app/components/AutoComplete";
import { useDebounce } from "app/services/custom-hooks/useDebounce";
import formApi from "./api";

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
  currency: "",
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
  const [customerOpsLoading, setCustomerOpsLoading] = useState(false);
  const [currencyOpsLoading, setCurrencyOpsLoading] = useState(false);
  const [assigned, setAssigned] = useState([]);
  const [customerOps, setCustomerOps] = useState([]);
  const [projectOptions, setProjectOptions] = useState([]);
  const [currencyOps, setCurrencyOps] = useState([]);
  const [customerContactOps, setCustomerContactOps] = useState([]);
  const [businessProject, setBusinessProject] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const navigate = useNavigate();

  const handleCancel = () => {
    setOpen(false);
  };

  const { id } = useParams();
  const { loading } = useFetchRecord(id, api.fetch, setFormData);

  const handleChange = (e) => {
    const { name, value, checked } = e.target || {};
    setFormData({
      ...formData,
      [name]: name === "imputable" ? checked : value,
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
        id: value.id,
        fullName: value.fullName,
      },
    });
  };

  const handleProjectInputChange = async (e, value) => {
    setProjectOpsLoading(true);
    const options = await formApi.projects(value);
    setProjectOptions(options?.data?.data);
    setProjectOpsLoading(false);
  };

  const delayedProjectSearch = useDebounce(handleProjectInputChange);

  const handleProjectChange = async (e, value) => {
    setFormData({
      ...formData,
      project: {
        id: value.id || "",
        fullName: value.fullName || "",
        code: value.code || null,
      },
    });
  };

  const handleCustomerInputChange = async (e, value) => {
    setCustomerOpsLoading(true);
    const options = await formApi.fetchCustomer(value);
    setCustomerOps(options?.data?.data);
    setCustomerOpsLoading(false);
  };

  const delayedCustomerSearch = useDebounce(handleCustomerInputChange);

  const handleCustomerChange = async (e, value) => {
    setFormData({
      ...formData,
      clientPartner: {
        id: value.id || "",
        fullName: value.fullName || "",
      },
    });

    const currency = await formApi.fetchCustomerCurrency(value);
    const currencyData = currency[0]?.values?.currency;
    setFormData({
      ...formData,
      currency: {
        id: currencyData.id,
        name: currencyData.name,
        code: currencyData.code,
      },
    });

    const customerContact = await formApi.fetchCustomerContact(value);
    // console.log(customerContact);
  };

  const handleCurrencyInputChange = async (e, value) => {
    setCurrencyOpsLoading(true);
    const option = await formApi.fetchCurrency(value);
    setCurrencyOps(option?.data?.data);
    setCurrencyOpsLoading(false);
  };

  const delayedCurrencySearch = useDebounce(handleCurrencyInputChange);

  const handleCurrencyChange = (e, value) => {
    setFormData({
      ...formData,
      currency: {
        code: value.code,
        id: value.id,
        name: value.name,
      },
    });
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
    api.save(formData);

    navigate("/projects");
    setOpen(false);
  };
  useEffect(() => {
    if (formData?.clientPartner) {
      (async () => {
        const options = await formApi.fetchCustomerCurrency(
          formData?.clientPartner
        );
        const data = options[0]?.values?.currency;
        setFormData({
          ...formData,
          currency: {
            id: data.id,
            name: data.name,
            code: data.code,
          },
        });
      })();
    }
  }, [formData?.clientPartner]);

  const handleBusinessChange = (e) => {
    const { checked } = e.target || {};
    setBusinessProject(checked);
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
                <Grid align="right" item xs={12} sm={6}>
                  <StatusSelect
                    options={status}
                    data={formData}
                    setData={setFormData}
                    defaultValue={formData?.projectStatus?.name || "New"}
                  />
                </Grid>
                <Grid align="center" item xs={12} sm={6}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography>Business Project</Typography>
                    <FormControlLabel
                      control={
                        <Switch
                          onClick={handleBusinessChange}
                          color="warning"
                        />
                      }
                    />
                  </Stack>
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
                    handleInputChange={delayedProjectSearch}
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
                  <Grid item xs={12} sm={12}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Typography>Imputable :</Typography>
                      <FormControlLabel
                        control={
                          <Switch
                            onClick={handleChange}
                            checked={formData?.imputable}
                            color="success"
                            name="imputable"
                          />
                        }
                        label={formData?.imputable ? "True" : "False"}
                      />
                    </Stack>
                  </Grid>
                </Grid>

                {businessProject ? (
                  <>
                    <Grid item xs={12} sm={6}>
                      <AutoCompleteComponent
                        data={formData}
                        setData={setFormData}
                        label="Customer"
                        errors={errors}
                        title="clientPartner"
                        handleChange={handleCustomerChange}
                        noOptionsText="No Records"
                        isOptionEqualToValue={(option, value) =>
                          option.fullName === value.fullName
                        }
                        getOptionLabel={(option) => {
                          return option.fullName;
                        }}
                        handleInputChange={delayedCustomerSearch}
                        options={customerOps?.map((a) => {
                          return {
                            fullName: `${a?.partnerSeq} - ${a?.simpleFullName}`,
                            id: a?.id,
                          };
                        })}
                        opsLoading={customerOpsLoading}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <AutoCompleteComponent
                        data={formData}
                        setData={setFormData}
                        label="Currency"
                        errors={errors}
                        title="currency"
                        handleChange={handleCurrencyChange}
                        noOptionsText="No Records"
                        isOptionEqualToValue={(option, value) =>
                          option.name === value.name
                        }
                        getOptionLabel={(option) => {
                          return option.name;
                        }}
                        handleInputChange={delayedCurrencySearch}
                        options={currencyOps?.map((a) => {
                          return {
                            name: a.name,
                            id: a.id,
                            code: a.code,
                          };
                        })}
                        opsLoading={currencyOpsLoading}
                      />
                    </Grid>
                  </>
                ) : null}

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
                  {/* <Button
                    onClick={() =>
                      formApi.fetchContactAction(formData?.clientPartner)
                    }
                  >
                    Button
                  </Button> */}
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
