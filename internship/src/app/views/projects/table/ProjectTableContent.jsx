import React, { useState } from "react";
import {
  Button,
  TableBody,
  TableCell,
  TableRow,
  Container,
  tableCellClasses,
} from "@mui/material";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

import { deleteData, model } from "app/services/services";
import DialogBoxComponent from "app/components/Dialog";

import { Delete, Edit } from "@mui/icons-material";
import { Check, XCircle } from "react-bootstrap-icons";

const StyledTableCell = styled(TableCell)(({ theme }) => {
  return {
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  };
});

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ProjectTableContent = ({ data, setData }) => {
  const [open, setOpen] = useState(false);

  const [deleteProject, setDeleteProject] = useState({
    id: "",
    version: "",
    name: "",
    setData: "",
  });

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

  const handleDelete = async () => {
    const { name, id, version, setData } = deleteProject;
    const reqBody = {
      records: [{ id: id, version: version, name: name }],
    };

    await deleteData(`${model}/removeAll`, reqBody);
    setData((prev) => prev.filter((task) => task.id !== id));

    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const getDate = (val) => {
    var date = new Date(val); // M-D-YYYY

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
          {data?.map((project, i) => (
            <StyledTableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell align="center">{project.id}</StyledTableCell>
              <StyledTableCell align="center">
                {project.name || "-"}
              </StyledTableCell>
              <StyledTableCell align="center">
                {project.code || "-"}
              </StyledTableCell>
              <StyledTableCell align="center">
                {project.parentProject?.fullName || "-"}
              </StyledTableCell>
              <StyledTableCell align="center">
                {project.clientPartner?.fullName || "-"}
              </StyledTableCell>
              <StyledTableCell align="center">
                {project.assignedTo?.fullName || "-"}
              </StyledTableCell>
              <StyledTableCell align="center">
                {!project?.fromDate ? "-" : getDate(project?.fromDate)}
              </StyledTableCell>
              <StyledTableCell align="center">
                {!project?.toDate ? "-" : getDate(project?.toDate)}
              </StyledTableCell>
              <StyledTableCell align="center">
                {project.imputable === true ? <Check /> : <XCircle />}
              </StyledTableCell>
              <StyledTableCell align="center">
                {project.projectStatus?.name || "-"}
              </StyledTableCell>
              <StyledTableCell align="center">
                <Link to={`${project.id}`}>
                  <Button variant="contained" color="success">
                    <Edit />
                  </Button>
                </Link>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Button
                  variant="contained"
                  onClick={() =>
                    handleClickOpen(
                      project.id,
                      project.version,
                      project.name,
                      setData
                    )
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

export default ProjectTableContent;
