import { Slider } from "@mui/material";
import React from "react";

const ProgressBar = ({ name, value, step, onChange }) => {
  return (
    <>
      <Slider
        value={value || 0}
        name={`${name}`}
        onChange={(e) => onChange(e)}
        defaultValue={0}
        valueLabelDisplay="auto"
        step={step}
        color={
          value <= 20
            ? "primary"
            : value > 20 && value <= 50
            ? "warning"
            : value > 50 && value <= 80
            ? "info"
            : "success"
        }
        min={0}
        max={100}
      />
    </>
  );
};

export default ProgressBar;
