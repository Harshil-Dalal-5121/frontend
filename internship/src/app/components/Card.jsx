import { CircularProgress, Grid } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

import DialogBox from "./Dialog";
import PaginationComponent from "./Pagination";
import styles from "./Card.module.css";

const Card = ({
  fetchApi,
  card,
  data,
  loading,
  limit,
  page,
  setData,
  setPage,
  total,
}) => {
  const [open, setOpen] = React.useState(false);

  const [deleteProject, setDeleteProject] = React.useState({
    id: "",
    version: "",
    name: "",
    setData: "",
  });
  const handleDeleteProject = async () => {
    const { name, id, version, setData } = deleteProject;
    await fetchApi({ id, version, name });
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
                      {card(project, handleClickOpen, setData)}
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
};

export default Card;
