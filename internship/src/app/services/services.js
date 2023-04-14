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
  "taskEndDate",
  "progressSelect",
];
const navigate = (path) => {
  return <Navigate replace to={path} />;
};

const getTasks = async (reqBody) => {
  try {
    const response = await rest.post(` ${model}Task/search`, reqBody);
    if (response && response.data.status !== -1) {
      return response;
    }
  } catch (error) {
    return error;
  }
};

const getTickets = async (reqBody) => {
  try {
    const response = await rest.post(`${model}Task/search`, reqBody);
    if (response) {
      return response;
    }
  } catch (error) {
    console.error(error);
  }
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

const getProject = (id, setData) => {
  rest
    .post(`${model}/${id}/fetch`, { fields: tableFields })
    .then(({ data }) => setData(data?.data[0]));
};

const getTicket = (id, setData) => {
  rest
    .post(`${model}Task/${id}/fetch`, { fields: ticketTableFields })
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
    if (response && response.data.status !== -1) {
      return response;
    }
  } catch (error) {
    return error;
  }
};

const getPriority = async (setData, reqBody) => {
  try {
    const response = await rest.post(` ${model}Priority/search`, reqBody);
    if (response && response.data.status !== -1) {
      setData(response?.data?.data);
    }
  } catch (error) {
    return console.log(error);
  }
};

const getOptions = async (setData, reqBody) => {
  try {
    const response = await rest.post(` ${model}/search`, reqBody);
    if (response && response.data.status !== -1) {
      setData(response?.data?.data);
    }
  } catch (error) {
    return console.log(error);
  }
};

const handleSearch = async (data) => {
  try {
    const response = await rest.post(`${model}/search`, data);
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

const handleTicketSearch = async (data) => {
  try {
    const response = await rest.post(`${model}Task/search`, data);
    if (response && response.data.status !== 1) {
      return response;
    }
  } catch (error) {
    return error;
  }
};

const handleTaskSearch = async (data) => {
  try {
    const response = await rest.post(`${model}Task/search`, data);
    if (response && response.data.status !== 1) {
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
  saveTicket,
  deleteTicket,
  handleTaskSearch,
  handleTicketSearch,
  getOptions,
  getPriority,
  getTicket,
  saveTask,
};
