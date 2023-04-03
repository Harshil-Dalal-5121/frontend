// name,
// fromDate,
// projectStatus,
// parentProject,
// clientPartner,
// toDate,
// imputable,
// assignedTo,
// code
//
import React, { useEffect, useState } from "react";
import { Check, XCircle } from "react-bootstrap-icons";
import {
  Button,
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

// const auth = async () => {
//   const data = await axios.post("/callback", {
//     username: "admin",
//     password: "admin",
//   });
//   localStorage.setItem("csrf-token", data.headers["x-csrf-token"]);
// };

const intialValues = {
  name: "",
  fromDate: "",
  projectStatus: "",
  parentProject: "",
  clientPartner: "",
  toDate: "",
  imputable: "",
  assignedTo: "",
  code: "",
};

const App = () => {
  const [projects, setProjects] = useState();
  const [newproject, setNewProject] = useState(intialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newproject, [name]: value });
  };

  const rest = axios.create({
    headers: {
      Authorization: "Basic YWRtaW46YWRtaW4=",
    },
  });

  // useEffect(() => {
  //   auth();
  // }, []);

  // useEffect(() => {
  //   const token = localStorage.getItem("csrf-token");
  //   axios
  //     .post(
  //       "ws/rest/com.axelor.apps.project.db.Project/search",
  //       {
  //         fields: tableFields,
  //       },
  //       {
  //         headers: {
  //           "X-CSRF-TOKEN": token,
  //         },
  //       }
  //     )
  //     .then((reponse) => {
  //       setProjects(reponse.data.data);
  //     });
  // }, []);

  const saveProject = () => {
    let data = newproject;

    console.log(data);
    rest.post("ws/rest/com.axelor.apps.project.db.Project", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: data,
    });
  };

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
              <TableCell align="center" colSpan={"2"}>
                Operations
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects?.map((project) => (
              <TableRow
                key={project.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="project">
                  {project?.id}
                </TableCell>
                <TableCell component="th" scope="project">
                  {project?.name || "-"}
                </TableCell>
                <TableCell align="center">{project.code || "-"}</TableCell>
                <TableCell align="center">
                  {project?.parentProject || "-"}
                </TableCell>
                <TableCell align="center">
                  {project.clientPartner?.fullName || "-"}
                </TableCell>
                <TableCell align="center">
                  {project.assignedTo?.fullName || "-"}
                </TableCell>
                <TableCell align="center">{project?.fromDate || "-"}</TableCell>
                <TableCell align="center">{project?.toDate || "-"}</TableCell>
                <TableCell align="center">
                  {project?.imputable === true ? <Check /> : <XCircle />}
                </TableCell>
                <TableCell align="center">
                  {project.projectStatus?.name}
                </TableCell>

                <TableCell align="center">
                  <Button variant="contained" color="success" id={project.id}>
                    Update
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button variant="contained" color="success">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div style={{ padding: "50px" }}>
        <form>
          <table border={`2`}>
            <tr>
              <td>Name :</td>
              <td>
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Code :</td>
              <td>
                <input
                  type="text"
                  name="code"
                  id="code"
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Parent Project :</td>
              <td>
                <input
                  type="text"
                  name="parentProject"
                  id="parentProject"
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Customer :</td>
              <td>
                <input
                  type="text"
                  name="customer"
                  id="customer"
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Assigned To :</td>
              <td>
                <input
                  type="text"
                  name="assignedTo"
                  id="assignedTo"
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>From Date :</td>
              <td>
                <input
                  type="date"
                  name="fromTo"
                  id="fromTo"
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>To Date :</td>
              <td>
                <input
                  type="date"
                  name="toDate"
                  id="toDate"
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={"2"}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={saveProject}
                >
                  Update
                </Button>
              </td>
            </tr>
          </table>
        </form>
      </div>
    </>
  );
};

export default App;
