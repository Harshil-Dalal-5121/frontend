import React, { forwardRef, useEffect, useState } from "react";

import {
  Button,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  useMediaQuery,
} from "@mui/material";
import { saveNewProject, getProject } from "app/services/services";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate, useParams } from "react-router";
import { useTheme } from "@emotion/react";

const intialValues = {
  name: "",
  fromDate: "",
  parentProject: "",
  clientPartner: "",
  toDate: "",
  imputable: false,
  assignedTo: "",
  code: "",
};

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Form = () => {
  const [formData, setFormData] = useState(intialValues);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const navigate = useNavigate();
  const handleClose = () => {
    saveNewProject(formData);
    setOpen(false);
    navigate("/projects");
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    if ({ id }) {
      getProject(id, setFormData);
    }
    setLoading(false);
  }, [id]);

  const handleChange = (e) => {
    const { name, value, checked } = e.target || {};
    setFormData({
      ...formData,
      [name]: name === "imputable" ? checked : value,
    });
  };

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer
          style={{
            width: "40%",
            margin: "20px auto",
          }}
          component={Paper}
          s
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell align="center">Name :</TableCell>
                <TableCell align="center">
                  <TextField
                    fullWidth
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    label="Add Name"
                    variant="outlined"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">Code :</TableCell>
                <TableCell align="center">
                  <TextField
                    fullWidth
                    id="code"
                    name="code"
                    onChange={handleChange}
                    value={formData.code}
                    label="Add Code"
                    variant="outlined"
                  />
                </TableCell>
              </TableRow>

              <TableCell align="center">Imputable :</TableCell>
              <TableCell align="center">
                <Switch
                  onClick={handleChange}
                  checked={formData.imputable}
                  color="success"
                  name="imputable"
                />
              </TableCell>
              <TableRow>
                <TableCell align="center">From Date :</TableCell>
                <TableCell align="center">
                  <TextField
                    fullWidth
                    id="fromDate"
                    name="fromDate"
                    onChange={handleChange}
                    type="date"
                    variant="outlined"
                    value={formData.fromDate?.slice(0, 10)}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">To Date :</TableCell>
                <TableCell align="center">
                  <TextField
                    fullWidth
                    id="toDate"
                    name="toDate"
                    onChange={handleChange}
                    type="date"
                    variant="outlined"
                    value={formData.toDate?.slice(0, 10)}
                    error={formData.toDate === "" ? true : false}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center" colSpan={"2"}>
                  <Button
                    variant="contained"
                    color="success"
                    style={{ margin: "0 10px" }}
                    onClick={handleClickOpen}
                  >
                    Add
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => {
                      navigate("/projects");
                    }}
                  >
                    Back
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Dialog
        open={open}
        fullScreen={fullScreen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="responsive-alert-dialog-slide-description"
      >
        <DialogTitle>{" Do you want to save this data ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            This data will be saved.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleClose} variant="contained" color="secondary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Form;
