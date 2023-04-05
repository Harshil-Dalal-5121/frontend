import Typography from "@mui/material/Typography";
import { useTranslation } from "app/services/translate";
import ProjectTable from "./table/ProjectTable";

export function Projects() {
  const { t } = useTranslation();
  return (
    <>
      <legend>
        <Typography>{t("Projects")}</Typography>
      </legend>
      <ProjectTable />
    </>
  );
}

export default Projects;
