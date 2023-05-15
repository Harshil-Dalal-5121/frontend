import React from "react";

import { Button } from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ViewListIcon from "@mui/icons-material/ViewList";

const Toolbar = ({ setView, View, setPage }) => {
  const [card, setCard] = React.useState(false);

  const handleViewChange = (type, bool) => {
    setPage(1);
    setView(View[type]);
    setCard(bool);
  };
  return (
    <>
      <Button
        variant={card ? "outlined" : "contained"}
        sx={{ marginRight: 2 }}
        onClick={() => handleViewChange("table", false)}
        endIcon=<ViewListIcon />
        color="secondary"
      >
        Table
      </Button>

      <Button
        variant={card ? "contained" : "outlined"}
        color="warning"
        onClick={() => handleViewChange("card", true)}
        endIcon=<DashboardIcon />
      >
        Card
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
  setTotal,
  page,
  limit,
  setPage,
  total,
  api,
}) => {
  const ListComponent = ViewComponent[view];

  return (
    <ListComponent
      data={data}
      loading={loading}
      total={total}
      setTotal={setTotal}
      page={page}
      api={api}
      setData={setData}
      limit={limit}
      setPage={setPage}
    />
  );
};

export { Toolbar, List };
