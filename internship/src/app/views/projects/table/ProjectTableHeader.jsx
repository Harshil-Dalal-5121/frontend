import React from "react";
import {
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
} from "@mui/material";
import styled from "@emotion/styled";

import { tableFields } from "app/services/services";

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

const ProjectTableHeader = () => {
  return (
    <>
      <TableHead>
        <StyledTableRow>
          {tableFields?.map((field, i) => {
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

export default ProjectTableHeader;
