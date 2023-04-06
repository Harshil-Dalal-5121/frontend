import Typography from "@mui/material/Typography";

import { useTranslation } from "app/services/translate";

export function Tickets() {
  const { t } = useTranslation();
  return (
    <>
      <Typography>{t("Tickets")}</Typography>
    </>
  );
}

export default Tickets;
