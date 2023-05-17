import Typography from "@mui/material/Typography";
import { List } from "app/components/ListComponent";
import { useTranslation } from "app/services/translate";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import TasksTable from "./table/TasksTable";
import NavBar from "app/components/NavBar";

import { useDebounce } from "../../services/custom-hooks/useDebounce";
import api from "./api";
import { taskCard } from "app/utils/card";
import CardList from "app/components/Card";

const View = {
  table: "table",
  card: "card",
};
const TaskCard = (props) => {
  return <CardList card={taskCard} {...props} />;
};

const ViewComponent = {
  table: TasksTable,
  card: TaskCard,
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
    const response = await api.find({ offset, search });
    setTasks(response?.data);
    setTotal(response?.total);
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
        title="Task"
        path="/tasks/new"
        View={View}
        setView={setView}
        setPage={setPage}
        setSearch={setSearch}
        handleChange={debouncedChangeSearch}
      />

      <List
        ViewComponent={ViewComponent}
        view={view}
        data={tasks}
        loading={loading}
        total={total}
        page={page}
        limit={LIMIT}
        api={api}
        setTotal={setTotal}
        setData={setTasks}
        setPage={setPage}
      />
    </>
  );
}

export default Projects;
