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
import PaginationComponent from "app/components/PaginationComponent";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const card = (ticket, handleClickOpen, setData, i) => {
  return (
    <>
      <CardContent key={i}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          #{ticket?.id}
        </Typography>
        <Typography variant="h5" component="div">
          {ticket?.name || "-"}
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
                ticket?.progressSelect <= 30
                  ? "progress-bar progress-bar-striped progress-bar-animated bg-danger"
                  : ticket?.progressSelect > 30 && ticket?.progressSelect <= 50
                  ? "progress-bar progress-bar-striped progress-bar-animated bg-warning"
                  : ticket?.progressSelect > 50 && ticket?.progressSelect <= 80
                  ? "progress-bar progress-bar-striped progress-bar-animated bg-info"
                  : "progress-bar progress-bar-striped progress-bar-animated bg-success"
              }
              style={{ width: `${ticket?.progressSelect || "0"}% ` }}
            ></div>
            {ticket?.progressSelect || "0"}%
          </div>
        </Typography>
        <Typography>
          Priority- <b>{ticket?.priority?.name || "-"}</b>
        </Typography>
        <Typography variant="body2">{ticket?.projectStatus?.name}</Typography>
      </CardContent>
      <CardActions>
        <Link to={`${ticket.id}`}>
          <IconButton variant="contained" color="success">
            <Edit />
          </IconButton>
        </Link>
        <IconButton
          onClick={() =>
            handleClickOpen(ticket.id, ticket.version, ticket.name, setData)
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
  page,
  limit,
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
            {data?.map((ticket, i) => {
              return (
                <>
                  <Grid item xs={12} sm={4} key={i}>
                    <Card sx={{ height: "23vh" }} variant="outlined" key={i}>
                      {card(ticket, handleClickOpen, setData, i)}
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
