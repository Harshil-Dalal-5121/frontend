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

const taskTableFields = [
  "ticketNumber",
  "name",
  "project",
  "taskDate",
  "status",
  "priority",
  "projectTaskCategory",
  "targetVersion",
];

const getTasks = (LIMIT, page, setTasks, setTotal, setLoading) => {
  const offset = (page - 1) * LIMIT;
  rest
    .post(`${model}Task/search`, {
      fields: taskTableFields,
      offset,
      limit: LIMIT,
    })
    .then((response) => {
      setTasks(response.data.data);
      setTotal(response.data.total);
      setLoading(false);
    });
};

const navigate = (path) => {
  return <Navigate replace to={path} />;
};

const saveNewProject = (data) => {
  rest.post(
    // `${model}`,
    { data },
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
};

const getProject = (id, setData) => {
  rest
    .post(`${model}/${id}/fetch`, { fields: tableFields })
    .then(({ data }) => setData(data?.data[0]));
};

const deleteData = (id, version, name, setData) => {
  rest
    .post(`${model}/removeAll`, {
      records: [{ id: id, version: version, name: name }],
    })
    .then(() => {
      setData((prev) => prev.filter((project) => project.id !== id));
    });
};

export {
  rest,
  model,
  tableFields,
  saveNewProject,
  deleteData,
  navigate,
  getProject,
  getTasks,
  taskTableFields,
};
