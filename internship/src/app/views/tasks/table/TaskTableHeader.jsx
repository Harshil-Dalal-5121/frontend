import { TableCell, TableHead, TableRow } from "@mui/material";
import { taskTableFields } from "app/services/services";

import React from "react";

const TaskTableHeader = () => {
  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell align="center">Id</TableCell>
          {taskTableFields?.map((field, i) => {
            return (
              <TableCell
                key={i}
                align="center"
                style={{ textTransform: "capitalize" }}
              >
                {field}
              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>
    </>
  );
};

export default TaskTableHeader;
