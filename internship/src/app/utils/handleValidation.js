const handleValidation = (data, errorMessages, startDate, endDate) => {
  const error = {};
  Object.keys(errorMessages)?.forEach((key) => {
    if (!data[key]) {
      error[key] = errorMessages[key];
    }
  });

  if (endDate) {
    if (startDate > endDate) {
      error["endDate"] = `Invalid End Date`;
    }
  }

  return error;
};

export default handleValidation;
