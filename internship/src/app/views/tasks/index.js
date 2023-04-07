import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { getTasks } from "app/services/services";

import { useTranslation } from "app/services/translate";
import TasksTable from "./table/TasksTable";

export function Tasks() {
  const { t } = useTranslation();
  return (
    <>
      <Typography>{t("Tasks")}</Typography>
      <Button onClick={() => getTasks()}>Get Tickets</Button>
      <TasksTable />
    </>
  );
}

export default Tasks;
