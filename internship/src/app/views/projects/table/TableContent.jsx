import React from "react";
import { Button, TableBody, TableCell, TableRow } from "@mui/material";
import { Check, XCircle } from "react-bootstrap-icons";
import { Delete, Edit } from "@mui/icons-material";
import { deleteData } from "app/services/services";
import { Link } from "react-router-dom";

const cellWidth_5 = {
  width: "5vw",
};

const cellWidth_10 = {
  width: "10vw",
};

const TableContent = ({ data, setData }) => {
  return (
    <>
      <TableBody>
        {data?.map((project, i) => (
          <TableRow
            key={i}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
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
              {project.fromDate?.slice(0, 10) || "-"}
            </TableCell>
            <TableCell align="center" style={cellWidth_10}>
              {project.toDate?.slice(0, 10) || "-"}
            </TableCell>
            <TableCell align="center" style={{ cellWidth_5 }}>
              {project.imputable === true ? <Check /> : <XCircle />}
            </TableCell>
            <TableCell align="center" style={{ cellWidth_10 }}>
              {project.projectStatus?.name}
            </TableCell>
            <TableCell align="center">
              <Link to={`${project.id}`}>
                <Button variant="contained" color="success">
                  <Edit />
                </Button>
              </Link>
            </TableCell>
            <TableCell align="center">
              <Button
                variant="contained"
                onClick={() =>
                  deleteData(project.id, project.version, project.name, setData)
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
