import { Add, Search } from "@mui/icons-material";
import { Button, Grid, TextField } from "@mui/material";
import React from "react";

import { useNavigate } from "react-router";
import { Toolbar } from "./ListComponent";

const NavBar = ({
  title,
  View,
  path,
  loading,
  setView,
  setPage,
  handleChange,
  search,
  handleSearchSubmit,
}) => {
  const navigate = useNavigate();
  return (
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
          color="info"
          onClick={() => {
            navigate(`${path}`);
          }}
          style={{ textTransform: "capitalize", margin: "1em" }}
        >
          <Add /> Create {title}
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
        <Toolbar setView={setView} View={View} setPage={setPage} />
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
            label={`Search ${title}`}
            variant="outlined"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                if (loading) {
                  handleSearchSubmit();
                }
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
  );
};

export default NavBar;
