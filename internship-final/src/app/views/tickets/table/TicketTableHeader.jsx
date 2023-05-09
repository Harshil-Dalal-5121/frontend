import React from "react";
import {
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
} from "@mui/material";

import styled from "@emotion/styled";

import { TICKET_TABLE_FIELDS } from "app/utils/constants";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  height: "7.5vh",
}));

const TicketTableHeader = () => {
  return (
    <>
      <TableHead>
        <StyledTableRow>
          <StyledTableCell align="center">Id</StyledTableCell>
          {TICKET_TABLE_FIELDS?.map((field, i) => {
            return (
              <StyledTableCell
                key={i}
                align="center"
                style={{ textTransform: "capitalize" }}
              >
                {field}
              </StyledTableCell>
            );
          })}
          <StyledTableCell colSpan={2} align="center">
            Operations
          </StyledTableCell>
        </StyledTableRow>
      </TableHead>
    </>
  );
};

export default TicketTableHeader;
