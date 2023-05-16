import React from "react";
import {
  Button,
  TableBody,
  TableCell,
  TableRow,
  tableCellClasses,
  TableFooter,
} from "@mui/material";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

import { Delete, Edit } from "@mui/icons-material";
import DisplayProgressBar from "./DisplayProgressBar";

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

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const TaskTableContent = ({ data, setData, handleClickOpen }) => {
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
      {data ? (
        <TableBody>
          {data?.map((task, i) => (
            <StyledTableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              style={{ height: "65px" }}
            >
              <StyledTableCell align="center">
                {task?.id || "-"}
              </StyledTableCell>

              <StyledTableCell align="center">
                {task?.name || "-"}
              </StyledTableCell>
              <StyledTableCell align="center">
                {task?.project?.fullName || "-"}
              </StyledTableCell>
              <StyledTableCell align="center">
                {!task?.taskDate ? "-" : getDate(task?.taskDate)}
              </StyledTableCell>
              <StyledTableCell align="center">
                {task?.status?.name || "-"}
              </StyledTableCell>
              <StyledTableCell align="center">
                {task?.priority?.name || "-"}
              </StyledTableCell>

              <StyledTableCell align="center">
                <DisplayProgressBar data={task} />
              </StyledTableCell>
              <StyledTableCell align="center">
                {!task?.taskEndDate ? "-" : getDate(task?.taskEndDate)}
              </StyledTableCell>
              <StyledTableCell align="center">
                {task?.assignedTo?.fullName || "-"}
              </StyledTableCell>
              <StyledTableCell align="center">
                {task?.parentTask?.fullName || "-"}
              </StyledTableCell>
              <StyledTableCell align="center">
                <Link to={`${task.id}`}>
                  <Button variant="contained" color="success">
                    <Edit />
                  </Button>
                </Link>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Button
                  variant="contained"
                  onClick={() =>
                    handleClickOpen(task.id, task.version, task.name, setData)
                  }
                  color="error"
                >
                  <Delete />
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      ) : (
        <TableFooter>
          <TableRow>
            <TableCell>No Records</TableCell>
          </TableRow>
        </TableFooter>
      )}
    </>
  );
};

export default TaskTableContent;
