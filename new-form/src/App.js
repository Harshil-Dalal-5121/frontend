import { Grid, Typography } from "@mui/material";

import React from "react";

const App = () => {
  return (
    <>
      <div id="container" style={{ paddingBlock: "20px" }}>
        <Typography
          component="h3"
          variant="h3"
          align="center"
          sx={{ padding: "2vh" }}
        >
          Project
        </Typography>
        <Grid
          id="container"
          container
          spacing={2}
          justifyContent="center"
          sx={{ padding: "2vh" }}
        >
          <Grid
            id="form-fields"
            item
            xl={8}
            sx={{
              marginRight: "1em",
              borderRadius: 2,
              boxShadow: "1px 2px 8px 0px rgba(0, 0, 0, 0.15)",
            }}
          >
            Form
            <Grid
              id="status"
              container
              spacing={2}
              sx={{ padding: "5vh" }}
              justifyContent="space-between"
            >
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
              <Grid
                id="badges"
                container
                xl={2}
                style={{
                  backgroundColor: "red",
                }}
              >
                <Grid
                  id="invoice badge"
                  item
                  xl={6}
                  style={{
                    backgroundColor: "orange",
                  }}
                >
                  Invoice
                </Grid>
                <Grid
                  id="business badge"
                  item
                  xl={6}
                  style={{
                    backgroundColor: "cyan",
                  }}
                >
                  Business
                </Grid>
              </Grid>
            </Grid>
            <Grid id="code-name" container spacing={2} sx={{ padding: "5vh" }}>
              <Grid
                id="code"
                item
                xl={2}
                style={{
                  backgroundColor: "cyan",
                }}
              >
                Code
              </Grid>
              <Grid
                id="name"
                item
                xl={6}
                style={{
                  backgroundColor: "yellow",
                }}
              >
                Name
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              id="company-customer-currency"
              sx={{ padding: "5vh" }}
            >
              <Grid
                id="company"
                item
                xl={4}
                style={{
                  backgroundColor: "cyan",
                }}
              >
                Company
              </Grid>

              <Grid
                id="customer"
                item
                xl={4}
                style={{
                  backgroundColor: "red",
                }}
              >
                Customer
              </Grid>
              <Grid
                id="currency"
                item
                xl={4}
                style={{
                  backgroundColor: "yellow",
                }}
              >
                Currency
              </Grid>
            </Grid>
            <Grid
              id="customerContact-address"
              container
              spacing={2}
              sx={{ padding: "5vh" }}
            >
              <Grid
                id="customer-contact"
                item
                xl={6}
                style={{
                  backgroundColor: "cyan",
                }}
              >
                Customer Contact
              </Grid>
              <Grid
                id="address"
                item
                xl={6}
                style={{
                  backgroundColor: "yellow",
                }}
              >
                Address
              </Grid>
            </Grid>
          </Grid>
          <Grid
            id="actions"
            item
            xl={3}
            xs={12}
            style={{
              borderRadius: 10,
            }}
          >
            Actions
            <Grid>
              <Grid
                id="add-btn"
                item
                xl={12}
                style={{
                  boxShadow: "1px 2px 8px 0px rgba(0, 0, 0, 0.15)",
                  padding: "2vh 1vw",
                  margin: "1vw",
                }}
              >
                Add
              </Grid>
              <Grid
                id="cancel-btn"
                item
                xl={12}
                style={{
                  boxShadow: "1px 2px 8px 0px rgba(0, 0, 0, 0.15)",
                  margin: "1vw",
                  padding: "2vh 1vw",
                }}
              >
                Cancel
              </Grid>
              <Grid
                id="characteristics"
                item
                xl={12}
                style={{
                  boxShadow: "1px 2px 8px 0px rgba(0, 0, 0, 0.15)",
                  margin: "1vw",
                  padding: "1vh 1vw",
                }}
              >
                Characteristics
                <Grid
                  id="business-project"
                  item
                  xl={12}
                  style={{
                    backgroundColor: "red",
                    margin: "1vw",
                    padding: "2vh 1vw",
                  }}
                >
                  Businesss Project
                </Grid>
                <Grid
                  id="parent-project"
                  item
                  xl={12}
                  style={{
                    backgroundColor: "yellow",
                    margin: "1vw",
                    padding: "2vh 1vw",
                  }}
                >
                  Parent Project
                </Grid>
              </Grid>
              <Grid
                id="follow-up"
                item
                xl={12}
                style={{
                  boxShadow: "1px 2px 8px 0px rgba(0, 0, 0, 0.15)",
                  margin: "1vw",
                  padding: "1vh 1vw",
                }}
              >
                Follow Up
                <Grid
                  id="assigned-to"
                  item
                  xl={12}
                  style={{
                    backgroundColor: "red",
                    margin: "1vw",
                    padding: "2vh 1vw",
                  }}
                >
                  Assigned To
                </Grid>
              </Grid>
              <Grid
                id="dates"
                item
                xl={12}
                style={{
                  boxShadow: "1px 2px 8px 0px rgba(0, 0, 0, 0.15)",
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

export default App;
