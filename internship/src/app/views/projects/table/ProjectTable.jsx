import React, { useEffect } from "react";
import {
  Container,
  Paper,
  Table,
  TableContainer,
  CircularProgress,
} from "@mui/material";

import ProjectTableHeader from "./ProjectTableHeader";
import ProjectTableContent from "./ProjectTableContent";
import PaginationComponent from "app/components/Pagination";

const ProjectTable = ({
  setData,
  data,
  loading,
  limit,
  page,
  setPage,
  setSearchParams,
  total,
}) => {
  const handleChange = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    setSearchParams({ page, limit: limit });
  }, [page, limit, setSearchParams]);

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
              data={data}
              setData={setData}
              style={{ height: "52vh" }}
            />
          </Table>
        </TableContainer>
      )}
      <p>Total Items: {total}</p>
      <p>Page: {page}</p>
      <PaginationComponent
        total={total}
        limit={limit}
        page={page}
        handleChange={handleChange}
      />
    </>
  );
};

export default ProjectTable;
