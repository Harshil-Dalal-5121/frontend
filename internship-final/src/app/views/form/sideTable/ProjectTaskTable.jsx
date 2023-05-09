import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import styled from "@emotion/styled";
import PaginationComponent from "app/components/Pagination";
import api from "../../tasks/api";

import styles from "./ProjectTaskTable.module.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const LIMIT = 3;

const ProjectTaskTable = ({ id }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const getTasks = useCallback(async ({ id, offset, limit }) => {
    const { data } = await api.fetchTasks({ id, offset, limit });
    setTasks(data?.data);
    setTotal(data?.total);
  }, []);

  const getDate = (val) => {
    var date = new Date(val);

    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();

    var dateString =
      (d <= 9 ? "0" + d : d) + "-" + (m <= 9 ? "0" + m : m) + "-" + y;
    return dateString;
  };

  useEffect(() => {
    setLoading(true);
    getTasks({ id, offset: (page - 1) * LIMIT, limit: LIMIT }).finally(() => {
      setLoading(false);
    });
  }, [getTasks, id, page]);

  return (
    <>
      {loading ? (
        <Container className={styles["loading-container"]}>
          <CircularProgress className={styles["loading"]} />
        </Container>
      ) : (
        <>
          <Box>
            <TableContainer
              sx={{
                ...styles["table-container"],
                height: "23vh",
                overflow: "auto",
              }}
              component={Paper}
            >
              <Table
                sx={styles["table-container"]}
                aria-label="customized table"
              >
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell>Project</StyledTableCell>
                    <StyledTableCell>Start Date</StyledTableCell>
                    <StyledTableCell>Assigned To</StyledTableCell>
                    <StyledTableCell>Progress</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                {tasks ? (
                  <TableBody>
                    {tasks?.map((task, i) => {
                      return (
                        <StyledTableRow key={i}>
                          <StyledTableCell>{task?.name}</StyledTableCell>
                          <StyledTableCell>
                            {" "}
                            {!task?.taskDate ? "-" : getDate(task?.taskDate)}
                          </StyledTableCell>
                          <StyledTableCell>
                            {task?.assignedTo?.fullName}
                          </StyledTableCell>
                          <StyledTableCell>
                            <div
                              className="progress"
                              role="progressbar"
                              aria-label="Animated striped example"
                              aria-valuenow="75"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            >
                              <div
                                className={
                                  task?.progressSelect <= 30
                                    ? "progress-bar progress-bar-striped progress-bar-animated bg-danger"
                                    : task?.progressSelect > 30 &&
                                      task?.progressSelect <= 50
                                    ? "progress-bar progress-bar-striped progress-bar-animated bg-warning"
                                    : task?.progressSelect > 50 &&
                                      task?.progressSelect <= 80
                                    ? "progress-bar progress-bar-striped progress-bar-animated bg-info"
                                    : "progress-bar progress-bar-striped progress-bar-animated bg-success"
                                }
                                style={{
                                  width: `${task?.progressSelect || "0"}% `,
                                }}
                              ></div>
                              {task?.progressSelect || "0"}%
                            </div>
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
                  </TableBody>
                ) : (
                  <Container>No Records</Container>
                )}
              </Table>
            </TableContainer>
            <PaginationComponent
              total={total}
              limit={LIMIT}
              page={page}
              handleChange={handleChange}
              boundaryCount={2}
            />
          </Box>
        </>
      )}
    </>
  );
};

export default ProjectTaskTable;
