import {
  CircularProgress,
  Container,
  Paper,
  Table,
  TableContainer,
} from "@mui/material";
import React, { useState } from "react";

import PaginationComponent from "app/components/Pagination";
import TicketTableContent from "./TicketTableContent";
import TicketTableHeader from "./TicketTableHeader";

import styles from "./TicketTable.module.css";
import { LIMIT } from "../api";
import DialogBox from "app/components/Dialog";

const TicketTable = ({
  data,
  loading,
  total,
  limit,
  api,
  setData,
  page,
  setTotal,
  setPage,
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
      {loading ? (
        <Container className={styles["loading-container"]}>
          <CircularProgress />
        </Container>
      ) : (
        <>
          <TableContainer
            className={styles["table-container"]}
            component={Paper}
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TicketTableHeader />
              <TicketTableContent
                data={data}
                setData={setData}
                handleClickOpen={handleClickOpen}
                className={styles["tbody"]}
              />
            </Table>
          </TableContainer>
        </>
      )}

      <DialogBox
        type="Delete"
        open={open}
        handleCancel={handleCancel}
        handleClose={handleClose}
        onClick={handleDelete}
      />

      <PaginationComponent
        total={total || 0}
        limit={limit}
        page={page}
        handleChange={handleChange}
      />
    </>
  );
};

export default TicketTable;
