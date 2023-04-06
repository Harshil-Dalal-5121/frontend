import React, { useEffect, useState } from "react";
import { Paper, Table, TableContainer } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";

import TableHeader from "./TableHeader";
import TableContent from "./TableContent";
import { model, rest, tableFields } from "app/services/services";

const LIMIT = 5;

const ProjectTable = () => {
  const [projects, setProjects] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    setLoading(true);
    const offset = (page - 1) * LIMIT;
    rest
      .post(`${model}/search`, { fields: tableFields, offset, limit: LIMIT })
      .then((response) => {
        setProjects(response.data.data);
        setTotal(response.data.total);
        setLoading(false);
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
          {loading ? (
            <CircularProgress />
          ) : (
            <TableContent
              data={projects}
              setData={setProjects}
              style={{ height: "50vh" }}
            />
          )}
        </Table>
      </TableContainer>
      <div>
        <p>Total Items: {total}</p>
        <p>Page: {page}</p>
        <Pagination
          count={Math.ceil(total / LIMIT)}
          page={page}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default ProjectTable;
