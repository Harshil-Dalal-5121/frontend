import { Outlet, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useTranslation } from "app/services/translate";
const navButtons = [
  {
    path: "projects",
    Title: "Projects",
  },
  {
    path: "tasks",
    Title: "Tasks",
  },
  {
    path: "tickets",
    Title: "Tickets",
  },
];

function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleRedirection = (path) => () => {
    navigate(`/${path}`);
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Box flexGrow={1}></Box>
        <Box display="flex" alignItems="center">
          {navButtons?.map(({ path, Title }, i) => {
            return (
              <Button
                key={i}
                onClick={handleRedirection(path)}
                sx={{ mr: 1 }}
                color="secondary"
                variant="contained"
              >
                {t(Title)}
              </Button>
            );
          })}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

function Content() {
  return (
    <Box component="main" flexGrow={1}>
      <Outlet />
    </Box>
  );
}

function Footer() {
  return (
    <Box
      sx={{ paddingBlock: "18px" }}
      display="flex"
      alignItems="center"
      justifyContent="center"
      boxShadow={2}
      component="footer"
    >
      <Typography color="primary">
        &copy; Copyright 2005 - {new Date().getFullYear()}, Axelor. All Rights
        Reserved.
      </Typography>
    </Box>
  );
}

function Layout() {
  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Header />
      <Content />
      <Footer />
    </Box>
  );
}

export function Index() {
  return (
    <>
      <Layout />
    </>
  );
}

export default Index;
