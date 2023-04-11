import { Add, Search } from "@mui/icons-material";
import { Button, TextField, Typography } from "@mui/material";
import { handleSearch } from "app/services/services";
import { useTranslation } from "app/services/translate";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

import ProjectTable from "./table/ProjectTable";

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
                handleSearch(
                  5,
                  page,
                  setProjects,
                  setTotal,
                  setLoading,
                  search
                );
              }
            }}
          />
          <Button
            onClick={() =>
              handleSearch(5, page, setProjects, setTotal, setLoading, search)
            }
          >
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
        setProjects={setProjects}
        projects={projects}
        loading={loading}
        setLoading={setLoading}
        page={page}
        setPage={setPage}
        total={total}
        setTotal={setTotal}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
    </>
  );
}

export default Projects;
