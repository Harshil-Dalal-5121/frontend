import { Delete, Edit } from "@mui/icons-material";
import {
  Button,
  Container,
  styled,
  TableBody,
  TableCell,
  tableCellClasses,
  TableRow,
} from "@mui/material";
import DialogBoxComponent from "app/components/Dialog";
import { deleteData, model } from "app/services/services";
import { useState } from "react";

import { Link } from "react-router-dom";

const cellWidth_5 = {
  width: "10vw",
};

const cellWidth_10 = {
  width: "15vw",
};

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

const TicketTableContent = ({ data, setData }) => {
  const [open, setOpen] = useState(false);

  const [deleteProject, setDeleteProject] = useState({
    id: "",
    version: "",
    name: "",
    setData: "",
  });
  const handleDeleteTask = async () => {
    const { name, id, version, setData } = deleteProject;
    const reqBody = {
      records: [{ id: id, version: version, name: name }],
    };

    await deleteData(`${model}Task/removeAll`, reqBody);
    setData((prev) => prev.filter((ticket) => ticket.id !== id));
  };

  const handleClickOpen = (id, version, name, setData) => {
    setDeleteProject({
      ...deleteProject,
      id: id,
      version: version,
      name: name,
      setData: setData,
    });
    setOpen(true);
  };

  const getDate = (val) => {
    var date = new Date(val); // M-D-YYYY

    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();

    var dateString =
      (d <= 9 ? "0" + d : d) + "-" + (m <= 9 ? "0" + m : m) + "-" + y;
    return dateString;
  };

  const handleDelete = () => {
    handleDeleteTask();
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      {data ? (
        <TableBody>
          {data?.map((ticket, i) => (
            <StyledTableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              style={{ height: "70px" }}
            >
              <StyledTableCell align="center" style={cellWidth_5}>
                {ticket?.id || "-"}
              </StyledTableCell>
              <StyledTableCell align="center" style={cellWidth_5}>
                {ticket?.ticketNumber || "-"}
              </StyledTableCell>
              <StyledTableCell align="center" style={cellWidth_10}>
                {ticket?.name || "-"}
              </StyledTableCell>
              <StyledTableCell align="center" style={cellWidth_10}>
                {ticket?.project?.fullName || "-"}
              </StyledTableCell>
              <StyledTableCell align="center" style={cellWidth_10}>
                {!ticket?.taskDate ? "-" : getDate(ticket?.taskDate)}
              </StyledTableCell>
              <StyledTableCell align="center" style={cellWidth_10}>
                {ticket?.status?.name || "-"}
              </StyledTableCell>
              <StyledTableCell align="center" style={cellWidth_10}>
                {ticket?.priority?.name || "-"}
              </StyledTableCell>
              <StyledTableCell align="center" style={cellWidth_10}>
                {ticket?.projectTaskCategory || "-"}
              </StyledTableCell>
              <StyledTableCell align="center" style={cellWidth_10}>
                {ticket?.targetVersion || "-"}
              </StyledTableCell>
              <StyledTableCell align="center" style={cellWidth_10}>
                <div
                  className="progress"
                  role="progressbar"
                  aria-label="Animated striped example"
                  aria-valuenow="75"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <div
                    className={
                      ticket?.progressSelect <= 30
                        ? "progress-bar progress-bar-striped progress-bar-animated bg-danger"
                        : ticket?.progressSelect > 30 &&
                          ticket?.progressSelect <= 50
                        ? "progress-bar progress-bar-striped progress-bar-animated bg-warning"
                        : ticket?.progressSelect > 50 &&
                          ticket?.progressSelect <= 80
                        ? "progress-bar progress-bar-striped progress-bar-animated bg-info"
                        : "progress-bar progress-bar-striped progress-bar-animated bg-success"
                    }
                    style={{ width: `${ticket?.progressSelect || "0"}% ` }}
                  ></div>
                  {ticket?.progressSelect || "0"}%
                </div>
              </StyledTableCell>
              <StyledTableCell align="center" style={cellWidth_10}>
                {!ticket?.taskEndDate ? "-" : getDate(ticket?.taskEndDate)}
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
        <Container>No Records</Container>
      )}

      <DialogBoxComponent
        type="Delete"
        open={open}
        handleCancel={handleCancel}
        handleClose={handleClose}
        onClick={handleDelete}
      />
    </>
  );
};

export default TicketTableContent;
