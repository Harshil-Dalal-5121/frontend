import React from "react";
import { Button, TableBody, TableCell, TableRow } from "@mui/material";
import { Check, XCircle } from "react-bootstrap-icons";
import { Delete, Edit } from "@mui/icons-material";
import { deleteData } from "app/services/services";

const cellWidth_5 = {
  width: "5vw",
};

const cellWidth_10 = {
  width: "10vw",
};

const TableContent = ({ data }) => {
  return (
    <>
      <TableBody>
        {data?.map((project, i) => (
          <TableRow
            key={i}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" style={cellWidth_5}>
              {i + 1}
            </TableCell>
            <TableCell style={cellWidth_5}>{project.id}</TableCell>
            <TableCell style={cellWidth_10}>{project.name || "-"}</TableCell>
            <TableCell align="center" style={cellWidth_10}>
              {project.code || "-"}
            </TableCell>
            <TableCell align="center" style={cellWidth_10}>
              {project.parentProject?.fullName || "-"}
            </TableCell>
            <TableCell align="center" style={cellWidth_10}>
              {project.clientPartner?.fullName || "-"}
            </TableCell>
            <TableCell align="center" style={cellWidth_10}>
              {project.assignedTo?.fullName || "-"}
            </TableCell>
            <TableCell align="center" style={cellWidth_10}>
              {project.fromDate || "-"}
            </TableCell>
            <TableCell align="center" style={cellWidth_10}>
              {project.toDate || "-"}
            </TableCell>
            <TableCell align="center" style={{ cellWidth_5 }}>
              {project.imputable === true ? <Check /> : <XCircle />}
            </TableCell>
            <TableCell align="center" style={{ cellWidth_10 }}>
              {project.projectStatus?.name}
            </TableCell>
            <TableCell align="center">
              <Button variant="contained" color="success" id={project.id}>
                <Edit />
              </Button>
            </TableCell>
            <TableCell align="center">
              <Button
                variant="contained"
                onClick={() =>
                  deleteData(project.id, project.version, project.name)
                }
                color="success"
              >
                <Delete />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default TableContent;
