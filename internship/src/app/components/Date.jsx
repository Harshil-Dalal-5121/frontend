import { InputLabel, TextField } from "@mui/material";

import React from "react";

const DateField = ({ name, value, label, onChange, startDate, error }) => {
  return (
    <>
      <InputLabel>{label}</InputLabel>
      <TextField
        error={error ? true : false}
        helperText={error ? `${error}` : ""}
        fullWidth
        onChange={(e) => onChange(e)}
        id={`${label}`}
        value={value || ""}
        name={`${name}`}
        type="date"
        variant="standard"
        InputProps={
          startDate
            ? { inputProps: { min: startDate?.slice(0, 10) || "" } }
            : null
        }
      />
    </>
  );
};

export default DateField;
