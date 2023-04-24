import React from "react";
import { TableCell, TableHead, TableRow } from "@mui/material";

import { tableFields } from "app/services/services";

const ProjectTableHeader = () => {
  return (
    <>
      <TableHead>
        <TableRow>
          {tableFields?.map((field, i) => {
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
          <TableCell align="center" colSpan={2}>
            Operations
          </TableCell>
        </TableRow>
      </TableHead>
    </>
  );
};

export default ProjectTableHeader;
