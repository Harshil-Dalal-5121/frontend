import React from "react";
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

import styles from "./ProjectTable.module.css";

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

  return (
    <>
      {loading ? (
        <Container className={styles["loading-container"]}>
          <CircularProgress />
        </Container>
      ) : (
        <TableContainer className={styles["table-container"]} component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="customized table">
            <ProjectTableHeader />
            <ProjectTableContent
              data={data}
              setData={setData}
              className={styles["tbody"]}
            />
          </Table>
        </TableContainer>
      )}

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
