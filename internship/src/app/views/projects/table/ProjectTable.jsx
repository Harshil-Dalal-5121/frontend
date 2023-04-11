import React, { useCallback, useEffect, useState } from "react";
import { Container, Paper, Table, TableContainer } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";
import { Button, TextField, Typography } from "@mui/material";

import { model, rest, tableFields } from "app/services/services";
import { useSearchParams } from "react-router-dom";
import ProjectTableHeader from "./ProjectTableHeader";
import ProjectTableContent from "./ProjectTableContent";

const LIMIT = 5;
const timeout = 500;

const ProjectTable = ({ search }) => {
  const [projects, setProjects] = useState([]);
  const [total, setTotal] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page") || 1));
  const [loading, setLoading] = useState(false);
  const initialized = React.useRef();

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleSearch = useCallback(() => {
    console.log("handleSearch");
    const offset = (page - 1) * LIMIT;
    rest
      .post(`${model}/search`, {
        data: {
          criteria: [{ fieldName: "name", operator: "like", value: search }],
          operator: "or",
        },
        fields: tableFields,
        offset,
        limit: LIMIT,
      })
      .then((response) => {
        setProjects(response.data.data);
        setTotal(response.data.total);
        setLoading(false);
      });
  }, [page, search]);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
    }

    setLoading(true);
    const offset = (page - 1) * LIMIT;
    /**
     * Make API request
     */
    rest
      .post(`${model}/search`, {
        fields: tableFields,
        offset,
        limit: LIMIT,
        sortBy: ["id"],
      })
      .then((response) => {
        setProjects(response.data.data);
        setTotal(response.data.total);
        setLoading(false);
      });

    //search
    const timer = setTimeout(() => {
      handleSearch();
    }, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [handleSearch, page, search]);

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
