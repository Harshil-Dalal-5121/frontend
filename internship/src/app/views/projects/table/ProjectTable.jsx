import React, { useEffect } from "react";
import { Container, Paper, Table, TableContainer } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";

import ProjectTableHeader from "./ProjectTableHeader";
import ProjectTableContent from "./ProjectTableContent";

const LIMIT = 5;

const ProjectTable = ({
  search,
  setProjects,
  projects,
  loading,
  setLoading,
  page,
  setPage,
  total,
  setTotal,
  setSearchParams,
}) => {
  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    setSearchParams({ page, limit: LIMIT });
  }, [page, setSearchParams]);

  return (
    <>
      {loading ? (
        <Container
          style={{
            height: "450px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Container>
      ) : (
        <TableContainer
          style={{ padding: "15px", height: "450px" }}
          component={Paper}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <ProjectTableHeader />
            <ProjectTableContent
              search={search}
              data={projects}
              setData={setProjects}
              style={{ height: "50vh" }}
            />
          </Table>
        </TableContainer>
      )}
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
