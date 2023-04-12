import React, { useCallback, useEffect, useState } from "react";
import { getProject, getOptions } from "app/services/services";

import {
  Autocomplete,
  Button,
  CircularProgress,
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
import { useNavigate, useParams } from "react-router";

const initialValues = {
  name: "",
  taskDate: "",
  taskEndDate: "",
  project: "",
  typeSelect: "ticket",
  progressSelect: "",
};

const TicketForm = () => {
  const [formData, setFormData] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    getOptions(setData);
  }, []);

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getProject(id, setFormData);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target || {};
    setFormData({
      ...formData,
      [name]:
        name === "project"
          ? {
              id: value.id,
              fullname: value.fullName,
              code: value.code,
            }
          : value,
    });
  };

  const handleSubmit = (e) => {
    console.log(formData);
  };

  console.log(formData);

  return (
    <>
      <Container>
        <Typography component="h3" variant="h3" align="center">
          {id ? "Update ticket" : "Add new ticket"}
        </Typography>
        <form
          id="form"
          // onSubmit={handleSubmit}
        >
          <Grid
            container
            spacing={2}
            id="form"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} sm={8}>
              <TextField
                onChange={handleChange}
                fullWidth
                id="name"
                name="name"
                label="Add Name"
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <Autocomplete
                fullWidth
                id="project"
                name="project"
                options={data}
                getOptionLabel={(option) => {
                  return option.name;
                }}
                onChange={(e, value) => console.log(value.fullName)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Project"
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
                onClick={handleSubmit}
                style={{ margin: "0 10px" }}
              >
                {id ? "Update" : "Add"}
              </Button>

              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  // navigate("/projects");
                }}
              >
                Back
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
};

export default TicketForm;
