import React, { useEffect, useState } from "react";
import useFetchRecord from "app/services/custom-hooks/useFetchRecord";
import {
  Button,
  CircularProgress,
  Grid,
  Typography,
  Container,
  TextField,
} from "@mui/material";
import DialogBox from "app/components/Dialog";
import Selection from "app/components/Selection";
import StatusSelect from "app/components/StatusSelect";

import { useNavigate, useParams } from "react-router";
import api from "../tickets/api";
import formApi from "./api";
import styles from "./Forms.module.css";
import handleValidation from "app/utils/handleValidation";
import onChange from "../../utils/onChange";
import ProgressBar from "app/components/ProgressBar";

import { Add } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import LoadOnOpenSelection from "app/components/LoadOnOpenSelection";

const initialValues = {
  name: "",
  taskDate: "",
  taskEndDate: "",
  project: "",
  priority: "",
  typeSelect: "ticket",
  progressSelect: 0,
};

const errorMessages = {
  name: `Subject is required`,
  project: `Project  is required`,
};

const TicketForm = () => {
  const [formData, setFormData] = useState(initialValues);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState({});
  const [parentTasks, setParentTasks] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();
  const { loading } = useFetchRecord(id, api.fetch, setFormData);

  const {
    name,
    taskDate,
    taskEndDate,
    project,
    priority,
    status,
    parentTask,
    progressSelect,
    assignedTo,
  } = formData;

  const handleProjectChange = async (e, value) => {
    setFormData({
      ...formData,
      project: {
        id: value?.id || "",
        fullName: value?.fullName || "",
        code: value?.code || null,
      },
    });

    const options = await formApi.parentTask({
      projectId: value?.id,
      taskId: +id,
    });
    setParentTasks(options);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = handleValidation(formData, errorMessages);
    setError(errors);
    if (Object.keys(errors)?.length === 0) {
      setOpen(true);
    }
  };

  const handleSave = () => {
    setOpen(false);
    api.save(formData);
    navigate(-1);
  };

  useEffect(() => {
    if (project) {
      (async () => {
        const options = await formApi.parentTask({
          projectId: project?.id,
          taskId: +id,
        });
        setParentTasks(options || []);
      })();
    }
  }, [project, id]);
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
            {id ? "Update Ticket Data" : "Add a new Ticket"}
          </Typography>
          <Container className={styles["form-container"]}>
            <form id="form" onSubmit={handleSubmit}>
              <Grid
                container
                spacing={2}
                id="form"
                justifyContent="center"
                alignItems="center"
              >
                {id ? (
                  <Grid item xs={12} sm={8}>
                    <StatusSelect
                      data={formData}
                      setData={setFormData}
                      defaultValue={status?.name || "New"}
                    />
                  </Grid>
                ) : null}

                <Grid item xs={12} sm={8}>
                  <TextField
                    value={name || ""}
                    onChange={(e) => onChange?.change(e, formData, setFormData)}
                    fullWidth
                    error={error?.name ? true : false}
                    helperText={error?.name ? `${error.name}` : ""}
                    id="name"
                    name="name"
                    label="Subject"
                  />
                </Grid>
                <Grid align="center" item xs="auto" sm={10}>
                  <Typography>Progress :</Typography>
                  <ProgressBar
                    name="progressSelect"
                    value={progressSelect}
                    step={10}
                    onChange={(e) => onChange?.change(e, formData, setFormData)}
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Selection
                    label="Parent Project"
                    name="project"
                    fetchApi={formApi?.projects}
                    value={project}
                    error={error?.project ? true : false}
                    helperText={error?.project ? `${error.project}` : ""}
                    getOptionLabel={(option) => {
                      return option?.fullName;
                    }}
                    handleChange={handleProjectChange}
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <LoadOnOpenSelection
                    label=" Priority"
                    fetchApi={formApi?.priority}
                    value={priority}
                    getOptionLabel={(option) => {
                      return option?.name;
                    }}
                    handleChange={(e, value) =>
                      onChange?.priority(e, value, formData, setFormData)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Selection
                    label=" Parent Task"
                    fetchApi={formApi?.parentTask}
                    value={parentTask}
                    options={parentTasks}
                    getOptionLabel={(option) => {
                      return option?.fullName;
                    }}
                    handleChange={(e, value) =>
                      onChange?.parentTask(e, value, formData, setFormData)
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
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField
                    fullWidth
                    onChange={(e) => onChange?.change(e, formData, setFormData)}
                    value={taskDate || ""}
                    id="taskDate"
                    name="taskDate"
                    type="date"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField
                    fullWidth
                    onChange={(e) => onChange?.change(e, formData, setFormData)}
                    value={taskEndDate || ""}
                    id="taskEndDate"
                    name="taskEndDate"
                    type="date"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={8} className={styles["btn-grid"]}>
                  <Button
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
                  <Button
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
    </>
  );
};

export default TicketForm;
