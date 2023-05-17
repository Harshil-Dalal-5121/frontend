import React, { useState } from "react";
import {
  Container,
  Paper,
  Table,
  TableContainer,
  CircularProgress,
} from "@mui/material";

import ProjectTableHeader from "./ProjectTableHeader";
import ProjectTableContent from "./ProjectTableContent";
import PaginationComponent from "app/components/Pagination";

import styles from "./ProjectTable.module.css";
import DialogBox from "app/components/Dialog";
import { LIMIT } from "app/views/projects/api";

const ProjectTable = ({
  setData,
  data,
  setTotal,
  loading,
  api,
  limit,
  page,
  setPage,
  total,
}) => {
  const handleChange = (event, value) => {
    setPage(value);
  };
  const [open, setOpen] = useState(false);

  const [deleteData, setDeleteData] = useState({
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
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    handleDeleteData();
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      {loading ? (
        <Container className={styles["loading-container"]}>
          <CircularProgress />
        </Container>
      ) : (
        <TableContainer className={styles["table-container"]} component={Paper}>
          <Table sx={{ width: "100%" }} aria-label="customized table">
            <ProjectTableHeader />
            <ProjectTableContent
              data={data}
              setData={setData}
              className={styles["tbody"]}
              handleClickOpen={handleClickOpen}
            />
          </Table>
        </TableContainer>
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
};

export default ProjectTable;
