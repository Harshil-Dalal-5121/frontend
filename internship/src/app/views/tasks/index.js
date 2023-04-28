import Typography from "@mui/material/Typography";
import { List } from "app/components/ListComponent";
import { useTranslation } from "app/services/translate";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CardList from "./card/TaskCardList";
import TasksTable from "./table/TasksTable";
import NavBar from "app/components/NavBar";

import { useDebounce } from "../../services/custom-hooks/useDebounce";
import api from "./api";

const View = {
  table: "table",
  card: "card",
};

const ViewComponent = {
  table: TasksTable,
  card: CardList,
};

const LIMIT = 6;

export function Projects() {
  const [view, setView] = useState(View.table);
  const [tasks, setTasks] = useState("");
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

  const debouncedChangeSearch = useDebounce(handleChangeSearch);

  const handleFetch = useCallback(async ({ offset, search }) => {
    const { data } = await api.find({ offset, search });
    setTasks(data?.data);
    setTotal(data?.total);
  }, []);

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
      <legend>
        <Typography
          variant={"h3"}
          style={{ margin: "0 auto ", textAlign: "center" }}
        >
          {t("Tasks")}
        </Typography>
      </legend>

      <NavBar
        title="Tasks"
        View={View}
        loading={loading}
        setView={setView}
        path="/tasks/new"
        setPage={setPage}
        handleChange={debouncedChangeSearch}
        search={search}
      />

      <List
        ViewComponent={ViewComponent}
        view={view}
        data={tasks}
        loading={loading}
        total={total}
        page={page}
        limit={LIMIT}
        setData={setTasks}
        setPage={setPage}
      />
    </>
  );
}

export default Projects;
