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
  "taskEndDate",
  "progressSelect",
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
  "progressSelect",
  "taskEndDate",
];
const navigate = (path) => {
  return <Navigate replace to={path} />;
};

const saveData = (api, data) => {
  rest.post(
    api,
    { data },
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
};

const saveProject = (data) => {
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

const saveTicket = (data) => {
  rest.post(
    // `${model}Task`,
    { data },
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
};

const saveTask = (data) => {
  rest.post(
    // `${model}Task`,
    { data },
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
};

const getProject = async (id) => {
  try {
    const response = await rest.post(`${model}/${id}/fetch`, {
      fields: tableFields,
    });

    return response;
  } catch (error) {
    return error;
  }
};

const getTicket = (id) => {
  try {
    const response = rest.post(`${model}Task/${id}/fetch`, {
      fields: ticketTableFields,
    });
    if (response && response.data.status !== -1) {
      return response;
    }
  } catch (error) {
    return error;
  }
};

const fetchData = async (api, reqBody) => {
  try {
    const response = await rest.post(api, reqBody);
    if (response && response.data.status !== -1) {
      return response;
    }
  } catch (error) {
    return error;
  }
};

const getTask = (id) => {
  try {
    const response = rest.post(`${model}Task/${id}/fetch`, {
      fields: ticketTableFields,
    });
    if (response && response.data.status !== -1) {
      return response;
    }
  } catch (error) {
    return error;
  }
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

const fetchOptions = async (getter, setter, reqBoy) => {
  const projectOps = await getter(reqBoy);

  if (projectOps && projectOps?.data?.status !== 1) {
    setter(projectOps?.data?.data);
  }
};
const getProjects = async (reqBody) => {
  try {
    const response = await rest.post(` ${model}/search`, reqBody);
    if (response && response.data.status !== -1) {
      return response;
    }
  } catch (error) {
    return error;
  }
};

const getPriority = async (reqBody) => {
  try {
    const response = await rest.post(` ${model}Priority/search`, reqBody);
    if (response && response.data.status !== -1) {
      return response;
    }
  } catch (error) {
    return console.log(error);
  }
};

const getOptions = async (reqBody) => {
  try {
    const response = await rest.post(` ${model}/search`, reqBody);
    if (response && response.data.status !== -1) {
      return response;
    }
  } catch (error) {
    return console.log(error);
  }
};

const handleSearch = async (api, data) => {
  try {
    const response = await rest.post(api, data);
    if (response && response.data.status !== 1) {
      return response;
    }
  } catch (error) {
    return error;
  }
};

const deleteTask = async (reqBody) => {
  const response = await rest.post(`${model}Task/removeAll`, reqBody);

  if (response && response.data.status !== -1) {
    return response;
  }
};

const deleteTicket = async (reqBody) => {
  const response = await rest.post(`${model}Task/removeAll`, reqBody);

  if (response && response.data.status !== -1) {
    return response;
  }
};

export {
  rest,
  model,
  saveData,
  tableFields,
  saveProject,
  deleteData,
  getProjects,
  handleSearch,
  navigate,
  getProject,
  getTask,
  taskTableFields,
  fetchData,
  ticketTableFields,
  deleteTask,
  fetchOptions,
  saveTicket,
  deleteTicket,
  getOptions,
  getPriority,
  getTicket,
  saveTask,
};
