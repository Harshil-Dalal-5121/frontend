import {
  CircularProgress,
  Container,
  Pagination,
  Paper,
  Table,
  TableContainer,
} from "@mui/material";
import { getTasks } from "app/services/services";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import TaskTableContent from "./TaskTableContent";
import TaskTableHeader from "./TaskTableHeader";

const LIMIT = 5;

const TasksTable = () => {
  const [tasks, setTasks] = useState([]);
  const [total, setTotal] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page") || 1));
  const [loading, setLoading] = useState(false);

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    getTasks(LIMIT, page, setTasks, setTotal, setLoading);
  }, [page]);
  useEffect(() => {
    setSearchParams({ page, limit: LIMIT });
  }, [page, setSearchParams]);

  return (
    <>
      {loading ? (
        <Container
          style={{
            height: "500px",
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
            style={{ padding: "15px", height: "500px" }}
            component={Paper}
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TaskTableHeader />
              <TaskTableContent
                data={tasks}
                setData={setTasks}
                style={{ height: "50vh" }}
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
