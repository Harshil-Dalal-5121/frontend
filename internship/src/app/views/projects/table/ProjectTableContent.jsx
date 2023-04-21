import React, { useState } from "react";
import {
  Button,
  TableBody,
  TableCell,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import { Check, XCircle } from "react-bootstrap-icons";
import { Delete, Edit } from "@mui/icons-material";
import { deleteData, model } from "app/services/services";
import { Link } from "react-router-dom";
import { Container } from "@mui/system";
import styled from "@emotion/styled";
import DialogBoxComponent from "app/components/Dialog";

const cellWidth_5 = {
  width: "5vw",
};

const cellWidth_10 = {
  width: "10vw",
};

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
              <StyledTableCell align="center" style={cellWidth_5}>
                {project.id}
              </StyledTableCell>
              <StyledTableCell align="center" style={cellWidth_10}>
                {project.name || "-"}
              </StyledTableCell>
              <StyledTableCell align="center" style={cellWidth_10}>
                {project.code || "-"}
              </StyledTableCell>
              <StyledTableCell align="center" style={cellWidth_10}>
                {project.parentProject?.fullName || "-"}
              </StyledTableCell>
              <StyledTableCell align="center" style={cellWidth_10}>
                {project.clientPartner?.fullName || "-"}
              </StyledTableCell>
              <StyledTableCell align="center" style={cellWidth_10}>
                {project.assignedTo?.fullName || "-"}
              </StyledTableCell>
              <StyledTableCell align="center" style={cellWidth_10}>
                {!project?.fromDate ? "-" : getDate(project?.fromDate)}
              </StyledTableCell>
              <StyledTableCell align="center" style={cellWidth_10}>
                {!project?.toDate ? "-" : getDate(project?.toDate)}
              </StyledTableCell>
              <StyledTableCell align="center" style={{ cellWidth_5 }}>
                {project.imputable === true ? <Check /> : <XCircle />}
              </StyledTableCell>
              <StyledTableCell align="center" style={{ cellWidth_10 }}>
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
