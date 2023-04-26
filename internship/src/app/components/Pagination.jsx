import React from "react";
import { Grid, Pagination } from "@mui/material";

import styles from "./Pagination.module.css";

const PaginationComponent = ({ total, limit, page, handleChange }) => {
  return (
    <>
      <div>
        <Grid container className={styles["pagination-grid"]}>
          <Grid item xs={12} sm={4} align="center">
            Total Items: {total}
          </Grid>
          <Grid item xs={12} sm={4} className={styles.pagination}>
            <Pagination
              variant="outlined"
              color="info"
              count={Math.ceil(total / limit)}
              page={page}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4} align="center">
            Page: {page}
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default PaginationComponent;
