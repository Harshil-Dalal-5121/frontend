import { Add } from "@mui/icons-material";
import { Button, TextField, Typography } from "@mui/material";
import { useTranslation } from "app/services/translate";
import { useState } from "react";
import { useNavigate } from "react-router";

import ProjectTable from "./table/ProjectTable";

export function Projects() {
  const [search, setSearch] = useState("");
  const { t } = useTranslation();
  const navigate = useNavigate();

  // const handleSearch = (e) => {
  //   setSearch(e.target.value);
  // };
  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <legend>
        <Typography>{t("Projects")}</Typography>
      </legend>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            navigate("/projects/new");
          }}
          style={{ textTransform: "capitalize", margin: "1em" }}
        >
          <Add /> Create new project
        </Button>
        <TextField
          style={{ margin: "1em" }}
          id="search"
          onChange={handleChange}
          name="search"
          value={search}
          label="Search Project"
          variant="outlined"
        />
      </div>
      <ProjectTable search={search} />
    </>
  );
}

export default Projects;
