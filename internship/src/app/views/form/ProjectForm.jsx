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
import DialogBox from "app/components/Dialog";
import { validateForm } from "app/services/services";
import onChange from "./onChange";

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

const regex = {
  name: /^[a-zA-Z]{3,20}/,
};

const regexMessege = {
  name: "Invalid Project Name",
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
    setCustomerContactOptions(res);
  };

  const fetchAddressApi = async ({ value }) => {
    const res = await formApi.fetchAddress({
      value: value,
      client: clientPartner,
    });
    setAddressOptions(res);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(formData, regex, regexMessege, errorMessages);
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
                            onClick={(e) =>
                              onChange?.switch(e, formData, setFormData)
                            }
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
                      onChange={(e) =>
                        onChange?.change(e, formData, setFormData)
                      }
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
                      onChange={(e) =>
                        onChange?.change(e, formData, setFormData)
                      }
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
                      handleChange={(e, value) =>
                        onChange?.project(e, value, formData, setFormData)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <Selection
                      fetchApi={formApi?.assignedTo}
                      value={assignedTo}
                      getOptionLabel={(option) => {
                        return option?.fullName;
                      }}
                      handleChange={(e, value) =>
                        onChange?.assignedTo(e, value, formData, setFormData)
                      }
                      label="Assigned To"
                    />

                    <Grid item xs={12} sm={12}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Typography>Imputable :</Typography>
                        <FormControlLabel
                          control={
                            <Switch
                              onClick={(e) =>
                                onChange?.switch(e, formData, setFormData)
                              }
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
                          handleChange={(e, value) =>
                            onChange?.currency(e, value, formData, setFormData)
                          }
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
                      <Grid item xs={12} sm={8}>
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
                    </>
                  ) : null}
                  <Grid item xs={12} sm={8}>
                    <TextField
                      id="fromDate"
                      name="fromDate"
                      type="date"
                      value={fromDate?.slice(0, 10) || ""}
                      onChange={(e) =>
                        onChange?.change(e, formData, setFormData)
                      }
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
                      onChange={(e) =>
                        onChange?.change(e, formData, setFormData)
                      }
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
