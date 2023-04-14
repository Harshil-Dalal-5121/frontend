import React, { forwardRef, useEffect, useState } from "react";

import { useTheme } from "@emotion/react";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Slide,
  Stack,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { getProject, saveProject } from "app/services/services";
import { useNavigate, useParams } from "react-router";

const initialValues = {
  name: "",
  fromDate: "",
  parentProject: "",
  clientPartner: "",
  toDate: "",
  imputable: false,
  assignedTo: "",
  code: "",
};

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Form = () => {
  const [formData, setFormData] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const navigate = useNavigate();

  const handleCancel = () => {
    setOpen(false);
  };

  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    if (id) {
      getProject(id, setFormData);
    }
    setLoading(false);
  }, [id]);

  const handleChange = (e) => {
    const { name, value, checked } = e.target || {};
    setFormData({
      ...formData,
      [name]: name === "imputable" ? checked : value,
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
    saveProject(formData);
    navigate("/projects");
  };
  const validateForm = (formData) => {
    const error = {};

    if (!formData.name) {
      error.name = `Project Name is required`;
    }
    if (!formData.code) {
      error.code = `Project Code is required`;
    }
    if (!formData.fromDate) {
      error.fromDate = `Start Date is required`;
    }
    if (!formData.toDate) {
      error.toDate = `End Date is required`;
    }
    if (formData.fromDate > formData.toDate) {
      error.toDate = `End Date is invalid`;
    }
    return error;
  };

  return (
    <>
      {loading ? (
        <Container>
          <CircularProgress
            style={{
              margin: "auto",
            }}
          />
        </Container>
      ) : (
        <>
          <Container>
            <Typography component="h3" variant="h3" align="center">
              {id ? "Update Project Data" : "Add a new Project"}
            </Typography>
            <form id="form" onSubmit={handleSubmit}>
              <Grid
                container
                spacing={2}
                id="form"
                onSubmit={handleSubmit}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={12} sm={8}>
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
                <Grid item xs={12} sm={8}>
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
                <Grid item xs={12} sm={8}>
                  <Typography style={{ margin: "10px" }}>
                    Imputable :
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Switch
                      onClick={handleChange}
                      checked={formData?.imputable}
                      color="success"
                      name="imputable"
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Button
                    variant="contained"
                    color="success"
                    type="submit"
                    style={{ margin: "0 10px" }}
                    onClick={handleSubmit}
                  >
                    {id ? "Update" : "Add"}
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => {
                      navigate("/projects");
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
            {id ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Form;
