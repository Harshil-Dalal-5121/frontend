import axios from "axios";
import { Navigate } from "react-router";

const rest = axios.create({
  headers: {
    Authorization: "Basic YWRtaW46YWRtaW4=",
  },
});

const model = "/ws/rest/com.axelor.apps.project.db.Project";

const tableFields = [
  "id",
  "name",
  "code",
  "parentProject",
  "clientPartner",
  "assignedTo",
  "fromDate",
  "toDate",
  "imputable",
  "projectStatus",
];

const navigate = (path) => {
  return <Navigate replace to={path} />;
};

const saveNewProject = (data) => {
  navigate();
  if (window.confirm(`Do you want to add this project ?`)) {
    rest.post(
      "ws/rest/com.axelor.apps.project.db.Project",
      { data },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
  }
};

const getProject = async (id, setData) => {
  await rest
    .post(`${model}/${id}/fetch`, { fields: tableFields })
    .then(({ data }) => setData(data?.data[0]));
};

const deleteData = (id, version, name, setData) => {
  if (window.confirm(`Do You want to delete record of ${name}?`)) {
    rest
      .post(`${model}/removeAll`, {
        records: [{ id: id, version: version }],
      })
      .then(() => {
        setData((prev) => prev.filter((project) => project.id !== id));
      });
  }
};

export {
  rest,
  model,
  tableFields,
  saveNewProject,
  deleteData,
  navigate,
  getProject,
};
