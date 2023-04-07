import { TableCell, TableHead, TableRow } from "@mui/material";
import { taskTableFields } from "app/services/services";
import { Tab } from "bootstrap";
import React from "react";

const TableHeader = () => {
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
          <TableCell align="center" colSpan={2}>
            Operations
          </TableCell>
        </TableRow>
      </TableHead>
    </>
  );
};

export default TableHeader;
