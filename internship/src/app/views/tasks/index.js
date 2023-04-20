import Typography from "@mui/material/Typography";

import {
  taskTableFields,
  fetchData,
  model,
  handleSearch,
} from "app/services/services";
import { useTranslation } from "app/services/translate";

import TasksTable from "./table/TasksTable";
import { useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import useHandleSubmit from "app/services/custom-hooks/useHandleSubmit";
import { List } from "app/components/ListComponent";

import CardList from "./card/CardList";

import NavBar from "app/components/NavBar";

const LIMIT = 6;

const View = {
  table: "table",
  card: "card",
};

const ViewComponent = {
  table: TasksTable,
  card: CardList,
};

export function Tasks() {
  const [view, setView] = useState(View.table); // grid | card
  const [tasks, setTasks] = useState([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page") || 1));

  const limit = +searchParams.get("limit") || LIMIT;
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const offset = (page - 1) * limit;

  const Tasks = useCallback(async () => {
    const reqBody = {
      data: {
        criteria: [],
        _domain: "self.typeSelect = :_typeSelect",
        _domainContext: {
          _typeSelect: "task",
          _model: "com.axelor.apps.Task.db.ProjectTask",
          operator: "and",
        },
      },
      fields: taskTableFields,
      offset,

      limit: limit,
      sortBy: ["id"],
      model: "com.axelor.apps.project.db.ProjectTask",
      _typeSelect: "task",
    };

    setLoading(true);
    const response = await fetchData(` ${model}Task/search`, reqBody);
    setLoading(false);
    if (response) {
      setTasks(response?.data?.data);
      setTotal(response?.data?.total);
    }
  }, [offset, limit]);

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
        fields: taskTableFields,
        offset,
        limit: limit,
        sortBy: ["id"],
      };
      setLoading(true);
      const data = await handleSearch(`${model}Task/search`, reqBody);
      setLoading(false);
      setTasks(data?.data?.data);
      setTotal(data?.data?.total);
    }
  }, [offset, limit, search]);

  useHandleSubmit(Tasks, handleSearchSubmit, search);

  useEffect(() => {
    setSearchParams({ page, limit: limit });
  }, [page, limit, setSearchParams]);

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
        View={View}
        setView={setView}
        setPage={setPage}
        handleChange={handleChange}
        search={search}
        handleSearchSubmit={handleSearchSubmit}
      />
      <List
        ViewComponent={ViewComponent}
        view={view}
        search={search}
        data={tasks}
        loading={loading}
        total={total}
        page={page}
        limit={limit}
        searchParams={searchParams}
        setData={setTasks}
        setPage={setPage}
        setSearchParams={setSearchParams}
      />
    </>
  );
}

export default Tasks;
