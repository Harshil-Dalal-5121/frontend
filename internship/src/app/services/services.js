import axios from "axios";
import { Navigate } from "react-router";

const action = axios.create({
  headers: {
    Authorization: "Basic YWRtaW46YWRtaW4=",
  },
});

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
  "name",
  "project",
  "taskDate",
  "status",
  "priority",
  "progressSelect",
  "taskEndDate",
  "assignedTo",
  "parentTask",
];

const ticketTableFields = [
  "name",
  "project",
  "taskDate",
  "status",
  "priority",
  "progressSelect",
  "taskEndDate",
  "assignedTo",
  "parentTask",
];
const navigate = (path) => {
  return <Navigate replace to={path} />;
};

const fetchAction = async ({ projectId, taskId }) => {
  try {
    const response = await action.post(`/ws/action`, {
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

export {
  tableFields,
  taskTableFields,
  ticketTableFields,
  navigate,
  fetchAction,
};
