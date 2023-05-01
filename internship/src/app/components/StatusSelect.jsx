import React from "react";

import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const StatusSelect = ({ options, data, setData, defaultValue }) => {
  return (
    <>
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-radio-buttons-group-label"
          name="project-status"
          defaultValue={defaultValue}
        >
          {options?.map((a, i) => {
            return (
              <FormControlLabel
                key={i}
                value={a?.name || null}
                control={<Radio />}
                label={a?.name}
                onChange={() => {
                  setData({
                    ...data,
                    status: { id: a.id, name: a.name, $version: 0 },
                  });
                }}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default StatusSelect;
