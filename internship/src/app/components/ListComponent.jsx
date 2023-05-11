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
