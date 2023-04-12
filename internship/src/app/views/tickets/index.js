import { Add } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import {
  getTickets,
  handleTicketSearch,
  ticketTableFields,
} from "app/services/services";

import { useTranslation } from "app/services/translate";
import { useCallback, useEffect, useState } from "react";
import { Search } from "react-bootstrap-icons";
import { useNavigate, useSearchParams } from "react-router-dom";

import TicketTable from "./table/TicketTable";

const LIMIT = 5;

export function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [total, setTotal] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page") || 1));
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const offset = (page - 1) * LIMIT;

  const handleChange = (event, value) => {
    setPage(value);
  };
  const { t } = useTranslation();

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

    const data = await getTickets(req);
    if (data) {
      setTickets(data?.data?.data);
      setTotal(data?.data?.total);
      setLoading(false);
    }
  }, [offset]);

  const handleSearchSubmit = useCallback(async () => {
    const reqBody = {
      data: {
        criteria: {
          fieldName: "name",
          operator: "like",
          value: search,
        },
      },
      operator: "or",
      _domain:
        "self.project.projectStatus.isCompleted = false AND self.typeSelect = :_typeSelect AND (self.project.id IN :_projectIds OR :_project is null) AND :__user__ MEMBER OF self.project.membersUserSet",
      _domainContext: {
        _project: null,
        _projectIds: [0],
        _typeSelect: "ticket",
        _model: "com.axelor.apps.project.db.ProjectTask",
      },
      fields: ticketTableFields,
      offset,
      limit: LIMIT,
      sortBy: ["id"],
    };
    const data = await handleTicketSearch(reqBody);

    setTickets(data?.data?.data);
    setTotal(data?.data?.total);
    setLoading(false);
  }, [offset, search]);

  useEffect(() => {
    Tickets();
  }, [Tickets, page]);

  return (
    <>
      <legend>
        <Typography>{t("Tickets")}</Typography>
      </legend>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            navigate("/tickets/new");
          }}
          style={{ textTransform: "capitalize", margin: "1em" }}
        >
          <Add /> Create new ticket
        </Button>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
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
          <Button onClick={handleSearchSubmit}>
            <Search
              style={{ margin: "1em 1em 1em 0" }}
              variant="contained"
              color="success"
            />
          </Button>
        </div>
      </div>
      <TicketTable
        search={search}
        tickets={tickets}
        loading={loading}
        setLoading={setLoading}
        setSearch={setSearch}
        total={total}
        setTotal={setTotal}
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
