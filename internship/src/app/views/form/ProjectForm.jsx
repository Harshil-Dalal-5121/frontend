import {
  Button,
  CircularProgress,
  Chip,
  FormControlLabel,
  Grid,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import useFetchRecord from "app/services/custom-hooks/useFetchRecord";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../projects/api";
import formApi from "./api";

import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import styles from "./Forms.module.css";
import ProjectTaskTable from "./sideTable/ProjectTaskTable";
import Selection from "app/components/Selection";
import StatusSelect from "app/components/StatusSelect";
import DialogBox from "app/components/Dialog";
import handleValidation from "app/utils/handleValidation";
import onChange from "../../utils/onChange";
import IOSSwitch from "./../../components/iOSSwitch";
import { InputLabel } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FlashMessage from "app/components/FlashMessage";

const initialValues = {
  imputable: false,
  projectTaskPrioritySet: [
    {
      name: "Low",
      id: 1,
      version: 0,
    },
    {
      name: "Normal",
      id: 2,
      version: 0,
    },
    {
      name: "High",
      id: 3,
      version: 0,
    },
    {
      name: "Urgent",
      id: 4,
      version: 0,
    },
  ],
  projectTaskStatusSet: [
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
  ],
  projectStatus: {
    name: "New",
    id: 1,
    version: 0,
  },
  isBusinessProject: true,
  assignedTo: {
    fullName: "Admin",
    id: 1,
  },
};

const status = [
  {
    name: "New",
    id: 1,
    isCompleted: "false",
    isDefaultCompleted: "false",
    version: 0,
  },
  {
    name: "In progress",
    id: 2,
    isCompleted: "false",
    isDefaultCompleted: "false",
    version: 0,
  },
  {
    name: "Done",
    id: 3,
    isCompleted: "true",
    isDefaultCompleted: "true",
    version: 0,
  },
  {
    name: "Canceled",
    id: 8,
    version: 0,
  },
];

const errorMessages = {
  name: `Project Name is required`,
  code: `Code is required`,
};

const ProjectForm = () => {
  const [formData, setFormData] = useState(initialValues);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [customerContactOptions, setCustomerContactOptions] = useState([]);
  const [addressOptions, setAddressOptions] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

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
    projectStatus,
    isBusinessProject,
    code,
    name,
    company,
    customerAddress,
    currency,
  } = formData;

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

  const fetchContactsApi = async ({ value }) => {
    const res = await formApi.fetchCustomerContact({
      value: value,
      client: clientPartner,
    });
    setCustomerContactOptions(res || []);
  };

  const fetchAddressApi = async ({ value }) => {
    const res = await formApi.fetchAddress({
      value: value,
      client: clientPartner,
      company: company,
    });
    setAddressOptions(res || []);
  };

  const fetchCustomerApi = ({ value }) => {
    return formApi.fetchCustomer({
      value: value,
      company: company,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = handleValidation(formData, errorMessages, fromDate, toDate);
    setErrors(errors);

    if (Object.keys(errors)?.length === 0) {
      setOpen(true);
    }
  };

  const handleSave = async () => {
    const response = await api.save(formData);
    setShowMessage(response ? true : false);
    setOpen(false);
  };

  return (
    <>
      <div className={styles["container"]}>
        {loading ? (
          <Container className={styles["loading-container"]}>
            <CircularProgress className={styles["loading"]} />
          </Container>
        ) : (
          <div>
            <Typography
              component="h3"
              variant="h3"
              align="center"
              className={styles["form-heading"]}
            >
              {id ? "Update Project Data" : "Add a new Project"}
            </Typography>
            <Grid id="container" container justifyContent="center" p={2}>
              <Grid
                id="form-fields"
                item
                md={8}
                sm={12}
                m={1}
                p={2}
                className={styles["form-fields"]}
              >
                <Grid
                  id="status"
                  container
                  spacing={2}
                  p={2}
                  justifyContent="space-between"
                >
                  <Grid id="status-bar" item xl={6} xs={12}>
                    <StatusSelect
                      data={formData}
                      status={status}
                      property="projectStatus"
                      setData={setFormData}
                      defaultValue={projectStatus?.name || "New"}
                    />
                  </Grid>
                  {isBusinessProject ? (
                    <>
                      <Grid id="badges" container xl={2}>
                        <Grid id="invoice badge" item xl={6}>
                          <Chip
                            label=" To Invoice"
                            color="warning"
                            className={styles["badge"]}
                          />
                        </Grid>
                        <Grid id="business badge" align="right" item xl={6}>
                          <Chip
                            label="Business"
                            color="info"
                            className={styles["badge"]}
                          />
                        </Grid>
                      </Grid>
                    </>
                  ) : null}
                </Grid>
                <Grid id="code-name" container spacing={4} p={2}>
                  <Grid id="code" item xl={2} lg={2} md={2} sm={8}>
                    <TextField
                      name="code"
                      id="code"
                      label="Code"
                      value={code || ""}
                      onChange={(e) =>
                        onChange?.change(e, formData, setFormData)
                      }
                      error={errors?.code ? true : false}
                      helperText={errors?.code ? `${errors.code}` : ""}
                      variant="standard"
                      fullWidth
                    />
                  </Grid>
                  <Grid id="name" item xl={6} lg={6} md={6} sm={8}>
                    <TextField
                      id="name"
                      name="name"
                      label="Name"
                      value={name || ""}
                      onChange={(e) =>
                        onChange?.change(e, formData, setFormData)
                      }
                      helperText={errors?.name ? `${errors.name}` : ""}
                      error={errors?.name ? true : false}
                      variant="standard"
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={4}
                  id="company-customer-currency"
                  p={2}
                >
                  <Grid id="company" item md={4} xs={8}>
                    <Selection
                      label="Company"
                      fetchApi={formApi?.fetchCompany}
                      value={company}
                      getOptionLabel={(option) => {
                        return option?.name;
                      }}
                      handleChange={(e, value) => {
                        onChange?.company(e, value, formData, setFormData);
                      }}
                    />
                  </Grid>

                  {isBusinessProject ? (
                    <>
                      <Grid id="customer" item md={4} xs={8}>
                        <Selection
                          label="Customer"
                          fetchApi={fetchCustomerApi}
                          value={clientPartner}
                          load={company ? true : false}
                          getOptionLabel={(option) => {
                            return option.fullName;
                          }}
                          handleChange={(e, value) => {
                            handleCustomerChange(e, value);
                          }}
                        />
                      </Grid>
                      <Grid id="currency" item md={4} xs={8}>
                        <Selection
                          label="Currency"
                          fetchApi={formApi?.fetchCurrency}
                          value={currency}
                          getOptionLabel={(option) => {
                            return option?.name;
                          }}
                          handleChange={(e, value) =>
                            onChange?.currency(e, value, formData, setFormData)
                          }
                        />
                      </Grid>
                    </>
                  ) : null}
                </Grid>
                {isBusinessProject ? (
                  <>
                    <Grid
                      id="customerContact-address"
                      container
                      spacing={2}
                      p={2}
                    >
                      <Grid id="customer-contact" item md={6} xs={8}>
                        <Selection
                          label="Customer Contact"
                          fetchApi={fetchContactsApi}
                          value={contactPartner}
                          getOptionLabel={(option) => {
                            return option?.fullName;
                          }}
                          load={company ? true : false}
                          options={customerContactOptions}
                          handleChange={(e, value) =>
                            onChange?.customerContact(
                              e,
                              value,
                              formData,
                              setFormData
                            )
                          }
                        />
                      </Grid>
                      <Grid id="address" item md={6} xs={8}>
                        <Selection
                          label="Address"
                          fetchApi={fetchAddressApi}
                          value={customerAddress}
                          load={company ? true : false}
                          getOptionLabel={(option) => {
                            return option?.fullName;
                          }}
                          handleChange={(e, value) =>
                            onChange?.address(e, value, formData, setFormData)
                          }
                          options={addressOptions}
                        />
                      </Grid>
                    </Grid>
                  </>
                ) : null}
                {id ? (
                  <>
                    <Grid item p={2} xl={12}>
                      <Typography component="h6" variant="h6">
                        Task Tree
                      </Typography>
                      <ProjectTaskTable id={id} />
                    </Grid>
                  </>
                ) : null}
              </Grid>
              <Grid
                id="actions"
                item
                m={1}
                md={3}
                sm={12}
                className={styles["actions"]}
              >
                <Grid>
                  <Grid id="add-btn" item xl={12} m={1} p={1}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="info"
                      type="submit"
                      className={styles["form-btn"]}
                      startIcon={
                        id ? (
                          <EditIcon className={styles["form-btn-icon"]} />
                        ) : (
                          <AddIcon className={styles["form-btn-icon"]} />
                        )
                      }
                      onClick={handleSubmit}
                    >
                      {id ? "Update" : "Add"}
                    </Button>
                  </Grid>
                  <Grid id="cancel-btn" item xl={12} m={1} p={1}>
                    <Button
                      fullWidth
                      className={styles["form-btn"]}
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
                  <Grid id="characteristics" item xl={12} m={1} p={1}>
                    <Typography component="h6" variant="h6">
                      Characteristics
                    </Typography>
                    <hr style={{ backgroundColor: "rgba(0, 0, 0, 0.15)" }} />
                    <Grid id="business-project" p={1} item xl={12}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Typography>Business Project</Typography>
                        <FormControlLabel
                          control={
                            <IOSSwitch
                              name="isBusinessProject"
                              checked={isBusinessProject}
                              onClick={(e) =>
                                onChange?.switch(e, formData, setFormData)
                              }
                            />
                          }
                        />
                      </Stack>
                    </Grid>
                    <Grid id="parent-project" item xl={12} p={1}>
                      <Selection
                        label="Parent Project"
                        fetchApi={formApi?.projects}
                        value={parentProject}
                        getOptionLabel={(option) => {
                          return option?.fullName;
                        }}
                        handleChange={(e, value) =>
                          onChange?.project(e, value, formData, setFormData)
                        }
                      />
                    </Grid>
                  </Grid>
                  <Grid id="follow-up" item xl={12} m={1} p={1}>
                    <Typography component="h6" variant="h6">
                      Follow Up
                    </Typography>
                    <hr style={{ backgroundColor: "rgba(0, 0, 0, 0.15)" }} />
                    <Grid id="assigned-to" item xl={12} p={1}>
                      <Selection
                        label="Assigned To"
                        fetchApi={formApi?.assignedTo}
                        value={assignedTo}
                        getOptionLabel={(option) => {
                          return option?.fullName;
                        }}
                        handleChange={(e, value) =>
                          onChange?.assignedTo(e, value, formData, setFormData)
                        }
                      />
                    </Grid>
                  </Grid>
                  <Grid id="dates" item xl={12} m={1} p={1}>
                    <Typography component="h6" variant="h6">
                      Dates
                    </Typography>
                    <hr style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }} />
                    <Grid container spacing={2} id="dates">
                      <Grid id="from-date" p={1} item xl={6}>
                        <InputLabel>From Date</InputLabel>
                        <TextField
                          id="fromDate"
                          name="fromDate"
                          type="date"
                          value={fromDate?.slice(0, 10) || ""}
                          onChange={(e) =>
                            onChange?.change(e, formData, setFormData)
                          }
                          variant="standard"
                          fullWidth
                        />
                      </Grid>
                      <Grid id="to-date" p={1} item xl={6}>
                        <InputLabel error={errors?.endDate ? true : false}>
                          To Date
                        </InputLabel>
                        <TextField
                          id="toDate"
                          name="toDate"
                          type="date"
                          error={errors?.endDate ? true : false}
                          helperText={
                            errors?.endDate ? `${errors.endDate}` : ""
                          }
                          value={toDate?.slice(0, 10) || ""}
                          onChange={(e) =>
                            onChange?.change(e, formData, setFormData)
                          }
                          variant="standard"
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
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
            path="projects"
          />
        ) : null}
      </div>
    </>
  );
};

export default ProjectForm;
