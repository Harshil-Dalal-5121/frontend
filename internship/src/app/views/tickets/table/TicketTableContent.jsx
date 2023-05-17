import {
  Button,
  styled,
  TableBody,
  TableCell,
  tableCellClasses,
  TableFooter,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";

import { Delete, Edit } from "@mui/icons-material";
import DisplayProgressBar from "app/views/tasks/table/DisplayProgressBar";
import getDate from "app/utils/helperFunctions";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const TicketTableContent = ({ data, setData, handleClickOpen }) => {
  return (
    <>
      {data ? (
        <TableBody>
          {data?.map((ticket, i) => (
            <StyledTableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              style={{ height: "65px" }}
            >
              <StyledTableCell align="center">
                {ticket?.id || "-"}
              </StyledTableCell>

              <StyledTableCell align="center">
                {ticket?.name || "-"}
              </StyledTableCell>
              <StyledTableCell align="center">
                {ticket?.project?.fullName || "-"}
              </StyledTableCell>
              <StyledTableCell align="center">
                {!ticket?.taskDate ? "-" : getDate(ticket?.taskDate)}
              </StyledTableCell>
              <StyledTableCell align="center">
                {ticket?.status?.name || "-"}
              </StyledTableCell>
              <StyledTableCell align="center">
                {ticket?.priority?.name || "-"}
              </StyledTableCell>
              <StyledTableCell align="center">
                <DisplayProgressBar data={ticket} />
              </StyledTableCell>
              <StyledTableCell align="center">
                {!ticket?.taskEndDate ? "-" : getDate(ticket?.taskEndDate)}
              </StyledTableCell>
              <StyledTableCell align="center">
                {ticket?.assignedTo?.fullName || "-"}
              </StyledTableCell>
              <StyledTableCell align="center">
                {ticket?.parentTask?.fullName || "-"}
              </StyledTableCell>
              <StyledTableCell align="center">
                <Link to={`${ticket.id}`}>
                  <Button variant="contained" color="success">
                    <Edit />
                  </Button>
                </Link>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Button
                  variant="contained"
                  onClick={() =>
                    handleClickOpen(
                      ticket.id,
                      ticket.version,
                      ticket.name,
                      setData
                    )
                  }
                  color="error"
                >
                  <Delete />
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      ) : (
        <TableFooter>
          <TableRow>
            <TableCell colSpan={12} rowSpan={7}>
              No Records
            </TableCell>
          </TableRow>
        </TableFooter>
      )}
    </>
  );
};

export default TicketTableContent;
