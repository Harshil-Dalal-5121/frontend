import Typography from "@mui/material/Typography";
import { List } from "app/components/ListComponent";
import { useTranslation } from "app/services/translate";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CardList from "./card/TicketCardList";
import TicketTable from "./table/TicketTable";
import NavBar from "app/components/NavBar";

import { useDebounce } from "../../services/custom-hooks/useDebounce";
import api from "./api";

const View = {
  table: "table",
  card: "card",
};

const ViewComponent = {
  table: TicketTable,
  card: CardList,
};

const LIMIT = 6;

export function Tickets() {
  const [view, setView] = useState(View.table);
  const [tickets, setTickets] = useState("");
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
    setTickets(data?.data);
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
          {t("Tickets")}
        </Typography>
      </legend>

      <NavBar
        title="Tickets"
        View={View}
        loading={loading}
        setView={setView}
        path="/tickets/new"
        setPage={setPage}
        handleChange={debouncedChangeSearch}
        search={search}
      />

      <List
        ViewComponent={ViewComponent}
        view={view}
        data={tickets}
        loading={loading}
        total={total}
        page={page}
        limit={LIMIT}
        setData={setTickets}
        setPage={setPage}
      />
    </>
  );
}

export default Tickets;
