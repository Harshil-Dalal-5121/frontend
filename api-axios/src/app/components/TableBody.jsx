import React, { useState, useEffect } from "react";
import axios from "axios";
import { Check, XCircle } from "react-bootstrap-icons";

const fields = [
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

const auth = () => {
  return axios
    .post("/callback", { username: "admin", password: "admin" })
    .then((data) => {
      localStorage.setItem("csrf-token", data.headers["x-csrf-token"]);
    });
};

const TableBody = () => {
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
          fields: fields,
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
      <tbody className="table-group-divider">
        {projects?.map((project) => (
          <tr key={project.id}>
            <td>{project.id}</td>
            <td>{project.name || "-"}</td>
            <td>{project.code || "-"}</td>
            <td>{project.parentProject || "-"}</td>
            <td>{project.clientPartner?.fullName || "-"}</td>
            <td>{project.assignedTo?.fullName || "-"}</td>
            <td>{project.fromDate || "-"}</td>
            <td>{project.toDate || "-"}</td>
            <td>{project.imputable === true ? <Check /> : <XCircle />}</td>
            <td>{project.projectStatus?.name}</td>
          </tr>
        ))}
      </tbody>
    </>
  );
};

export default TableBody;
