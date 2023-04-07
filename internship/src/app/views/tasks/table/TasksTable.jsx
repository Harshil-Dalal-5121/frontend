import { Paper, Table, TableContainer } from "@mui/material";
import { getTasks } from "app/services/services";
import React, { useEffect, useState } from "react";
import TableContent from "./TableContent";
import TableHeader from "./TableHeader";

const LIMIT = 5;

const TasksTable = () => {
  const [tasks, setTasks] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    setLoading(true);
    getTasks(LIMIT, page, setTasks, setTotal, setLoading);
  }, [page]);
  console.log(tasks);

  return (
    <>
      <TableContainer
        style={{ padding: "20px", height: "450px" }}
        component={Paper}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHeader />
          <TableContent data={tasks} setData={setTasks} />
        </Table>
      </TableContainer>
    </>
  );
};

export default TasksTable;
