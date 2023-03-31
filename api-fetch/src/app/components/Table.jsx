import React from "react";
import TableBody from "./TableBody";
import TableHead from "./TableHead";

const Table = () => {
  return (
    <>
      <div className="container">
        <table className="table table-striped table-hover table-bordered table-responsive bg-opacity-10 border border-dark rounded-end">
          <caption>List of users</caption>
          <TableHead />
          <TableBody />
        </table>
      </div>
    </>
  );
};

export default Table;
