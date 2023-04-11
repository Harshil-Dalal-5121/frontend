import { Button, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Add, Search } from "@mui/icons-material";
import {
  taskTableFields,
  handleTaskSearch,
  rest,
  model,
} from "app/services/services";
import { useTranslation } from "app/services/translate";
import { useNavigate } from "react-router";
import TasksTable from "./table/TasksTable";
import { useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";

const LIMIT = 5;
const timeout = 5000;

export function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page") || 1));
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const initialized = useRef();

  const getTasks = async (reqBody) => {
    try {
      const response = await rest.post(` ${model}Task/search`, reqBody);
      if (response && response.status !== -1) {
        return response;
      }
    } catch (error) {
      return error;
    }
  };

  const handleSearchSubmit = useCallback(async () => {
    const offset = (page - 1) * LIMIT;
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

    const data = await handleTaskSearch(reqBody);

    setTasks(data?.data?.data);
    setTotal(data?.data?.total);
    setLoading(false);
  }, [page, search]);

  const Tasks = useCallback(async () => {
    const offset = (page - 1) * LIMIT;
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

    const response = await getTasks(reqBody);
    if (response) {
      setTasks(response?.data?.data);
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
      Tasks();
    } else {
      const timer = setTimeout(() => {
        handleSearchSubmit();
      }, timeout);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [Tasks, handleSearchSubmit, page, search, setLoading, setTasks, setTotal]);

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
        setLoading={setLoading}
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
