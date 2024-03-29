import * as React from "react";

import Typography from "@mui/material/Typography";
import {
  Grid,
  IconButton,
  Card,
  Container,
  CardActions,
  CardContent,
  CircularProgress,
} from "@mui/material";

import PaginationComponent from "app/components/Pagination";

import { Delete, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";

import styles from "./TaskCardList.module.css";
import DialogBox from "app/components/Dialog";
import api from "../api";

const card = (task, handleClickOpen, setData) => {
  return (
    <>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          #{task?.id}
        </Typography>
        <Typography variant="h5" component="div">
          {task?.name || "-"}
        </Typography>
        <Typography sx={{ mb: 1.5, width: "30%" }} color="text.secondary">
          <div
            className="progress"
            role="progressbar"
            aria-label="Animated striped example"
            aria-valuenow="75"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div
              className={
                task?.progressSelect <= 30
                  ? "progress-bar progress-bar-striped progress-bar-animated bg-danger"
                  : task?.progressSelect > 30 && task?.progressSelect <= 50
                  ? "progress-bar progress-bar-striped progress-bar-animated bg-warning"
                  : task?.progressSelect > 50 && task?.progressSelect <= 80
                  ? "progress-bar progress-bar-striped progress-bar-animated bg-info"
                  : "progress-bar progress-bar-striped progress-bar-animated bg-success"
              }
              style={{ width: `${task?.progressSelect || "0"}% ` }}
            ></div>
            {task?.progressSelect || "0"}%
          </div>
        </Typography>
        <Typography>
          Priority- <b>{task?.priority?.name || "-"}</b>
        </Typography>
        <Typography variant="body2">{task?.projectStatus?.name}</Typography>
      </CardContent>
      <CardActions>
        <Link to={`${task.id}`}>
          <IconButton variant="contained" color="success">
            <Edit />
          </IconButton>
        </Link>
        <IconButton
          onClick={() =>
            handleClickOpen(task.id, task.version, task.name, setData)
          }
          color="error"
          variant="contained"
        >
          <Delete />
        </IconButton>
      </CardActions>
    </>
  );
};

export default function CardList({
  data,
  loading,
  limit,
  page,
  setData,
  setPage,
  total,
}) {
  const [open, setOpen] = React.useState(false);

  const [deleteProject, setDeleteProject] = React.useState({
    id: "",
    version: "",
    name: "",
    setData: "",
  });
  const handleDeleteTask = async () => {
    const { name, id, version, setData } = deleteProject;
    await api.delete({ id, version, name });
    setData((prev) => prev.filter((project) => project.id !== id));

    setOpen(false);
  };

  const handleClickOpen = (id, version, name, setData) => {
    setDeleteProject({
      ...deleteProject,
      id: id,
      version: version,
      name: name,
      setData: setData,
    });
    setOpen(true);
  };
  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleDelete = () => {
    handleDeleteTask();
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      {!loading ? (
        <div className={styles.container}>
          <Grid container spacing={3}>
            {data?.map((task, i) => {
              return (
                <>
                  <Grid item xs={12} sm={4} key={i}>
                    <Card sx={styles.card} variant="outlined" key={i}>
                      {card(task, handleClickOpen, setData)}
                    </Card>
                  </Grid>
                </>
              );
            })}
          </Grid>
        </div>
      ) : (
        <Container className={styles["loading-container"]}>
          <CircularProgress />
        </Container>
      )}
      <PaginationComponent
        total={total}
        limit={limit}
        page={page}
        handleChange={handleChange}
      />
      <DialogBox
        type="Delete"
        open={open}
        handleCancel={handleCancel}
        handleClose={handleClose}
        onClick={handleDelete}
      />
    </>
  );
}
