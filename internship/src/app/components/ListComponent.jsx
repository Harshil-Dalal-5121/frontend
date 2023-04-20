import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ViewListIcon from "@mui/icons-material/ViewList";
import { Button } from "@mui/material";

const Toolbar = ({ setView, View, setPage }) => {
  return (
    <>
      <Button
        variant="outlined"
        style={{ marginRight: "10px" }}
        onClick={() => {
          setPage(1);
          setView(View.table);
        }}
      >
        Table
        <ViewListIcon />
      </Button>

      <Button
        variant="outlined"
        onClick={() => {
          setPage(1);
          setView(View.card);
        }}
      >
        Card
        <DashboardIcon />
      </Button>
    </>
  );
};

const List = ({
  ViewComponent,
  view,
  setData,
  data,
  loading,
  page,
  limit,
  setPage,
  total,
  setSearchParams,
}) => {
  const ListComponent = ViewComponent[view];

  return (
    <ListComponent
      data={data}
      loading={loading}
      total={total}
      page={page}
      setData={setData}
      limit={limit}
      setPage={setPage}
      setSearchParams={setSearchParams}
    />
  );
};

export { Toolbar, List };
