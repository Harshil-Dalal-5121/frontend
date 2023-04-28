import React from "react";
import { useNavigate } from "react-router";
import { Button, Grid, TextField } from "@mui/material";

import { Toolbar } from "./ListComponent";

import { Add, Search } from "@mui/icons-material";

import styles from "./NavBar.module.css";

const NavBar = ({
  title,
  View,
  loading,
  setView,
  setPage,
  handleChange,
  path,
}) => {
  const navigate = useNavigate();
  return (
    <Grid container className={styles["grid-container"]}>
      <Grid item xs={4} sm={4} className={styles["grid-item-new"]}>
        <Button
          variant="contained"
          color="info"
          onClick={() => {
            navigate(`${path}`);
          }}
          className={styles["grid-btn m1"]}
        >
          <Add /> Create {title}
        </Button>
      </Grid>
      <Grid item xs={4} sm={4} className={styles["grid-item-view"]}>
        <Toolbar setView={setView} View={View} setPage={setPage} />
      </Grid>
      <Grid item xs={4} sm={4} className={styles["grid-item-search"]}>
        <div className={styles["grid-container-search"]}>
          <TextField
            className={styles["m1"]}
            id="search"
            onChange={handleChange}
            name="search"
            label={`Search ${title}`}
            variant="outlined"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                if (loading) {
                  handleChange();
                }
              }
            }}
          />

          <Search
            onClick={() => handleChange()}
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
