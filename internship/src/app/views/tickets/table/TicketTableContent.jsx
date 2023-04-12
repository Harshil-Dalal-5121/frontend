import { useTheme } from "@emotion/react";
import { Delete, Edit } from "@mui/icons-material";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  TableBody,
  TableCell,
  TableRow,
  useMediaQuery,
} from "@mui/material";
import { deleteTicket } from "app/services/services";
import { forwardRef, useState } from "react";

import { Link } from "react-router-dom";

const cellWidth_5 = {
  width: "10vw",
};

const cellWidth_10 = {
  width: "15vw",
};

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

    await deleteTicket(reqBody);
    setData((prev) => prev.filter((ticket) => ticket.id !== id));
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

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
            <TableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              style={{ height: "70px" }}
            >
              <TableCell align="center" style={cellWidth_5}>
                {ticket?.id || "-"}
              </TableCell>
              <TableCell align="center" style={cellWidth_5}>
                {ticket?.ticketNumber || "-"}
              </TableCell>
              <TableCell align="center" style={cellWidth_10}>
                {ticket?.name || "-"}
              </TableCell>
              <TableCell align="center" style={cellWidth_10}>
                {ticket?.project?.fullName || "-"}
              </TableCell>
              <TableCell align="center" style={cellWidth_10}>
                {ticket.ticketDate?.slice(0, 10) || "-"}
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
              <TableCell align="center">
                <Link to={`${ticket.id}`}>
                  <Button variant="contained" color="success">
                    <Edit />
                  </Button>
                </Link>
              </TableCell>
              <TableCell align="center">
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
                  color="success"
                >
                  <Delete />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      ) : (
        <Container>No Records</Container>
      )}

      <Dialog
        open={open}
        fullScreen={fullScreen}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        maxWidth="xs"
        onClose={handleClose}
        aria-describedby="responsive-alert-dialog-slide-description"
      >
        <DialogTitle>{" Question"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            This data will be deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TicketTableContent;
