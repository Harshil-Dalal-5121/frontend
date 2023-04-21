import {
  CircularProgress,
  Container,
  Paper,
  Table,
  TableContainer,
} from "@mui/material";
import PaginationComponent from "app/components/Pagination";
import React from "react";

import TicketTableContent from "./TicketTableContent";
import TicketTableHeader from "./TicketTableHeader";

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
        <Container
          style={{
            height: "52vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Container>
      ) : (
        <>
          <TableContainer
            style={{ padding: "15px", height: "52vh" }}
            component={Paper}
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TicketTableHeader />
              <TicketTableContent
                data={data}
                setData={setData}
                style={{ height: "52vh" }}
              />
            </Table>
          </TableContainer>
        </>
      )}
      <div>
        <p>Total Items: {total}</p>
        <p>Page: {page}</p>
        <PaginationComponent
          total={total}
          limit={limit}
          page={page}
          handleChange={handleChange}
        />
      </div>
    </>
  );
};

export default TicketTable;
