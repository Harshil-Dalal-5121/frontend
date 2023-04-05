import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
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
          navigate("/new");
        }}
      >
        Create new project
      </Button>
      <ProjectTable />
    </>
  );
}

export default Projects;
