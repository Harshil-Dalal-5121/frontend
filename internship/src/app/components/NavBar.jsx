import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Button, Grid, TextField } from "@mui/material";

import { Toolbar } from "./ListComponent";

import { Add, Search } from "@mui/icons-material";

import styles from "./NavBar.module.css";

const NavBar = ({
  title,
  View,
  setView,
  setPage,
  setSearch,
  handleChange,
  path,
}) => {
  const navigate = useNavigate();
  const [_search, _setSearch] = useState("");

  const handleChangeSearch = (e) => {
    _setSearch(e.target.value);
  };

  return (
    <Grid container className={styles["grid-container"]}>
      <Grid item md={4} xs={12} className={styles["grid-item-new"]}>
        <Button
          variant="contained"
          color="info"
          startIcon={<Add />}
          onClick={() => navigate(`${path}`)}
          className={styles["grid-btn m1"]}
        >
          Create {title}
        </Button>
      </Grid>
      <Grid item md={4} xs={12} className={styles["grid-item-view"]}>
        <Toolbar setView={setView} View={View} setPage={setPage} />
      </Grid>
      <Grid item md={4} xs={12} className={styles["grid-item-search"]}>
        <div className={styles["grid-container-search"]}>
          <TextField
            className={styles["m1"]}
            id="search"
            onChange={(e) => {
              handleChange(e);
              handleChangeSearch(e);
            }}
            name="search"
            label={`Search ${title}`}
            variant="outlined"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                setSearch(_search);
              }
            }}
          />

          <Search
            onClick={(e) => {
              setSearch(_search);
            }}
            variant="contained"
            className={styles["btn-search"]}
            color="success"
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default NavBar;
