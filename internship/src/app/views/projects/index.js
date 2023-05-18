import Typography from "@mui/material/Typography";
import { List } from "app/components/ListComponent";
import { useTranslation } from "app/services/translate";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import NavBar from "app/components/NavBar";

import { useDebounce } from "../../services/custom-hooks/useDebounce";
import api from "./api";
import { projectCard } from "./../../utils/card";
import CardList from "app/components/Card";
import { Grid } from "@mui/material";
import DataTable from "app/components/DataTable";
import { LIMIT, TASK_TABLE_FIELDS } from "app/utils/constants";
import { ProjectTableContent } from "app/utils/table";

const View = {
  table: "table",
  card: "card",
};

const ProjectCard = (props) => {
  return <CardList card={projectCard} {...props} />;
};

const ProjectTable = (props) => {
  return (
    <DataTable
      fields={TASK_TABLE_FIELDS}
      tableContent={ProjectTableContent}
      {...props}
    />
  );
};

const ViewComponent = {
  table: ProjectTable,
  card: ProjectCard,
};

export function Projects() {
  const [view, setView] = useState(View.table);
  const [projects, setProjects] = useState("");
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page") || 1));
  const { t } = useTranslation();

  const handleChangeSearch = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handleFetch = useCallback(async ({ offset, search }) => {
    const response = await api.find({ offset, search });
    setProjects(response?.data);
    setTotal(response?.total);
  }, []);
  const debouncedChangeSearch = useDebounce(handleChangeSearch);

  useEffect(() => {
    setLoading(true);
    handleFetch({
      search,
      offset: (page - 1) * LIMIT,
    }).finally(() => {
      setLoading(false);
    });
  }, [page, search, handleFetch]);

  useEffect(() => {
    setSearchParams({ page });
  }, [page, setSearchParams, total]);

  return (
    <>
      <Grid>
        <Grid item xs={12}>
          <legend>
            <Typography
              variant={"h3"}
              style={{ margin: "0 auto ", textAlign: "center" }}
            >
              {t("Projects")}
            </Typography>
          </legend>
        </Grid>
        <Grid item xs={12}>
          <NavBar
            title="Project"
            View={View}
            path="/projects/new"
            setView={setView}
            setPage={setPage}
            setSearch={setSearch}
            handleChange={debouncedChangeSearch}
          />
        </Grid>
        <Grid item xs={12}>
          <List
            ViewComponent={ViewComponent}
            view={view}
            data={projects}
            loading={loading}
            total={total}
            setTotal={setTotal}
            api={api}
            page={page}
            limit={LIMIT}
            setData={setProjects}
            setPage={setPage}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default Projects;
