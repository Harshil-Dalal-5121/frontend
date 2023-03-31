import React, { useEffect, useState } from "react";
import { Check, XCircle } from "react-bootstrap-icons";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import axios from "axios";

const tableFields = [
  "name",
  "fromDate",
  "projectStatus",
  "parentProject",
  "clientPartner",
  "toDate",
  "imputable",
  "assignedTo",
  "code",
];

const auth = async () => {
  const data = await axios.post("/callback", {
    username: "admin",
    password: "admin",
  });
  localStorage.setItem("csrf-token", data.headers["x-csrf-token"]);
};

const App = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    auth();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("csrf-token");
    axios
      .post(
        "ws/rest/com.axelor.apps.project.db.Project/search",
        {
          fields: tableFields,
        },
        {
          headers: {
            "X-CSRF-TOKEN": token,
          },
        }
      )
      .then((reponse) => {
        setProjects(reponse.data.data);
      });
  }, []);

  return (
    <>
      <legend>Projects</legend>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Code</TableCell>
              <TableCell align="center">Parent Project</TableCell>
              <TableCell align="center">Customer</TableCell>
              <TableCell align="center">Assigned To</TableCell>
              <TableCell align="center">From Date</TableCell>
              <TableCell align="center">To Date</TableCell>
              <TableCell align="center">Imputable</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects?.map((project) => (
              <TableRow
                key={project.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="project">
                  {project.id}
                </TableCell>
                <TableCell component="th" scope="project">
                  {project.name || "-"}
                </TableCell>
                <TableCell align="center">{project.code || "-"}</TableCell>
                <TableCell align="center">
                  {project.parentProject || "-"}
                </TableCell>
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
                <TableCell align="center">
                  {project.projectStatus?.name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default App;
