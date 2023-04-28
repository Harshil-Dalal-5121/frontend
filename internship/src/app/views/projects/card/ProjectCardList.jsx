import * as React from "react";

import Typography from "@mui/material/Typography";
import {
  Grid,
  IconButton,
  Card,
  CardActions,
  CardContent,
  Container,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";

import PaginationComponent from "app/components/Pagination";

import { Delete, Edit } from "@mui/icons-material";

import styles from "./ProjectCardList.module.css";
import DialogBoxComponent from "app/components/Dialog";
import api from "../api";

const card = (project, handleClickOpen, setData) => {
  return (
    <>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          #{project?.id}
        </Typography>
        <Typography variant="h5" component="div">
          {project?.name || "-"}
        </Typography>
        <Typography color="text.secondary">{project?.code || "-"}</Typography>
        <Typography>
          Parent- <b>{project?.clientPartner?.fullName || "-"}</b>
        </Typography>
        <Typography>Progess - {project?.projectStatus?.name}</Typography>
      </CardContent>
      <CardActions>
        <Link to={`${project.id}`}>
          <IconButton variant="contained" color="success">
            <Edit />
          </IconButton>
        </Link>
        <IconButton
          onClick={() =>
            handleClickOpen(project.id, project.version, project.name, setData)
          }
          variant="contained"
          color="error"
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
  page,
  limit,
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
  const handleDeleteProject = async () => {
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
    handleDeleteProject();
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
          <Grid container spacing={2}>
            {data?.map((project, i) => {
              return (
                <>
                  <Grid item xs={12} sm={4}>
                    <Card variant="outlined" sx={styles.card} key={i}>
                      {card(project, handleClickOpen, setData, i)}
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
      <DialogBoxComponent
        type="Delete"
        open={open}
        handleCancel={handleCancel}
        handleClose={handleClose}
        onClick={handleDelete}
      />
    </>
  );
}
