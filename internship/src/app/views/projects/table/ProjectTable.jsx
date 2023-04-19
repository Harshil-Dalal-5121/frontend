import React, { useEffect } from "react";
import {
  Container,
  Paper,
  Table,
  TableContainer,
  Pagination,
  CircularProgress,
} from "@mui/material";

import ProjectTableHeader from "./ProjectTableHeader";
import ProjectTableContent from "./ProjectTableContent";

const LIMIT = 6;

const ProjectTable = ({
  setProjects,
  projects,
  loading,
  page,
  setPage,
  total,
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
            height: "52vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Container>
      ) : (
        <TableContainer
          style={{ padding: "0 15px", height: "52vh" }}
          component={Paper}
        >
          <Table sx={{ minWidth: 650 }} aria-label="customized table">
            <ProjectTableHeader />
            <ProjectTableContent
              data={projects}
              setData={setProjects}
              style={{ height: "52vh" }}
            />
          </Table>
        </TableContainer>
      )}
      <p>Total Items: {total}</p>
      <p>Page: {page}</p>
      <Pagination
        shape="rounded"
        count={Math.ceil(total / LIMIT)}
        page={page}
        onChange={handleChange}
      />
    </>
  );
};

export default ProjectTable;
