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
import { Add } from "@mui/icons-material";
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
import LoadOnOpenSelection from "app/components/LoadOnOpenSelection";
import { InputLabel } from "@mui/material";

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
      value: { id: value.id, fullName: value.fullName },
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
    setAddressOptions(res);
  };

  const fetchCustomerApi = ({ value }) => {
    return formApi.fetchCustomer({
      value: value,
      company: company,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = handleValidation(
      formData,

      errorMessages
    );
    setErrors(errors);

    if (Object.keys(errors)?.length === 0) {
      setOpen(true);
    }
  };

  const handleSave = () => {
    api.save(formData);
    navigate("/projects");
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
          <>
            <Typography
              component="h3"
              variant="h3"
              align="center"
              className={styles["form-heading"]}
            >
              {id ? "Update Project Data" : "Add a new Project"}
            </Typography>
            <Grid
              id="container"
              container
              spacing={2}
              justifyContent="center"
              sx={{ padding: "2vh" }}
            >
              <Grid
                id="form-fields"
                item
                xl={8}
                sx={{
                  marginRight: "1em",
                  borderRadius: 2,
                  boxShadow: "1px 2px 8px 0px rgba(0, 0, 0, 0.15)",
                }}
              >
                <Grid
                  id="status"
                  container
                  spacing={2}
                  sx={{ padding: "2vh" }}
                  justifyContent="space-between"
                >
                  <Grid id="status-bar" item xl={6}>
                    <StatusSelect
                      data={formData}
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
                            style={{
                              padding: "0.2em 0.6em 0.3em",
                              fontSize: "75%",
                              fontWeight: "bold",
                            }}
                          />
                        </Grid>
                        <Grid id="business badge" align="right" item xl={6}>
                          <Chip
                            label="Business"
                            color="info"
                            style={{
                              padding: "0.2em 0.6em 0.3em",
                              fontSize: "75%",
                              fontWeight: "bold",
                            }}
                          />
                        </Grid>
                      </Grid>
                    </>
                  ) : null}
                </Grid>
                <Grid
                  id="code-name"
                  container
                  spacing={4}
                  sx={{ padding: "2vh" }}
                >
                  <Grid id="code" item xl={2}>
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
                  <Grid id="name" item xl={6}>
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
                  sx={{ padding: "2vh" }}
                >
                  <Grid id="company" item xl={4}>
                    <Selection
                      label="Company"
                      fetchApi={formApi?.fetchCompany}
                      value={company}
                      getOptionLabel={(option) => {
                        return option.name;
                      }}
                      handleChange={(e, value) => {
                        onChange?.company(e, value, formData, setFormData);
                      }}
                    />
                  </Grid>

                  {isBusinessProject ? (
                    <>
                      <Grid id="customer" item xl={4}>
                        <LoadOnOpenSelection
                          label="Customer"
                          fetchApi={fetchCustomerApi}
                          value={clientPartner}
                          getOptionLabel={(option) => {
                            return option.fullName;
                          }}
                          handleChange={(e, value) => {
                            handleCustomerChange(e, value);
                          }}
                        />
                      </Grid>
                      <Grid id="currency" item xl={4}>
                        <LoadOnOpenSelection
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
                      sx={{ padding: "2vh" }}
                    >
                      <Grid id="customer-contact" item xl={6}>
                        <Selection
                          label="Customer Contact"
                          fetchApi={fetchContactsApi}
                          value={contactPartner}
                          getOptionLabel={(option) => {
                            return option?.fullName;
                          }}
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
                      <Grid id="address" item xl={6}>
                        <Selection
                          label="Address"
                          fetchApi={fetchAddressApi}
                          value={customerAddress}
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
                    <Grid item sx={{ padding: "2vh" }} xl={12}>
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
                xl={3}
                xs={12}
                style={{
                  borderRadius: 10,
                  boxShadow: "1px 2px 8px 0px rgba(0, 0, 0, 0.15)",
                }}
              >
                <Grid>
                  <Grid
                    id="add-btn"
                    item
                    xl={12}
                    style={{
                      boxShadow: "1px 2px 8px 0px rgba(0, 0, 0, 0.15)",
                      margin: "1vw",
                    }}
                  >
                    <Button
                      fullWidth
                      variant="contained"
                      color="success"
                      type="submit"
                      startIcon={
                        id ? (
                          <Add style={{ width: "15px", height: "15px" }} />
                        ) : (
                          <EditIcon style={{ width: "15px", height: "15px" }} />
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
                    style={{
                      boxShadow: "1px 2px 8px 0px rgba(0, 0, 0, 0.15)",
                      margin: "1vw",
                    }}
                  >
                    <Button
                      fullWidth
                      variant="contained"
                      color="warning"
                      startIcon={
                        <ArrowBackIosIcon
                          style={{ width: "15px", height: "15px" }}
                        />
                      }
                      onClick={() => {
                        navigate(-1);
                      }}
                    >
                      Back
                    </Button>
                  </Grid>
                  <Grid
                    id="characteristics"
                    item
                    xl={12}
                    style={{
                      margin: "1vw",
                      padding: "1vh ",
                    }}
                  >
                    <Typography component="h6" variant="h6">
                      Characteristics
                    </Typography>
                    <hr style={{ backgroundColor: "rgba(0, 0, 0, 0.15)" }} />
                    <Grid
                      id="business-project"
                      style={{
                        padding: "1vh 1vw",
                      }}
                      item
                      xl={12}
                    >
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
                    <Grid
                      id="parent-project"
                      item
                      xl={12}
                      style={{
                        padding: "1vh",
                      }}
                    >
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
                  <Grid
                    id="follow-up"
                    item
                    xl={12}
                    style={{
                      margin: "1vw",
                      padding: "1vh",
                    }}
                  >
                    <Typography component="h6" variant="h6">
                      Follow Up
                    </Typography>
                    <hr style={{ backgroundColor: "rgba(0, 0, 0, 0.15)" }} />
                    <Grid id="assigned-to" item xl={12} sx={{ padding: "2vh" }}>
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
                  <Grid
                    id="dates"
                    item
                    xl={12}
                    style={{
                      margin: "1vw",
                      padding: "1vh",
                    }}
                  >
                    <Typography component="h6" variant="h6">
                      Dates
                    </Typography>
                    <hr style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }} />
                    <Grid container spacing={2} id="dates">
                      <Grid id="from-date" sx={{ padding: "2vh" }} item xl={6}>
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
                      <Grid id="to-date" sx={{ padding: "2vh" }} item xl={6}>
                        <InputLabel>To Date</InputLabel>
                        <TextField
                          id="toDate"
                          name="toDate"
                          type="date"
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
      </div>
    </>
  );
};

export default ProjectForm;
