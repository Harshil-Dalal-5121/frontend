import React, { useState } from "react";
import {
  Button,
  Container,
  TableBody,
  TableCell,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

import DialogBoxComponent from "app/components/Dialog";

import { Delete, Edit } from "@mui/icons-material";
import api from "../api";

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

const TaskTableContent = ({ data, setData }) => {
  const [open, setOpen] = useState(false);

  const [deleteProject, setDeleteProject] = useState({
    id: "",
    version: "",
    name: "",
    setData: "",
  });
  const handleDeleteTask = async () => {
    const { name, id, version, setData } = deleteProject;
    await api.delete({ id, version, name });
    setData((prev) => prev.filter((project) => project.id !== id));

    setOpen(false);
  };

  const handleClickOpen = (id, version, name, setData) => {
    setDeleteProject({
      ...deleteProject,
      id: id,
      version: version,
      name: name,
      setData: setData,
    });
    setOpen(true);
  };

  const getDate = (val) => {
    var date = new Date(val);

    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();

    var dateString =
      (d <= 9 ? "0" + d : d) + "-" + (m <= 9 ? "0" + m : m) + "-" + y;
    return dateString;
  };

  const handleDelete = () => {
    handleDeleteTask();
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
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
                    style={{ width: `${task?.progressSelect || "0"}% ` }}
                  ></div>
                  {task?.progressSelect || "0"}%
                </div>
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
        <Container>No Records</Container>
      )}
      <DialogBoxComponent
        type="Delete"
        open={open}
        handleCancel={handleCancel}
        handleClose={handleClose}
        onClick={handleDelete}
      />
    </>
  );
};

export default TaskTableContent;
