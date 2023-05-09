import { Grid, Typography } from "@mui/material";
import React from "react";

const TaskForm = () => {
  return (
    <>
      <div id="container" style={{ padding: "0 5vh" }}>
        <Typography
          component="h3"
          variant="h3"
          align="center"
          sx={{ padding: "2vh" }}
        >
          Task
        </Typography>
        <Grid
          id="container"
          container
          spacing={2}
          justifyContent="center"
          sx={{
            padding: "2vh",
            boxShadow: "1px 2px 8px 0px rgba(0, 0, 0, 0.15)",
          }}
        >
          <Grid
            id="form-fields"
            item
            xl={12}
            sx={{
              marginRight: "1em",
              borderRadius: 2,
            }}
          >
            Form
            <Grid id="status" container spacing={2} sx={{ padding: "5vh" }}>
              <Grid
                id="status-bar"
                item
                xl={2}
                style={{
                  backgroundColor: "cyan",
                }}
              >
                Status Bar
              </Grid>
            </Grid>
            <Grid id="subject" container spacing={2} sx={{ padding: "5vh" }}>
              <Grid
                id="subject"
                item
                xl={7}
                style={{
                  backgroundColor: "cyan",
                }}
              >
                Subject
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              id="project-parentTask"
              sx={{ padding: "5vh" }}
            >
              <Grid
                id="project"
                item
                xl={5}
                style={{
                  backgroundColor: "cyan",
                }}
              >
                Project
              </Grid>

              <Grid
                id="parentTask"
                item
                xl={5}
                style={{
                  backgroundColor: "red",
                }}
              >
                Parent Task
              </Grid>
            </Grid>
            <Grid id="assignedto" container spacing={2} sx={{ padding: "5vh" }}>
              <Grid
                id="assigned to"
                item
                xl={6}
                style={{
                  backgroundColor: "yellow",
                }}
              >
                Assigned To
              </Grid>
            </Grid>
          </Grid>
          <Grid
            id="Characteristics"
            item
            xl={12}
            xs={12}
            style={{
              borderRadius: 10,
            }}
          >
            Characteristics
            <Grid container>
              <Grid
                id="priority-progress"
                container
                spacing={2}
                xl={12}
                style={{
                  margin: "1vw",
                  padding: "1vh 1vw",
                }}
              >
                Prioirty
                <Grid
                  id="priority"
                  item
                  xl={5}
                  style={{
                    backgroundColor: "red",
                    margin: "1vw",
                  }}
                >
                  Priority
                </Grid>
                <Grid
                  id="progress"
                  item
                  xl={5}
                  style={{
                    backgroundColor: "blue",
                    margin: "1vw",
                  }}
                >
                  Progress
                </Grid>
              </Grid>
              <Grid
                id="dates"
                item
                xl={12}
                style={{
                  margin: "1vw",
                  padding: "5vh 1vw",
                }}
              >
                Dates
                <Grid container id="dates">
                  <Grid
                    id="from-date"
                    item
                    xl={5}
                    style={{
                      backgroundColor: "red",
                    }}
                  >
                    From-date
                  </Grid>
                  <Grid
                    id="to-date"
                    item
                    xl={5}
                    style={{
                      backgroundColor: "cyan",
                    }}
                  >
                    To-date
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default TaskForm;
