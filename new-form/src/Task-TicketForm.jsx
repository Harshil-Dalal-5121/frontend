import { Grid, Typography } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import React from "react";

const TaskForm = () => {
  const [value, setValue] = React.useState("");

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  console.log(value);
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
          sx={{
            boxShadow: "1px 2px 8px 0px rgba(0, 0, 0, 0.15)",
          }}
        >
          <Grid
            container
            spacing={2}
            xl={10}
            sx={{
              padding: "2vh",
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
              <Typography component="h6" variant="h6">
                Form
              </Typography>
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
              <Grid
                id="assignedto"
                container
                spacing={2}
                sx={{ padding: "5vh" }}
              >
                <Grid
                  id="assigned to"
                  item
                  xl={6}
                  style={{
                    backgroundColor: "yellow",
                  }}
                >
                  <MuiTelInput
                    value={value}
                    onChange={handleChange}
                    defaultCountry="IN"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              id="Characteristics"
              style={{ padding: "1vh " }}
              xl={12}
            >
              <Typography component="h6" variant="h6">
                Characteristics
              </Typography>
              <hr style={{ backgroundColor: "rgba(0, 0, 0, 0.15)" }} />
              <Grid container sx={{ padding: "5vh" }} spacing={2}>
                <Grid
                  id="priority"
                  item
                  xl={5}
                  style={{
                    backgroundColor: "red",
                  }}
                >
                  Priority
                </Grid>
                <Grid
                  id="progress-bar"
                  item
                  xl={5}
                  style={{
                    backgroundColor: "cyan",
                  }}
                >
                  Progress
                </Grid>
              </Grid>
            </Grid>

            <Grid container id="dates" style={{ padding: "1vh " }} xl={12}>
              <Typography component="h6" variant="h6">
                Dates
              </Typography>
              <hr style={{ backgroundColor: "rgba(0, 0, 0, 0.15)" }} />
              <Grid container sx={{ padding: "5vh" }} spacing={2}>
                <Grid
                  id="fromDate"
                  item
                  xl={5}
                  style={{
                    backgroundColor: "red",
                  }}
                >
                  From Date
                </Grid>
                <Grid
                  id="to date"
                  item
                  xl={5}
                  style={{
                    backgroundColor: "cyan",
                  }}
                >
                  To date
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            xl={2}
            spacing={2}
            sx={{
              padding: "2vh",
            }}
          >
            <Grid
              id="add-btn"
              item
              xl={12}
              style={{
                boxShadow: "1px 2px 8px 0px rgba(0, 0, 0, 0.15)",
                margin: "1vw",
              }}
            >
              "Update"
            </Grid>
            <Grid
              id="cancel-btn"
              item
              xl={12}
              style={{
                boxShadow: "1px 2px 8px 0px rgba(0, 0, 0, 0.15)",
                margin: "1vw",
              }}
            >
              Back
            </Grid>
            <Grid
              id="cancel-btn"
              item
              xl={12}
              style={{
                boxShadow: "1px 2px 8px 0px rgba(0, 0, 0, 0.15)",
                margin: "1vw",
              }}
            ></Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default TaskForm;
