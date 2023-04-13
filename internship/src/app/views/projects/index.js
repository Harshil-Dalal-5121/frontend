import { Add } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { useTranslation } from "app/services/translate";
import { useNavigate } from "react-router";

import ProjectTable from "./table/ProjectTable";

export function Projects() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <legend>
        <Typography>{t("Projects")}</Typography>
      </legend>
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
      <ProjectTable />
    </>
  );
}

export default Projects;
