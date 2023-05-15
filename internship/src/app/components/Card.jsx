import * as React from "react";

import { Grid, Card, Container, CircularProgress } from "@mui/material";

import PaginationComponent from "app/components/Pagination";

import styles from "./Card.module.css";
import DialogBox from "app/components/Dialog";
import { LIMIT } from "app/views/tasks/api";

export default function CardList({
  data,
  setData,
  page,
  card,
  api,
  limit,
  setPage,
  loading,
  total,
  setTotal,
}) {
  const handleChange = (event, value) => {
    setPage(value);
  };
  const [open, setOpen] = React.useState(false);

  const [deleteData, setDeleteData] = React.useState({
    id: "",
    version: "",
    name: "",
    setData: "",
  });
  const handleDeleteData = async () => {
    const { name, id, version, setData } = deleteData;
    const response = await api.delete({ id, version, name });
    if (response) {
      const response = await api.find({
        search: "",
        offset: (page - 1) * LIMIT,
      });
      setData(response?.data);
      setTotal(response?.total);

      if (response?.total % 6 === 0) {
        setPage(page - 1);
      }
    }

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
        <div className={styles?.container}>
          <Grid container spacing={2}>
            {data?.map((item, i) => {
              return (
                <>
                  <Grid item xs={12} sm={4} key={i}>
                    <Card variant="outlined" className={styles?.card} key={i}>
                      {card(item, handleClickOpen, setData, i)}
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
        total={total || 0}
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
