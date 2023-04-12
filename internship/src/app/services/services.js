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

const getTasks = async (reqBody) => {
  try {
    const response = await rest.post(` ${model}Task/search`, reqBody);
    if (response && response.status !== -1) {
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

const getOptions = async (setData) => {
  try {
    const response = await rest.post(` ${model}/search`, {
      data: {
        _domain: "self.projectStatus.isCompleted = false",
        _domainContext: {
          _project: null,
          _projectIds: [0],
          _typeSelect: "ticket",
          toInvoice: false,
          hasDateOrFrequencyChanged: false,
          "project.isShowStatus": true,
          discountAmount: "0",
          typeSelect: "ticket",
          isFirst: true,
          progressSelect: 0,
          unitPrice: "0",
          plannedProgress: "0",
          invoiced: false,
          isTaskRefused: false,
          isPaid: false,
          "project.isShowTimeSpent": false,
          totalRealHrs: "0",
          "project.isShowFrequency": false,
          "project.isShowTaskCategory": true,
          isPrivate: false,
          doApplyToAllNextTasks: false,
          discountTypeSelect: 3,
          "project.isShowProgress": true,
          "project.invoicingSequenceSelect": 0,
          isOrderAccepted: false,
          quantity: "0",
          assignment: 2,
          "project.isShowPlanning": true,
          isOrderProposed: false,
          exTaxTotal: "0",
          totalPlannedHrs: "0",
          invoicingType: "",
          "project.isShowSection": true,
          priceDiscounted: "0",
          budgetedTime: "0",
          "project.isShowPriority": true,
          taskDate: "2023-04-12",
          project: null,
          assignedTo: {
            code: "admin",
            fullName: "Admin",
            id: "1",
          },
          attrs: "{}",
          _model: "com.axelor.apps.project.db.ProjectTask",
        },
      },
      fields: ["id", "fullName", "name", "code"],
      limit: 10,
    });
    if (response && response.status !== -1) {
      setData(response?.data?.data);
    }
  } catch (error) {
    return console.log(error);
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

const deleteTicket = async (reqBody) => {
  const response = await rest.post(`${model}Task/removeAll`, reqBody);

  if (response && response.status !== -1) {
    return response;
  }
};

const handleTicketSearch = async (data) => {
  try {
    const response = await rest.post(`${model}Task/search}`, data);
    if (response && response.status !== 1) {
      return response;
    }
  } catch (error) {
    return error;
  }
};

const handleTaskSearch = async (data) => {
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
  deleteTicket,
  handleTaskSearch,
  handleTicketSearch,
  getOptions,
};
