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

import DashboardIcon from "@mui/icons-material/Dashboard";
import ViewListIcon from "@mui/icons-material/ViewList";

import CardList from "./card/CardList";
import { Grid } from "@mui/material";

const LIMIT = 6;

const View = {
  table: "table",
  card: "card",
};

const ViewComponent = {
  table: TasksTable,
  card: CardList,
};

function Toolbar({ setView }) {
  return (
    <>
      <Button
        variant="outlined"
        style={{ marginRight: "10px" }}
        onClick={() => setView(View.table)}
      >
        Table
        <ViewListIcon />
      </Button>

      <Button variant="outlined" onClick={() => setView(View.card)}>
        Card
        <DashboardIcon />
      </Button>
    </>
  );
}

function List({
  view,
  setTasks,
  tasks,
  loading,
  page,
  setPage,
  total,
  setSearchParams,
}) {
  const ListComponent = ViewComponent[view];

  return (
    <ListComponent
      tasks={tasks}
      loading={loading}
      total={total}
      page={page}
      setTasks={setTasks}
      setPage={setPage}
      setSearchParams={setSearchParams}
    />
  );
}

export function Tasks() {
  const [view, setView] = useState(View.table); // grid | card
  const [tasks, setTasks] = useState([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page") || 1));
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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

    setLoading(true);
    const response = await fetchData(` ${model}Task/search`, reqBody);
    setLoading(false);
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
      setLoading(true);
      const data = await handleSearch(`${model}Task/search`, reqBody);
      setLoading(false);
      setTasks(data?.data?.data);
      setTotal(data?.data?.total);
    }
  }, [offset, search]);

  useHandleSubmit(Tasks, handleSearchSubmit, search);

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

      {/* <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "70px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "70px",
            minWidth: "20vw",
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
            <Add /> Create new Task
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Toolbar setView={setView} />
        </div>
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
            label="Search Task"
            variant="outlined"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearchSubmit();
              }
            }}
          />
          <Button
            sx={{ heigth: "10px", margin: "1em 0" }}
            onClick={handleSearchSubmit}
          >
            <Search
              style={{ margin: "1em 1em 1em 0" }}
              variant="contained"
              color="success"
            />
          </Button>
        </div>
      </div> */}

      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          sm={4}
          style={{
            display: "flex",

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
            <Add /> Create new Task
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "70px",
          }}
        >
          <Toolbar setView={setView} />
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          style={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            height: "70px",
          }}
        >
          {" "}
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

            <Search
              onClick={handleSearchSubmit}
              variant="contained"
              style={{ margin: "1em 1em 1em 0" }}
              color="success"
            />
          </div>
        </Grid>
      </Grid>
      <List
        view={view}
        search={search}
        tasks={tasks}
        loading={loading}
        total={total}
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
