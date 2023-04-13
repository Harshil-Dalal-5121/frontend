import Typography from "@mui/material/Typography";

import { useTranslation } from "app/services/translate";
import TasksTable from "./table/TasksTable";

export function Tasks() {
  const { t } = useTranslation();
  return (
    <>
      <Typography>{t("Tasks")}</Typography>
      <TasksTable />
    </>
  );
}

export default Tasks;
