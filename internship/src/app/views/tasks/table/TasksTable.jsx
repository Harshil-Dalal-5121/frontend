import {
  CircularProgress,
  Container,
  Paper,
  Table,
  TableContainer,
} from "@mui/material";
import React, { useEffect } from "react";

import TaskTableContent from "./TaskTableContent";
import TaskTableHeader from "./TaskTableHeader";
import PaginationComponent from "app/components/Pagination";

import styles from "./TaskTable.module.css";

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
        <Container className={styles["loading-container"]}>
          <CircularProgress />
        </Container>
      ) : (
        <>
          <TableContainer
            className={styles["table-container"]}
            component={Paper}
          >
            <Table sx={{ minWidth: 650 }} aria-label="customized table">
              <TaskTableHeader />
              <TaskTableContent
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

export default TasksTable;
