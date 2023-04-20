import { Pagination } from "@mui/material";
import React from "react";

const PaginationComponent = ({ total, limit, page, handleChange }) => {
  return (
    <Pagination
      shape="rounded"
      count={Math.ceil(total / limit)}
      page={page}
      onChange={handleChange}
    />
  );
};

export default PaginationComponent;
