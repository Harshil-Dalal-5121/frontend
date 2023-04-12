import { createBrowserRouter } from "react-router-dom";

import Index from "app/views";
import Projects from "app/views/projects";
import Tasks from "app/views/tasks";
import Tickets from "app/views/tickets";
import Form from "./views/form/Form";
import TaskForm from "./views/form/TaskForm";
import TicketForm from "./views/form/TicketForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    children: [
      {
        path: "projects",
        children: [
          {
            index: true,
            element: <Projects />,
          },
          {
            path: "new",
            element: <Form />,
          },
          {
            path: ":id",
            element: <Form />,
          },
        ],
      },
      {
        path: "tasks",
        children: [
          {
            index: true,
            element: <Tickets />,
          },
          {
            path: "new",
            element: <TicketForm />,
          },
          {
            path: ":id",
            element: <TicketForm />,
          },
        ],
      },
      {
        path: "tickets",
        children: [
          {
            index: true,
            element: <Tasks />,
          },
          {
            path: "new",
            element: <TaskForm />,
          },
          {
            path: ":id",
            element: <TaskForm />,
          },
        ],
      },
    ],
  },
]);

export default router;
