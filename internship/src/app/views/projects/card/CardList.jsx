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

const LIMIT = 5;

const card = (project) => {
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
        <IconButton variant="contained" color="success">
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
  setPage,
  total,
  setSearchParams,
}) {
  const handleChange = (event, value) => {
    setPage(value);
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
                      {card(project, i)}
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
    </>
  );
}
