import Typography from "@mui/material/Typography";

import useHandleSubmit from "app/services/custom-hooks/useHandleSubmit";
import CardList from "./card/CardList";
import {
  fetchData,
  handleSearch,
  model,
  ticketTableFields,
} from "app/services/services";

import { useTranslation } from "app/services/translate";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { List } from "app/components/ListComponent";
import NavBar from "app/components/NavBar";

import TicketTable from "./table/TicketTable";

const LIMIT = 6;

const View = {
  table: "table",
  card: "card",
};

const ViewComponent = {
  table: TicketTable,
  card: CardList,
};

export function Tickets() {
  const [view, setView] = useState(View.table); // grid | card

  const [tickets, setTickets] = useState([]);
  const [total, setTotal] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page") || 1));
  const [loading, setLoading] = useState(false);
  const limit = +searchParams.get("limit") || LIMIT;
  const [search, setSearch] = useState("");

  const { t } = useTranslation();

  const offset = (page - 1) * limit;

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
      limit: limit,
    };

    setLoading(true);
    const data = await fetchData(` ${model}Task/search`, req);
    setLoading(false);
    if (data) {
      setTickets(data?.data?.data);
      setTotal(data?.data?.total);
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
        limit: limit,
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
  }, [offset, limit, search]);

  useHandleSubmit(Tickets, handleSearchSubmit, search);

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
          {t("Tickets")}
        </Typography>
      </legend>

      <NavBar
        title="Ticket"
        View={View}
        setView={setView}
        setPage={setPage}
        path="/tickets/new"
        handleChange={handleChange}
        search={search}
        handleSearchSubmit={handleSearchSubmit}
      />
      <List
        ViewComponent={ViewComponent}
        view={view}
        search={search}
        data={tickets}
        loading={loading}
        total={total}
        page={page}
        limit={limit}
        searchParams={searchParams}
        setData={setTickets}
        setPage={setPage}
        setSearchParams={setSearchParams}
      />
    </>
  );
}

export default Tickets;
