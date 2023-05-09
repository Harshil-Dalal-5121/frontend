const handleValidation = (data, errorMessages) => {
  const error = {};

  Object.keys(errorMessages)?.forEach((key) => {
    if (!data[key]) {
      error[key] = errorMessages[key];
    }
  });

  return error;
};

export default handleValidation;
