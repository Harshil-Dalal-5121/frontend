import React from "react";
import { TableCell, TableHead, TableRow } from "@mui/material";

import { tableFields } from "app/services/services";

const TableHeader = () => {
  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell>Serial No.</TableCell>
          {tableFields?.map((field, i) => {
            return (
              <TableCell key={i} align="center">
                {field.toLocaleUpperCase()}
              </TableCell>
            );
          })}
          <TableCell align="center" colSpan={2}>
            OPERATIONS
          </TableCell>
        </TableRow>
      </TableHead>
    </>
  );
};

export default TableHeader;
