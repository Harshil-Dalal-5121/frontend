const handleValidate = (data, regex, regexMessege, errorMessages) => {
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

export default handleValidate;
