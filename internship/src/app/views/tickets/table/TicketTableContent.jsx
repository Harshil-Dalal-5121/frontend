import React, { useState } from "react";
import {
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";

const cellWidth_5 = {
  width: "5vw",
};

const cellWidth_10 = {
  width: "10vw",
};

const TicketTableContent = ({ data, setData }) => {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setTimeout(() => setSearch(e.target.value), 1000);
  };
  return (
    <>
      {data ? (
        <TableBody>
          {data?.map((ticket, i) => (
            <TableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              style={{ height: "70px" }}
            >
              <TableCell align="center" style={cellWidth_5}>
                {ticket?.id}
              </TableCell>
              <TableCell align="center" style={cellWidth_5}>
                {ticket?.ticketNumber}
              </TableCell>
              <TableCell align="center" style={cellWidth_10}>
                {ticket?.name || "-"}
              </TableCell>
              <TableCell align="center" style={cellWidth_10}>
                {ticket?.project?.fullName || "-"}
              </TableCell>
              <TableCell align="center" style={cellWidth_10}>
                {ticket.taskDate?.slice(0, 10) || "-"}
              </TableCell>
              <TableCell align="center" style={cellWidth_10}>
                {ticket?.status?.name || "-"}
              </TableCell>
              <TableCell align="center" style={cellWidth_10}>
                {ticket?.priority?.name || "-"}
              </TableCell>
              <TableCell align="center" style={cellWidth_10}>
                {ticket?.projectTaskCategory || "-"}
              </TableCell>
              <TableCell align="center" style={cellWidth_10}>
                {ticket?.targetVersion || "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      ) : (
        <Container>No Records</Container>
      )}
    </>
  );
};

export default TicketTableContent;
