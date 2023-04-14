import { Button, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Add, Search } from "@mui/icons-material";
import {
  taskTableFields,
  fetchData,
  model,
  handleSearch,
} from "app/services/services";
import { useTranslation } from "app/services/translate";
import { useNavigate } from "react-router";
import TasksTable from "./table/TasksTable";
import { useSearchParams } from "react-router-dom";
import { useCallback, useState } from "react";
import useHandleSubmit from "app/services/custom-hooks/useHandleSubmit";

const LIMIT = 5;

export function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page") || 1));
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const offset = (page - 1) * LIMIT;

  const Tasks = useCallback(async () => {
    const reqBody = {
      data: {
        criteria: [],
        _domain: "self.typeSelect = :_typeSelect",
        _domainContext: {
          _typeSelect: "task",
          _model: "com.axelor.apps.project.db.ProjectTask",
          operator: "and",
        },
      },
      fields: taskTableFields,
      offset,

      limit: LIMIT,
      sortBy: ["id"],
      model: "com.axelor.apps.project.db.ProjectTask",
      _typeSelect: "task",
    };

    const response = await fetchData(` ${model}Task/search`, reqBody);
    if (response) {
      setTasks(response?.data?.data);
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
        fields: taskTableFields,
        offset,
        limit: LIMIT,
        sortBy: ["id"],
      };

      const data = await handleSearch(`${model}Task/search`, reqBody);

      setTasks(data?.data?.data);
      setTotal(data?.data?.total);
    }
  }, [offset, search]);

  const { loading } = useHandleSubmit(Tasks, handleSearchSubmit, search);

  return (
    <>
      <legend>
        <Typography>{t("Tasks")}</Typography>
      </legend>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            navigate("/tasks/new");
          }}
          style={{ textTransform: "capitalize", margin: "1em" }}
        >
          <Add /> Create new task
        </Button>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <TextField
            style={{ margin: "1em" }}
            id="search"
            onChange={handleChange}
            name="search"
            value={search}
            label="Search Task"
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
      <TasksTable
        search={search}
        tasks={tasks}
        loading={loading}
        setSearch={setSearch}
        total={total}
        setTotal={setTotal}
        page={page}
        searchParams={searchParams}
        setTasks={setTasks}
        setPage={setPage}
        setSearchParams={setSearchParams}
      />
    </>
  );
}

export default Tasks;
