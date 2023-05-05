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

const validateForm = (data, regex, regexMessege, errorMessages) => {
  const error = {};

  Object.keys(errorMessages).forEach((key) => {
    if (data[key]) {
      if (!regex[key]?.test(data[key])) {
        error[key] = regexMessege[key];
      }
    } else {
      error[key] = errorMessages[key];
    }
  });

  if (data.taskDate > data.taskEndDate) {
    error.taskEndDate = `End Date is invalid`;
  }

  return error;
};

export { tableFields, taskTableFields, ticketTableFields, validateForm };
