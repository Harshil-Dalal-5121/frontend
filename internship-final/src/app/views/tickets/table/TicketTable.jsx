import {
  CircularProgress,
  Container,
  Paper,
  Table,
  TableContainer,
} from "@mui/material";
import React from "react";

import PaginationComponent from "app/components/Pagination";
import TicketTableContent from "./TicketTableContent";
import TicketTableHeader from "./TicketTableHeader";

import styles from "./TicketTable.module.css";

const TicketTable = ({
  data,
  loading,
  total,
  limit,
  setData,
  page,
  setPage,
}) => {
  const handleChange = (event, value) => {
    setPage(value);
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
                className={styles["tbody"]}
              />
            </Table>
          </TableContainer>
        </>
      )}

      <PaginationComponent
        total={total}
        limit={limit}
        page={page}
        handleChange={handleChange}
      />
    </>
  );
};

export default TicketTable;
