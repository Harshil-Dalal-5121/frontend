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

const ticketTableFields = [
  "ticketNumber",
  "name",
  "project",
  "taskDate",
  "status",
  "priority",
  "projectTaskCategory",
  "targetVersion",
];
const navigate = (path) => {
  return <Navigate replace to={path} />;
};

const getTasks = (LIMIT, page, setTasks, setTotal, setLoading) => {
  setLoading(true);
  const offset = (page - 1) * LIMIT;
  rest
    .post(`${model}Task/search`, {
      data: {
        _domain: "self.typeSelect = :_typeSelect",
        _domainContext: {
          _typeSelect: "task",
          _model: "com.axelor.apps.project.db.ProjectTask",
        },
      },
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

const getTickets = (LIMIT, page, setTasks, setTotal, setLoading) => {
  setLoading(true);
  const offset = (page - 1) * LIMIT;
  rest
    .post(`${model}Task/search`, {
      data: {
        _domain:
          "self.project.projectStatus.isCompleted = false AND self.typeSelect = :_typeSelect AND (self.project.id IN :_projectIds OR :_project is null) AND :__user__ MEMBER OF self.project.membersUserSet",
        _domainContext: {
          _project: null,
          _projectIds: [0],
          _typeSelect: "ticket",
          _model: "com.axelor.apps.project.db.ProjectTask",
        },
      },
      fields: ticketTableFields,
      offset,
      limit: LIMIT,
    })
    .then((response) => {
      setTasks(response.data.data);
      setTotal(response.data.total);
      setLoading(false);
    });
};

const saveProject = (data) => {
  rest.post(
    `${model}`,
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

const getProjects = async (reqBody) => {
  try {
    const response = await rest.post(` ${model}/search`, reqBody);
    if (response && response.status !== -1) {
      return response;
    }
  } catch (error) {
    return error;
  }
};

const handleSearch = async (data) => {
  try {
    const response = await rest.post(`${model}/search`, data);
    if (response && response.status !== 1) {
      return response;
    }
  } catch (error) {
    return error;
  }
};

const deleteTask = async (reqBody) => {
  const response = await rest.post(`${model}Task/removeAll`, reqBody);

  if (response && response.status !== -1) {
    return response;
  }
};

const handleTaskSearch = async (data) => {
  // http://188.165.230.109:8080/ws/rest/com.axelor.apps.project.db.ProjectTask/search
  try {
    const response = await rest.post(`${model}Task/search`, data);
    if (response && response.status !== 1) {
      return response;
    }
  } catch (error) {
    return error;
  }
};

export {
  rest,
  model,
  tableFields,
  saveProject,
  deleteData,
  getProjects,
  handleSearch,
  navigate,
  getProject,
  getTasks,
  taskTableFields,
  getTickets,
  ticketTableFields,
  deleteTask,
  handleTaskSearch,
};
