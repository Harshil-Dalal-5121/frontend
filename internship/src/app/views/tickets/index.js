import { Add, Search } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ViewListIcon from "@mui/icons-material/ViewList";
import useHandleSubmit from "app/services/custom-hooks/useHandleSubmit";
import CardList from "./card/CardList";
import {
  fetchData,
  handleSearch,
  model,
  ticketTableFields,
} from "app/services/services";

import { useTranslation } from "app/services/translate";
import { useCallback, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import TicketTable from "./table/TicketTable";
import { Grid } from "@mui/material";

const LIMIT = 6;

const View = {
  table: "table",
  card: "card",
};

const ViewComponent = {
  table: TicketTable,
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
  setTickets,
  tickets,
  loading,
  page,
  setPage,
  total,
  setSearchParams,
}) {
  const ListComponent = ViewComponent[view];

  return (
    <ListComponent
      tickets={tickets}
      loading={loading}
      total={total}
      page={page}
      setTickets={setTickets}
      setPage={setPage}
      setSearchParams={setSearchParams}
    />
  );
}

export function Tickets() {
  const [view, setView] = useState(View.table); // grid | card

  const [tickets, setTickets] = useState([]);
  const [total, setTotal] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page") || 1));
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const offset = (page - 1) * LIMIT;

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const Tickets = useCallback(async () => {
    const req = {
      data: {
        _domain:
          "self.project.projectStatus.isCompleted = false AND self.typeSelect = :_typeSelect AND (self.project.id IN :_projectIds OR :_project is null) AND :__user__ MEMBER OF self.project.membersUserSet",
        _domainContext: {
          _project: null,
          _projectIds: [0],
          _typeSelect: "ticket",
          _model: "com.axelor.apps.project.db.ProjectTask",
        },
      },
      fields: ticketTableFields,
      offset,
      limit: LIMIT,
    };

    setLoading(true);
    const data = await fetchData(` ${model}Task/search`, req);
    setLoading(false);
    if (data) {
      setTickets(data?.data?.data);
      setTotal(data?.data?.total);
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
          _domain:
            "self.project.projectStatus.isCompleted = false AND self.typeSelect = :_typeSelect AND (self.project.id IN :_projectIds OR :_project is null) AND :__user__ MEMBER OF self.project.membersUserSet",
          _domainContext: {
            _project: null,
            _projectIds: [0],
            _typeSelect: "ticket",
            _model: "com.axelor.apps.project.db.ProjectTask",
          },
          _searchText: search,
          _domains: [],
        },
        fields: ticketTableFields,
        limit: LIMIT,
        offset: offset,
        sortBy: ["id"],
      };
      setLoading(true);
      const data = await handleSearch(`${model}Task/search`, reqBody);
      setLoading(false);
      if (data.data.status === 0) {
        setTickets(data?.data?.data);
      }
      setTotal(data?.data?.total);
    }
  }, [offset, search]);

  useHandleSubmit(Tickets, handleSearchSubmit, search);

  return (
    <>
      <legend>
        <Typography
          variant={"h3"}
          style={{ margin: "0 auto ", textAlign: "center" }}
        >
          {t("Tickets")}
        </Typography>
      </legend>

      <Grid
        container
        spacing={3}
        style={{
          height: "100px",
        }}
      >
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
              navigate("/tickets/new");
            }}
            style={{ textTransform: "capitalize", margin: "1em" }}
          >
            <Add /> Create Ticket
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
              label="Search Ticket"
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
      {/* <TicketTable
        search={search}
        tickets={tickets}
        loading={loading}
        setSearch={setSearch}
        total={total}
        setTotal={setTotal}
        page={page}
        searchParams={searchParams}
        setTickets={setTickets}
        setPage={setPage}
        setSearchParams={setSearchParams}
      /> */}
      <List
        view={view}
        search={search}
        tickets={tickets}
        loading={loading}
        total={total}
        page={page}
        searchParams={searchParams}
        setTickets={setTickets}
        setPage={setPage}
        setSearchParams={setSearchParams}
      />
    </>
  );
}

export default Tickets;
