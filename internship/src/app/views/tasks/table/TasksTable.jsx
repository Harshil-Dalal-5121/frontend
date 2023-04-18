import {
  CircularProgress,
  Container,
  Pagination,
  Paper,
  Table,
  TableContainer,
} from "@mui/material";
import React, { useEffect } from "react";

import TaskTableContent from "./TaskTableContent";
import TaskTableHeader from "./TaskTableHeader";

const LIMIT = 5;

const TasksTable = ({
  tasks,
  setTasks,
  page,
  setPage,
  setSearchParams,
  loading,
  total,
}) => {
  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    setSearchParams({ page, limit: LIMIT });
  }, [page, setSearchParams]);

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
                data={tasks}
                setData={setTasks}
                style={{ height: "52vh" }}
              />
            </Table>
          </TableContainer>
        </>
      )}
      <div>
        <p>Total Items: {total}</p>
        <p>Page: {page}</p>
        <Pagination
          count={Math.ceil(total / LIMIT)}
          page={page}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default TasksTable;
