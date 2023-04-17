import {
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
} from "@mui/material";
import { taskTableFields } from "app/services/services";

import React from "react";
import styled from "@emotion/styled";

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
}));

const TaskTableHeader = () => {
  return (
    <>
      <TableHead>
        <StyledTableRow>
          <StyledTableCell align="center">Id</StyledTableCell>
          {taskTableFields?.map((field, i) => {
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
          <StyledTableCell align="center" colSpan={2}>
            Operations
          </StyledTableCell>
        </StyledTableRow>
      </TableHead>
    </>
  );
};

export default TaskTableHeader;
