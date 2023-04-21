import * as React from "react";

import Typography from "@mui/material/Typography";
import {
  Grid,
  IconButton,
  Card,
  CardActions,
  CardContent,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { CircularProgress } from "@mui/material";
import { Dialog } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { DialogContent } from "@mui/material";
import { DialogContentText } from "@mui/material";
import { DialogActions } from "@mui/material";
import { Button } from "@mui/material";
import { Slide } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import { deleteData, model } from "app/services/services";
import PaginationComponent from "app/components/Pagination";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const card = (task, handleClickOpen, setData) => {
  return (
    <>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          #{task?.id}
        </Typography>
        <Typography variant="h5" component="div">
          {task?.name || "-"}
        </Typography>
        <Typography sx={{ mb: 1.5, width: "30%" }} color="text.secondary">
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
                task?.progressSelect <= 30
                  ? "progress-bar progress-bar-striped progress-bar-animated bg-danger"
                  : task?.progressSelect > 30 && task?.progressSelect <= 50
                  ? "progress-bar progress-bar-striped progress-bar-animated bg-warning"
                  : task?.progressSelect > 50 && task?.progressSelect <= 80
                  ? "progress-bar progress-bar-striped progress-bar-animated bg-info"
                  : "progress-bar progress-bar-striped progress-bar-animated bg-success"
              }
              style={{ width: `${task?.progressSelect || "0"}% ` }}
            ></div>
            {task?.progressSelect || "0"}%
          </div>
        </Typography>
        <Typography>
          Priority- <b>{task?.priority?.name || "-"}</b>
        </Typography>
        <Typography variant="body2">{task?.projectStatus?.name}</Typography>
      </CardContent>
      <CardActions>
        <Link to={`${task.id}`}>
          <IconButton variant="contained" color="success">
            <Edit />
          </IconButton>
        </Link>
        <IconButton
          onClick={() =>
            handleClickOpen(task.id, task.version, task.name, setData)
          }
          color="success"
          variant="contained"
        >
          <Delete />
        </IconButton>
      </CardActions>
    </>
  );
};

export default function CardList({
  data,
  loading,
  limit,
  page,
  setData,
  setPage,
  total,
}) {
  const [open, setOpen] = React.useState(false);

  const [deleteProject, setDeleteProject] = React.useState({
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

    setData((prev) => prev.filter((task) => task.id !== id));
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
  const handleChange = (event, value) => {
    setPage(value);
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
      {!loading ? (
        <div style={{ padding: "15px", height: "52vh" }}>
          <Grid container spacing={3}>
            {data?.map((task, i) => {
              return (
                <>
                  <Grid item xs={12} sm={4} key={i}>
                    <Card sx={{ height: "23vh" }} variant="outlined" key={i}>
                      {card(task, handleClickOpen, setData)}
                    </Card>
                  </Grid>
                </>
              );
            })}
          </Grid>
        </div>
      ) : (
        <Container
          style={{
            height: "52vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Container>
      )}
      <p>Total Items: {total}</p>
      <p>Page: {page}</p>
      <PaginationComponent
        total={total}
        limit={limit}
        page={page}
        handleChange={handleChange}
      />
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
}
