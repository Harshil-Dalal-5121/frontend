import * as React from "react";

import { Grid, Card, Container, CircularProgress } from "@mui/material";

import PaginationComponent from "app/components/Pagination";

import styles from "./Card.module.css";
import DialogBox from "app/components/Dialog";

export default function CardList({
  data,
  fetchApi,
  loading,
  card,
  page,
  limit,
  setData,
  setPage,
  total,
}) {
  const [open, setOpen] = React.useState(false);

  const [deleteData, setDeleteData] = React.useState({
    id: "",
    version: "",
    name: "",
    setData: "",
  });
  const handleDeleteData = async () => {
    const { name, id, version, setData } = deleteData;
    await fetchApi({ id, version, name });
    setData((prev) => prev.filter((project) => project.id !== id));

    setOpen(false);
  };

  const handleClickOpen = (id, version, name, setData) => {
    setDeleteData({
      ...deleteData,
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
    handleDeleteData();
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
