import { createBrowserRouter } from "react-router-dom";

import Index from "app/views";
import Projects from "app/views/projects";
import Tasks from "app/views/tasks";
import Tickets from "app/views/tickets";
import Form from "./views/form/Form";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    children: [
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "tasks",
        element: <Tasks />,
      },
      {
        path: "tickets",
        element: <Tickets />,
      },
      {
        path: "/new",
        element: <Form />,
      },
    ],
  },
]);

export default router;
