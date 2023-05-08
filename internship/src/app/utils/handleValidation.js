const handleValidation = (data, errorMessages) => {
  const error = {};

  Object.keys(errorMessages)?.forEach((key) => {
    if (!data[key] || data[key]?.fullName?.trim() === "") {
      error[key] = errorMessages[key];
    }
  });

  if (data.taskDate > data.taskEndDate) {
    error.taskEndDate = `End Date is invalid`;
  }

  return error;
};

export default handleValidation;
