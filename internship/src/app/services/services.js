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
  "progressSelect",
  "taskEndDate",
  "assignedTo",
  "parentTask",
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
  "assignedTo",
  "parentTask",
];
const navigate = (path) => {
  return <Navigate replace to={path} />;
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

const getData = async (api, fields) => {
  try {
    const response = await rest.post(api, { fields: fields });
    if (response) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteData = async (api, reqBody) => {
  const response = await rest.post(api, reqBody);

  if (response && response.data.status !== -1) {
    return response;
  }
};

const fetchOptions = async (getter, setter, reqBoy) => {
  const projectOps = await getter(reqBoy);

  if (projectOps && projectOps?.data?.status !== -1) {
    setter(projectOps?.data?.data || []);
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

const fetchAction = async (projectId, taskId) => {
  try {
    const response = await rest.post(`/ws/action`, {
      model: "com.axelor.apps.project.db.ProjectTask",
      action: "action-project-task-attrs-project-parent-task-configurations",
      data: {
        criteria: [],
        context: {
          _model: "com.axelor.apps.project.db.ProjectTask",
          _typeSelect: "task",

          project: {
            id: projectId,
          },
          id: taskId,

          _source: "parentTask",
        },
      },
    });

    if (response && response.data.status !== -1) {
      const domain = response?.data.data[0].attrs.parentTask.domain;
      return domain;
    }
  } catch (error) {
    return error;
  }
};

const fetchAssign = async (reqBody) => {
  try {
    const response = await rest.post(
      `/ws/rest/com.axelor.auth.db.User/search`,
      reqBody
    );

    if (response && response.data.status !== -1) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

const fetchParentTask = async (projectId, taskId, reqBody) => {
  try {
    const domain = await fetchAction(projectId, taskId);
    const response = await rest.post(`${model}Task/search`, {
      fields: ["id", "fullName", "name"],

      data: {
        ...reqBody,
        _domain: domain,
        _domainContext: {
          _typeSelect: "task",
          project: {
            id: projectId,
          },
          typeSelect: "task",
          _model: "com.axelor.apps.project.db.ProjectTask",
        },
      },
    });

    if (response && response.data.status !== -1) {
      return response?.data?.data;
    }
  } catch (error) {
    return error;
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

export {
  rest,
  model,
  tableFields,
  taskTableFields,
  ticketTableFields,
  navigate,
  fetchData,
  saveData,
  getData,
  deleteData,
  fetchOptions,
  getOptions,
  getPriority,
  handleSearch,
  fetchAction,
  fetchParentTask,
  fetchAssign,
};
