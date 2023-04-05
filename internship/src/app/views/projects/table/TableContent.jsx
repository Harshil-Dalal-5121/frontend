import React from "react";
import { useEffect, useState } from "react";
import { Button, TableBody, TableCell, TableRow } from "@mui/material";

import { rest, model, tableFields } from "app/services/services";

import { Check, XCircle } from "react-bootstrap-icons";
import { Delete, Edit } from "@mui/icons-material";

const TableContent = () => {
  const [projects, setProjects] = useState([]);

  const deleteData = (id, version, name) => {
    if (window.confirm(`Do You want to delete record of ${name}?`)) {
      rest.post("ws/rest/com.axelor.apps.project.db.Project/removeAll", {
        records: [{ id: id, version: version }],
      });
    }
  };

  useEffect(() => {
    rest
      .post(`${model}`, {
        fields: tableFields,
      })
      .then((reponse) => {
        setProjects(reponse.data.data);
      });
  }, []);
  return (
    <>
      <TableBody>
        {projects?.map((project) => (
          <TableRow
            key={project.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th">{project.id}</TableCell>
            <TableCell>{project.name || "-"}</TableCell>
            <TableCell align="center">{project.code || "-"}</TableCell>
            <TableCell align="center">{project.parentProject || "-"}</TableCell>
            <TableCell align="center">
              {project.clientPartner?.fullName || "-"}
            </TableCell>
            <TableCell align="center">
              {project.assignedTo?.fullName || "-"}
            </TableCell>
            <TableCell align="center">{project.fromDate || "-"}</TableCell>
            <TableCell align="center">{project.toDate || "-"}</TableCell>
            <TableCell align="center">
              {project.imputable === true ? <Check /> : <XCircle />}
            </TableCell>
            <TableCell align="center">{project.projectStatus?.name}</TableCell>
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
