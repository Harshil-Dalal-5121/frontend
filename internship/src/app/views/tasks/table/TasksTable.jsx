import {
  CircularProgress,
  Container,
  Paper,
  Table,
  TableContainer,
} from "@mui/material";
import PaginationComponent from "app/components/PaginationComponent";
import React, { useEffect } from "react";

import TaskTableContent from "./TaskTableContent";
import TaskTableHeader from "./TaskTableHeader";

const TasksTable = ({
  data,
  setData,
  page,
  limit,
  setPage,
  setSearchParams,
  loading,
  total,
}) => {
  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    setSearchParams({ page, limit: limit });
  }, [page, limit, setSearchParams]);

  return (
    <>
      {loading ? (
        <Container
          style={{
            height: "52vh",
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
            style={{ padding: "0 15px", height: "52vh" }}
            component={Paper}
          >
            <Table sx={{ minWidth: 650 }} aria-label="customized table">
              <TaskTableHeader />
              <TaskTableContent
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

export default TasksTable;
