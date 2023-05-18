import {
  CircularProgress,
  Table,
  TableContainer,
  TableHead,
} from "@mui/material";
import { Container } from "@mui/system";
import styles from "./DataTable.module.css";
import React, { useState } from "react";
import DialogBox from "./Dialog";
import PaginationComponent from "./Pagination";
import { StyledTableCell, StyledTableRow } from "./StyledTableComponents";
import { LIMIT } from "app/utils/constants";

const DataTable = ({
  data,
  setData,
  page,
  fields,
  api,
  limit,
  setPage,
  setTotal,
  loading,
  total,
  tableContent,
}) => {
  const [open, setOpen] = useState(false);

  const [deleteData, setDeleteData] = useState({
    id: "",
    version: "",
    name: "",
    setData: "",
  });
  const handleChange = (event, value) => {
    setPage(value);
  };

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
        page = 1 ? setPage(1) : setPage(page - 1);
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
          <TableContainer className={styles["table-container"]}>
            <Table sx={{ minWidth: 650 }} aria-label="customized table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell align="center">Id</StyledTableCell>
                  {fields?.map((field, i) => {
                    return (
                      <StyledTableCell
                        key={i}
                        align="center"
                        style={{ textTransform: "capitalize" }}
                      >
                        {field}
                      </StyledTableCell>
                    );
                  })}
                  <StyledTableCell align="center" colSpan={2}>
                    Operations
                  </StyledTableCell>
                </StyledTableRow>
              </TableHead>
              {tableContent(data, setData, handleClickOpen)}
            </Table>
          </TableContainer>
        </>
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

export default DataTable;
