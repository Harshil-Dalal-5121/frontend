import { TableCell, TableHead, TableRow } from "@mui/material";
import { ticketTableFields } from "app/services/services";

import React from "react";

const TicketTableHeader = () => {
  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell align="center">Id</TableCell>
          {ticketTableFields?.map((field, i) => {
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
          <TableCell colSpan={2} align="center">
            Operations
          </TableCell>
        </TableRow>
      </TableHead>
    </>
  );
};

export default TicketTableHeader;
