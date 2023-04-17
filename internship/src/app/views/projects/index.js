import { Add, Search } from "@mui/icons-material";
import { Button, TextField, Typography } from "@mui/material";
import useHandleSubmit from "app/services/custom-hooks/useHandleSubmit";
import {
  tableFields,
  handleSearch,
  fetchData,
  model,
} from "app/services/services";

import { useTranslation } from "app/services/translate";

import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

import ProjectTable from "./table/ProjectTable";

const LIMIT = 5;

export function Projects() {
  const [projects, setProjects] = useState([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page") || 1));
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const offset = (page - 1) * LIMIT;

  const Projects = useCallback(async () => {
    const reqBody = {
      data: {
        criteria: [],
        operator: "and",
        _domain: null,
        domainContext: { _model: "com.axelor.apps.project.db.Project" },
      },
      fields: tableFields,
      offset,
      limit: LIMIT,
      sortBy: ["id"],
    };
    setLoading(true);
    const response = await fetchData(` ${model}/search`, reqBody);
    setLoading(false);
    if (response) {
      setProjects(response?.data?.data);
      setTotal(response?.data?.total);
    }
  }, [offset]);

  const handleSearchSubmit = useCallback(async () => {
    if (search) {
      const reqBody = {
        data: {
          criteria: [
            {
              fieldName: "name",
              operator: "like",
              value: search,
            },
          ],
          operator: "or",
        },
        fields: tableFields,
        offset,
        limit: LIMIT,
        sortBy: ["id"],
      };
      setLoading(true);
      const data = await handleSearch(`${model}/search`, reqBody);
      setLoading(false);
      setProjects(data?.data?.data);
      setTotal(data?.data?.total);
    }
  }, [offset, search]);

  useHandleSubmit(Projects, handleSearchSubmit, search);

  return (
    <>
      <legend>
        <Typography
          variant={"h3"}
          style={{ margin: "0 auto ", textAlign: "center" }}
        >
          {t("Projects")}
        </Typography>
      </legend>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "70px",
        }}
      >
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "70px",
          }}
        >
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
          <Button
            onClick={handleSearchSubmit}
            sx={{ heigth: "10px", margin: "1em 0" }}
          >
            <Search
              variant="contained"
              style={{ margin: "1em 1em 1em 0" }}
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
