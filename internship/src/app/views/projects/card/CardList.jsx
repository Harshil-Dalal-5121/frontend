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
import { Pagination } from "@mui/material";
import { Dialog } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { DialogContent } from "@mui/material";
import { DialogContentText } from "@mui/material";
import { DialogActions } from "@mui/material";
import { Button } from "@mui/material";
import { Slide } from "@mui/material";
import { deleteData, model } from "app/services/services";
import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";

const LIMIT = 5;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const card = (project, handleClickOpen, setData) => {
  return (
    <>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          #{project?.id}
        </Typography>
        <Typography variant="h5" component="div">
          {project?.name || "-"}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {project?.code || "-"}
        </Typography>
        <Typography>
          Parent- <b>{project?.clientPartner?.fullName || "-"}</b>
        </Typography>
        <Typography variant="body2">{project?.projectStatus?.name}</Typography>
      </CardContent>
      <CardActions>
        <Link to={`${project.id}`}>
          <IconButton variant="contained" color="success">
            <Edit />
          </IconButton>
        </Link>
        <IconButton
          onClick={() =>
            handleClickOpen(project.id, project.version, project.name, setData)
          }
          variant="contained"
          color="success"
        >
          <Delete />
        </IconButton>
      </CardActions>
    </>
  );
};

export default function CardList({
  projects,
  loading,
  page,
  setProjects,
  setPage,
  total,
  setSearchParams,
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

  React.useEffect(() => {
    setSearchParams({ page, limit: LIMIT });
  }, [page, setSearchParams]);

  return (
    <>
      {!loading ? (
        <div style={{ padding: "15px", height: "52vh" }}>
          <Grid container spacing={3}>
            {projects?.map((project, i) => {
              return (
                <>
                  <Grid item xs={12} sm={4} key={i}>
                    <Card sx={{ height: "23vh" }} variant="outlined" key={i}>
                      {card(project, handleClickOpen, setProjects, i)}
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
      <Pagination
        shape="rounded"
        count={Math.ceil(total / LIMIT)}
        page={page}
        onChange={handleChange}
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
