import { Add, Search } from "@mui/icons-material";
import { Button, TextField, Typography } from "@mui/material";
import { tableFields, handleSearch, getProjects } from "app/services/services";

import { useTranslation } from "app/services/translate";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

import ProjectTable from "./table/ProjectTable";

const LIMIT = 5;
const timeout = 5000;

export function Projects() {
  const [projects, setProjects] = useState([]);
  const [total, setTotal] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page") || 1));
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSearch(event.target.value);
  };
  const initialized = useRef();

  const handleSearchSubmit = useCallback(async () => {
    const offset = (page - 1) * LIMIT;
    const reqBody = {
      data: {
        criteria: [{ fieldName: "name", operator: "like", value: search }],
        operator: "or",
      },
      fields: tableFields,
      offset,
      limit: LIMIT,
      sortBy: ["id"],
    };

    const data = await handleSearch(reqBody);

    setProjects(data?.data?.data);
    setTotal(data?.data?.total);
    setLoading(false);
  }, [page, search]);

  const Projects = useCallback(async () => {
    const offset = (page - 1) * LIMIT;
    const reqBody = {
      fields: tableFields,
      offset,
      limit: LIMIT,
      sortBy: ["id"],
    };

    const response = await getProjects(reqBody);
    if (response) {
      setProjects(response?.data?.data);
      setTotal(response?.data?.total);
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
    }

    if (!search || search === "") {
      setLoading(true);
      Projects();
    } else {
      const timer = setTimeout(() => {
        handleSearchSubmit();
      }, timeout);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [
    Projects,
    handleSearchSubmit,
    page,
    search,
    setLoading,
    setProjects,
    setTotal,
  ]);

  return (
    <>
      <legend>
        <Typography>{t("Projects")}</Typography>
      </legend>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            navigate("/projects/new");
          }}
          style={{ textTransform: "capitalize", margin: "1em" }}
        >
          <Add /> Create new project
        </Button>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <TextField
            style={{ margin: "1em" }}
            id="search"
            onChange={handleChange}
            name="search"
            value={search}
            label="Search Project"
            variant="outlined"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearchSubmit();
              }
            }}
          />
          <Button onClick={handleSearchSubmit}>
            <Search
              style={{ margin: "1em 1em 1em 0" }}
              variant="contained"
              color="success"
            />
          </Button>
        </div>
      </div>
      <ProjectTable
        search={search}
        projects={projects}
        loading={loading}
        total={total}
        page={page}
        searchParams={searchParams}
        setProjects={setProjects}
        setPage={setPage}
        setSearchParams={setSearchParams}
      />
    </>
  );
}

export default Projects;
