import useHandleSubmit from "app/services/custom-hooks/useHandleSubmit";
import {
  tableFields,
  handleSearch,
  fetchData,
  model,
} from "app/services/services";

import { useTranslation } from "app/services/translate";

import CardList from "./card/ProjectCardList";

import React, { useCallback, useState } from "react";

import { useSearchParams } from "react-router-dom";

import ProjectTable from "./table/ProjectTable";

import { List } from "app/components/ListComponent";
import NavBar from "app/components/NavBar";
import { Typography } from "@mui/material";

const LIMIT = 6;

const View = {
  table: "table",
  card: "card",
};

const ViewComponent = {
  table: ProjectTable,
  card: CardList,
};

export function Projects() {
  const [view, setView] = useState(View.table);

  const [projects, setProjects] = useState([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page") || 1));
  const limit = +searchParams.get("limit") || LIMIT;

  const { t } = useTranslation();

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const offset = (page - 1) * limit;

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
      limit: limit,
      sortBy: ["id"],
    };
    setLoading(true);
    const response = await fetchData(` ${model}/search`, reqBody);
    setLoading(false);
    if (response && response.data.status !== -1) {
      setProjects(response?.data?.data);
      setTotal(response?.data?.total);
    }
  }, [limit, offset]);

  React.useEffect(() => {
    setSearchParams({ page, limit: limit });
  }, [page, limit, setSearchParams]);

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
        limit: limit,
        sortBy: ["id"],
      };
      setLoading(true);
      const data = await handleSearch(`${model}/search`, reqBody);

      setLoading(false);
      if (data && data.data.status !== -1) {
        setProjects(data?.data?.data);
        setTotal(data?.data?.total);
      }
    }
  }, [search, offset, limit]);

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

      <NavBar
        title="Project"
        View={View}
        loading={loading}
        setView={setView}
        path="/projects/new"
        setPage={setPage}
        handleChange={handleChange}
        search={search}
        handleSearchSubmit={handleSearchSubmit}
      />

      <List
        ViewComponent={ViewComponent}
        view={view}
        search={search}
        data={projects}
        loading={loading}
        total={total}
        page={page}
        limit={limit}
        searchParams={searchParams}
        setData={setProjects}
        setPage={setPage}
        setSearchParams={setSearchParams}
      />
    </>
  );
}

export default Projects;
