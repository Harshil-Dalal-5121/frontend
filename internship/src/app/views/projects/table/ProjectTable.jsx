import React, { useEffect, useState } from "react";
import { Paper, Table, TableContainer } from "@mui/material";

import TableHeader from "./TableHeader";
import TableContent from "./TableContent";
import { model, rest, tableFields } from "app/services/services";

const LIMIT = 5;

const ProjectTable = () => {
  const [projects, setProjects] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const prevPage = () => {
    setPage((prevPage) => (prevPage <= 1 ? 1 : prevPage - 1));
  };

  const nextPage = () => {
    setPage((prevPage) =>
      prevPage >= total / LIMIT ? prevPage : prevPage + 1
    );
  };

  useEffect(() => {
    const offset = (page - 1) * LIMIT;
    rest
      .post(`${model}`, { fields: tableFields, offset, limit: LIMIT })
      .then((response) => {
        setProjects(response.data.data);
        setTotal(response.data.total);
      });
  }, [page]);
  return (
    <>
      <TableContainer
        style={{ padding: "20px", height: "450px" }}
        component={Paper}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHeader />
          <TableContent data={projects} style={{ height: "50vh" }} />
        </Table>
      </TableContainer>
      <div>
        <p>Total Items: {total}</p>
        <p>Page: {page}</p>
        <button onClick={prevPage} disabled={page === 1}>
          Previous
        </button>
        <button onClick={nextPage} disabled={page >= total / LIMIT}>
          Next
        </button>
      </div>
    </>
  );
};

export default ProjectTable;
