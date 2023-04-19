import styled from "@emotion/styled";
import {
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
import { fetchData, model } from "app/services/services";
import React, { useEffect, useState } from "react";

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

const ProjectTaskTable = ({ id }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const reqBody = {
    data: {
      _domain:
        "(self.project.id = :_id AND self.parentTask = null) AND (self.project.id = :_id)",

      _domainAction: "action-view-show-project-task-tree",
      _domainContext: {
        id: id,
        _model: "com.axelor.apps.project.db.Project",
        _countOn: "parentTask",
      },
    },
    fields: ["name", "taskDate", "assignedTo", "progressSelect"],
    limit: 40,

    sortBy: ["taskDate"],
  };

  const getTasks = async () => {
    setLoading(true);
    const response = await fetchData(`${model}Task/search`, reqBody);
    setLoading(false);
    if (response) {
      setTasks(response?.data?.data);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);
  console.log(tasks);

  const getDate = (val) => {
    var date = new Date(val);

    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();

    var dateString =
      (d <= 9 ? "0" + d : d) + "-" + (m <= 9 ? "0" + m : m) + "-" + y;
    return dateString;
  };

  return (
    <>
      {loading ? (
        <Container
          style={{
            height: "10vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress
            style={{
              margin: "auto",
            }}
          />
        </Container>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="customized table">
              <TableHead>
                <StyledTableCell>Project</StyledTableCell>
                <StyledTableCell>Start Date</StyledTableCell>
                <StyledTableCell>Assigned To</StyledTableCell>
                <StyledTableCell>Progress</StyledTableCell>
              </TableHead>
              <TableBody>
                {tasks?.map((task, i) => {
                  return (
                    <StyledTableRow>
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
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
};

export default ProjectTaskTable;
