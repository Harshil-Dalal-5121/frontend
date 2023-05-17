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
import { Check, XCircle } from "react-bootstrap-icons";
import getDate from "app/utils/helperFunctions";

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
  height: "7.5vh",
}));

const ProjectTableContent = ({ data, setData, handleClickOpen }) => {
  return (
    <>
      {data ? (
        <TableBody>
          {data?.map((project, i) => (
            <StyledTableRow
              key={i}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
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
        <TableFooter>
          <TableRow>
            <TableCell>No Records</TableCell>
          </TableRow>
        </TableFooter>
      )}
    </>
  );
};

export default ProjectTableContent;
