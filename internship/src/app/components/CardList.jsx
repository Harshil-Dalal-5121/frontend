import * as React from "react";

import Typography from "@mui/material/Typography";
import {
  Grid,
  IconButton,
  Box,
  Card,
  CardActions,
  CardContent,
} from "@mui/material";
// import { fetchData, model, tableFields } from "app/services/services";
import { Delete, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { CircularProgress } from "@mui/material";
import { Pagination } from "@mui/material";

const LIMIT = 5;

const card = (project, i) => {
  return (
    <>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          #{i + 1}
        </Typography>
        <Typography variant="h5" component="div">
          {project?.name || "-"}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {project?.code || "-"}
        </Typography>
        <Typography variant="body2">
          {project?.assignedTo?.fullName || "-"}
        </Typography>
        <Typography sx={{ mb: 1.5 }}>
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
        <IconButton variant="contained" color="success">
          <Delete />
        </IconButton>
      </CardActions>
    </>
  );
};

export default function CardList({ projects, loading, page, setPage, total }) {
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      {!loading ? (
        <Grid container spacing={3}>
          {projects?.map((project, i) => {
            return (
              <>
                <Grid item xs={12} sm={4} key={i}>
                  <Box sx={{ minWidth: 275 }} key={i}>
                    <Card variant="outlined" key={i}>
                      {card(project, i)}
                    </Card>
                  </Box>
                </Grid>
              </>
            );
          })}
        </Grid>
      ) : (
        <Container
          style={{
            height: "50vh",
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
    </>
  );
}
