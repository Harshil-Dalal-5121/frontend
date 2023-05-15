const handleValidation = (data, errorMessages, startDate, endDate) => {
  const error = {};

  Object.keys(errorMessages)?.forEach((key) => {
    if (!data[key]) {
      error[key] = errorMessages[key];
    }
  });
  if (startDate > endDate) {
    error["endDate"] = `Invalid End Date`;
  }

  console.log(`error >>>`, error);
  return error;
};

export default handleValidation;
