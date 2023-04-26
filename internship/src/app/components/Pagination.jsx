import React from "react";
import { Grid, Pagination } from "@mui/material";

import styles from "./Pagination.module.css";

const PaginationComponent = ({ total, limit, page, handleChange }) => {
  return (
    <>
      <Grid container spacing={3} className={styles["pagination-grid"]}>
        <Grid item xs={12} sm={4} align="center">
          Total Items: {total}
        </Grid>
        <Grid item xs={12} sm={4} className={styles.pagination}>
          <Pagination
            shape="rounded"
            count={Math.ceil(total / limit)}
            page={page}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4} align="center">
          Page: {page}
        </Grid>
      </Grid>
    </>
  );
};

export default PaginationComponent;
