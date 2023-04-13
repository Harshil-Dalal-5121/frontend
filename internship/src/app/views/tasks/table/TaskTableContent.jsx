import React, { useState } from "react";
import { TableBody, TableCell, TableRow, TextField } from "@mui/material";

const cellWidth_5 = {
  width: "5vw",
};

const cellWidth_10 = {
  width: "10vw",
};

const TaskTableContent = ({ data, setData }) => {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setTimeout(() => setSearch(e.target.value), 1000);
  };
  return (
    <>
      <TableBody>
        <TableRow>
          <TableCell colSpan={12}>
            <TextField
              fullWidth
              style={{ height: "30px" }}
              id="search"
              onChange={(e) => handleSearch(e)}
              name="search"
              label="Search Task"
              variant="standard"
              InputProps={{
                disableUnderline: true,
              }}
            />
          </TableCell>
        </TableRow>
        {data
          ?.filter((task) =>
            !search ? task : task?.name?.toLowerCase()?.includes(search)
          )
          .map((task, i) => (
            <TableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              style={{ height: "70px" }}
            >
              <TableCell align="center" style={cellWidth_5}>
                {task?.id}
              </TableCell>
              <TableCell align="center" style={cellWidth_5}>
                {task?.ticketNumber}
              </TableCell>
              <TableCell align="center" style={cellWidth_10}>
                {task?.name || "-"}
              </TableCell>
              <TableCell align="center" style={cellWidth_10}>
                {task?.project?.fullName || "-"}
              </TableCell>
              <TableCell align="center" style={cellWidth_10}>
                {task.taskDate?.slice(0, 10) || "-"}
              </TableCell>
              <TableCell align="center" style={cellWidth_10}>
                {task?.status?.name || "-"}
              </TableCell>
              <TableCell align="center" style={cellWidth_10}>
                {task?.priority?.name || "-"}
              </TableCell>
              <TableCell align="center" style={cellWidth_10}>
                {task?.projectTaskCategory || "-"}
              </TableCell>
              <TableCell align="center" style={cellWidth_10}>
                {task?.targetVersion || "-"}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </>
  );
};

export default TaskTableContent;
