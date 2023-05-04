import React from "react";

import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
const status = [
  {
    name: "New",
    id: "5",
  },
  {
    name: "In progress",
    id: "6",
  },
  {
    name: "Done",
    id: "7",
  },
  {
    name: "Canceled",
    id: "8",
  },
];

const StatusSelect = ({ data, setData, defaultValue }) => {
  return (
    <>
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-radio-buttons-group-label"
          name="project-status"
          defaultValue={defaultValue}
        >
          {status?.map((a, i) => {
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
