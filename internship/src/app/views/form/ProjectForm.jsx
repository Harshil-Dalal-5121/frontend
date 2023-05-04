import {
  Button,
  CircularProgress,
  FormControlLabel,
  Grid,
  Container,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import Selection from "app/components/Selection";
import StatusSelect from "app/components/StatusSelect";
import useFetchRecord from "app/services/custom-hooks/useFetchRecord";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../projects/api";
import formApi from "./api";
import { Add } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";

import styles from "./Forms.module.css";
import ProjectTaskTable from "./sideTable/ProjectTaskTable";
import DialogBoxComponent from "app/components/Dialog";

const initialValues = {
  name: "",
  fromDate: "",
  parentProject: "",
  clientPartner: "",
  contactPartner: "",
  toDate: "",
  imputable: false,
  projectStatus: "",
  isBusinessProject: true,
  assignedTo: "",
  code: "",
  customerAddress: "",
  currency: "",
};
const ProjectForm = () => {
  const [formData, setFormData] = useState(initialValues);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const [customerContactOptions, setCustomerContactOptions] = useState([]);
  const [addressOptions, setAddressOptions] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  const { loading } = useFetchRecord(id, api.fetch, setFormData);

  const {
    clientPartner,
    assignedTo,
    parentProject,
    contactPartner,
    toDate,
    fromDate,
    imputable,
    projectStatus,
    isBusinessProject,
    code,
    name,
    customerAddress,
    currency,
  } = formData;

  const handleSwitchChange = (e) => {
    const { name, checked } = e.target || {};
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleAssignChange = (e, value) => {
    setFormData({
      ...formData,
      assignedTo: {
        id: value?.id || "",
        fullName: value?.fullName || "",
      },
    });
  };

  const handleProjectChange = async (e, value) => {
    setFormData({
      ...formData,
      parentProject: {
        id: value?.id || "",
        fullName: value?.fullName || "",
        code: value?.code || "",
        $version: value?.version,
      },
    });
  };

  const handleCustomerChange = async (e, value) => {
    const currency = await formApi.fetchCustomerCurrency({ value: value });

    const currencyData = currency || "";

    setFormData({
      ...formData,
      clientPartner: {
        id: value?.id || "",
        fullName: value?.fullName || "",
      },
      currency: {
        id: currencyData?.id || "",
        name: currencyData?.name || "",
        code: currencyData?.code || "",
      },
    });

    const fetchCustomerContact = await formApi?.fetchCustomerContact({
      client: value,
    });

    const fetchAddress = await formApi?.fetchAddress({
      client: value,
    });

    setAddressOptions(fetchAddress);
    setCustomerContactOptions(fetchCustomerContact);
  };

  const handleCurrencyChange = (e, value) => {
    setFormData({
      ...formData,
      currency: {
        code: value?.code || "",
        id: value?.id || "",
        name: value?.name || "",
      },
    });
  };

  const handleCustomerContactChange = async (e, value) => {
    setFormData({
      ...formData,
      contactPartner: {
        fullName: value?.fullName || "",
        id: value?.id || "",
        $version: value?.$version || "",
      },
    });
  };

  const handleAddressChange = async (e, value) => {
    setFormData({
      ...formData,
      customerAddress: {
        fullName: value?.fullName || "",
        id: value?.id || "",
      },
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const fetchContactsApi = async ({ value }) => {
    const res = await formApi.fetchCustomerContact({
      value: { id: value.id, fullName: value.fullName },
      client: clientPartner,
    });
    setCustomerContactOptions(res);
  };

  const fetchAddressApi = async ({ value }) => {
    const res = await formApi.fetchAddress({
      value: value,
      client: clientPartner,
    });
    setAddressOptions(res);
  };

  const validateForm = () => {
    const error = {};
    const errorMessages = {
      name: `Project Name is required`,
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
    api.save(formData);

    navigate("/projects");
    setOpen(false);
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
            align="center"
            className={styles["form-heading"]}
          >
            {id ? "Update Project Data" : "Add a new Project"}
          </Typography>
          <Container className={styles["form-container"]}>
            <form onSubmit={handleSubmit}>
              <Grid
                container
                spacing={2}
                id="form"
                onSubmit={handleSubmit}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item align="right" xs={12} sm={6}>
                  <StatusSelect
                    data={formData}
                    setData={setFormData}
                    defaultValue={projectStatus?.name || "New"}
                  />
                </Grid>
                <Grid item align="center" xs={12} sm={6}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography>Business Project</Typography>
                    <FormControlLabel
                      control={
                        <Switch
                          name="isBusinessProject"
                          checked={isBusinessProject}
                          onClick={handleSwitchChange}
                          color="warning"
                        />
                      }
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    id="name"
                    name="name"
                    label="Add Name"
                    value={name || ""}
                    onChange={handleChange}
                    helperText={errors?.name ? `${errors.name}` : ""}
                    error={errors?.name ? true : false}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    name="code"
                    id="code"
                    label="Add Code"
                    value={code || ""}
                    onChange={handleChange}
                    error={errors?.code ? true : false}
                    helperText={errors?.code ? `${errors.code}` : ""}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={8}>
                  <Selection
                    label="Parent Project"
                    fetchApi={formApi?.projects}
                    value={parentProject}
                    getOptionLabel={(option) => {
                      return option?.fullName;
                    }}
                    handleChange={handleProjectChange}
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

                  <Grid item xs={12} sm={12}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Typography>Imputable :</Typography>
                      <FormControlLabel
                        control={
                          <Switch
                            onClick={handleSwitchChange}
                            checked={imputable}
                            color="success"
                            name="imputable"
                          />
                        }
                        label={imputable ? "True" : "False"}
                      />
                    </Stack>
                  </Grid>
                </Grid>

                {isBusinessProject ? (
                  <>
                    <Grid item xs={12} sm={8}>
                      <Selection
                        label="Customer"
                        fetchApi={formApi?.fetchCustomer}
                        value={clientPartner}
                        getOptionLabel={(option) => {
                          return option.fullName;
                        }}
                        handleChange={handleCustomerChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <Selection
                        label="Currency"
                        fetchApi={formApi?.fetchCurrency}
                        value={currency}
                        getOptionLabel={(option) => {
                          return option?.name;
                        }}
                        handleChange={handleCurrencyChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <Selection
                        label="Customer Contact"
                        fetchApi={fetchContactsApi}
                        value={contactPartner}
                        getOptionLabel={(option) => {
                          return option?.fullName;
                        }}
                        options={customerContactOptions}
                        handleChange={handleCustomerContactChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <Selection
                        label="Address"
                        fetchApi={fetchAddressApi}
                        value={customerAddress}
                        getOptionLabel={(option) => {
                          return option?.fullName;
                        }}
                        handleChange={handleAddressChange}
                        options={addressOptions}
                      />
                    </Grid>
                  </>
                ) : null}
                <Grid item xs={12} sm={8}>
                  <TextField
                    id="fromDate"
                    name="fromDate"
                    type="date"
                    value={fromDate?.slice(0, 10) || ""}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField
                    id="toDate"
                    name="toDate"
                    type="date"
                    value={toDate?.slice(0, 10) || ""}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />
                  {id ? (
                    <>
                      <Grid item xs={12} sm={8}>
                        <Typography component="h6" variant="h6">
                          Task Tree
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <ProjectTaskTable id={id} />
                      </Grid>
                    </>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
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
