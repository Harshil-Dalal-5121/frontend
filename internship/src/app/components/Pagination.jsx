import React from "react";
import { Grid, Pagination } from "@mui/material";

import styles from "./Pagination.module.css";
import { Stack } from "@mui/system";

const PaginationComponent = ({ total, limit, page, handleChange }) => {
  return (
    <>
      <div>
        <Grid container className={styles["pagination-grid"]}>
          <Grid item xs={12} sm={4} align="center">
            Total Items: {total}
          </Grid>
          <Grid item xs={12} sm={4} className={styles.pagination}>
            <Stack spacing={2}>
              <Pagination
                variant="outlined"
                color="info"
                count={Math.ceil(total / limit)}
                page={page}
                onChange={handleChange}
              />
            </Stack>
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
