import React, { forwardRef, useState } from "react";
import {
  Button,
  TableBody,
  TableCell,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  useMediaQuery,
} from "@mui/material";
import { Check, XCircle } from "react-bootstrap-icons";
import { Delete, Edit } from "@mui/icons-material";
import { deleteData } from "app/services/services";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";

const cellWidth_5 = {
  width: "5vw",
};

const cellWidth_10 = {
  width: "10vw",
};

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TableContent = ({ data, setData }) => {
  const [open, setOpen] = useState(false);
  const [deleteProject, setDeleteProject] = useState({
    id: "",
    version: "",
    name: "",
    setData: "",
  });

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

  const handleClose = () => {
    const { name, id, version, setData } = deleteProject;
    deleteData(id, version, name, setData);
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <TableBody>
        {data?.map((task, i) => (
          <TableRow
            key={i}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
              {task.taskDate || "-"}
            </TableCell>
            <TableCell align="center" style={cellWidth_10}>
              {task.targetVersion || "-"}
            </TableCell>
            <TableCell align="center">
              <Link to={`${task.id}`}>
                <Button variant="contained" color="success">
                  <Edit />
                </Button>
              </Link>
            </TableCell>
            <TableCell align="center">
              <Button
                variant="contained"
                onClick={() =>
                  handleClickOpen(task.id, task.version, task.name, setData)
                }
                color="success"
              >
                <Delete />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
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
          <Button onClick={handleClose} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TableContent;
