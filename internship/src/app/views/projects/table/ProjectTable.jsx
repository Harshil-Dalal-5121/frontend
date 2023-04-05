import React from "react";
import { Paper, Table, TableContainer } from "@mui/material";

import TableHeader from "./TableHeader";
import TableContent from "./TableContent";

const ProjectTable = () => {
  return (
    <>
      <TableContainer style={{ padding: "20px" }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHeader />
          <TableContent />
        </Table>
      </TableContainer>
    </>
  );
};

export default ProjectTable;
