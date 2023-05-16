import React from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const StatusSelect = ({ data, setData, property, status, defaultValue }) => {
  const handleStatusChange = (e) => {
    const { value } = e.target;
    const selectedObject = status.find((s) => s.name === value);
    setData({
      ...data,
      [property]: {
        id: selectedObject?.id,
        name: selectedObject?.name,
        version: 0,
      },
    });
  };

  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-radio-buttons-group-label"
        name="project-status"
        defaultValue={defaultValue || "New"}
        onChange={(e) => handleStatusChange(e)}
      >
        {status.map((s, i) => {
          return (
            <FormControlLabel
              key={i}
              value={s?.name || null}
              control={<Radio />}
              label={s.name}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};

export default StatusSelect;
