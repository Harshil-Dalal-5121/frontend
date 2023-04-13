import Typography from "@mui/material/Typography";

import { useTranslation } from "app/services/translate";

import TicketTable from "./table/TicketTable";

export function Tasks() {
  const { t } = useTranslation();
  return (
    <>
      <Typography>{t("Tasks")}</Typography>
      <TicketTable />
    </>
  );
}

export default Tasks;
