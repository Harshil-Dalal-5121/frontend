import { TableBody, TableCell, TableRow } from "@mui/material";

const cellWidth_5 = {
  width: "5vw",
};

const cellWidth_10 = {
  width: "10vw",
};

const TicketTableContent = ({ data, setData }) => {
  return (
    <>
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
    </>
  );
};

export default TicketTableContent;
