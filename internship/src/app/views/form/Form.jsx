import React, { useEffect, useState } from "react";

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
} from "@mui/material";
import { saveNewProject, getProject } from "app/services/services";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate, useParams } from "react-router";

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

const Form = () => {
  const [formData, setFormData] = useState(intialValues);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
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
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center" colSpan={"2"}>
                  <Button
                    variant="contained"
                    color="success"
                    style={{ margin: "0 10px" }}
                    onClick={() => {
                      saveNewProject(formData);
                    }}
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
    </>
  );
};

export default Form;
