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
import { Container } from "@mui/system";

const cellWidth_5 = {
  width: "5vw",
};

const cellWidth_10 = {
  width: "10vw",
};

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProjectTableContent = ({ data, setData, search }) => {
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

  const handleDelete = () => {
    const { name, id, version, setData } = deleteProject;
    deleteData(id, version, name, setData);
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
          {data?.map((project, i) => (
            <TableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center" style={cellWidth_5}>
                {project.id}
              </TableCell>
              <TableCell align="center" style={cellWidth_10}>
                {project.name || "-"}
              </TableCell>
              <TableCell align="center" style={cellWidth_10}>
                {project.code || "-"}
              </TableCell>
              <TableCell align="center" style={cellWidth_10}>
                {project.parentProject?.fullName || "-"}
              </TableCell>
              <TableCell align="center" style={cellWidth_10}>
                {project.clientPartner?.fullName || "-"}
              </TableCell>
              <TableCell align="center" style={cellWidth_10}>
                {project.assignedTo?.fullName || "-"}
              </TableCell>
              <TableCell align="center" style={cellWidth_10}>
                {project.fromDate?.slice(0, 10) || "-"}
              </TableCell>
              <TableCell align="center" style={cellWidth_10}>
                {project.toDate?.slice(0, 10) || "-"}
              </TableCell>
              <TableCell align="center" style={{ cellWidth_5 }}>
                {project.imputable === true ? <Check /> : <XCircle />}
              </TableCell>
              <TableCell align="center" style={{ cellWidth_10 }}>
                {project.projectStatus?.name || "-"}
              </TableCell>
              <TableCell align="center">
                <Link to={`${project.id}`}>
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
                      project.id,
                      project.version,
                      project.name,
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

export default ProjectTableContent;
