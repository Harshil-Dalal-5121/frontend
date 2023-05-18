import { Delete } from "@mui/icons-material";
import Edit from "@mui/icons-material/Edit";
import { Button, TableBody, TableCell, TableRow } from "@mui/material";
import DisplayProgressBar from "app/components/DisplayProgressBar";
import {
  StyledTableCell,
  StyledTableRow,
} from "app/components/StyledTableComponents";
import { Check, XCircle } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import getDate from "./helperFunctions";

const NoRecords = () => {
  return (
    <TableRow>
      <TableCell colSpan={12}>
        <p style={{ textAlign: "center", fontSize: 24 }}>No Records!</p>
      </TableCell>
    </TableRow>
  );
};

const ProjectTableContent = (data, setData, handleClickOpen) => {
  return (
    <>
      <TableBody>
        {data ? (
          data?.map((project, i) => (
            <StyledTableRow
              key={i}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <StyledTableCell align="center">{project.id}</StyledTableCell>
              <StyledTableCell align="center">
                {project.name || "-"}
              </StyledTableCell>
              <StyledTableCell align="center">
                {project.code || "-"}
              </StyledTableCell>
              <StyledTableCell align="center">
                {project.parentProject?.fullName || "-"}
              </StyledTableCell>
              <StyledTableCell align="center">
                {project.clientPartner?.fullName || "-"}
              </StyledTableCell>
              <StyledTableCell align="center">
                {project.assignedTo?.fullName || "-"}
              </StyledTableCell>
              <StyledTableCell align="center">
                {!project?.fromDate ? "-" : getDate(project?.fromDate)}
              </StyledTableCell>
              <StyledTableCell align="center">
                {!project?.toDate ? "-" : getDate(project?.toDate)}
              </StyledTableCell>
              <StyledTableCell align="center">
                {project.imputable === true ? <Check /> : <XCircle />}
              </StyledTableCell>
              <StyledTableCell align="center">
                {project.projectStatus?.name || "-"}
              </StyledTableCell>

              <StyledTableCell align="center">
                <Link to={`${project.id}`}>
                  <Button variant="contained" color="success">
                    <Edit />
                  </Button>
                </Link>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Button
                  variant="contained"
                  onClick={() =>
                    handleClickOpen(
                      project.id,
                      project.version,
                      project.name,
                      setData
                    )
                  }
                  color="error"
                >
                  <Delete />
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))
        ) : (
          <NoRecords />
        )}
      </TableBody>
    </>
  );
};

const TaskTableContent = (data, setData, handleClickOpen) => {
  return (
    <>
      <TableBody>
        {data ? (
          data?.map((task, i) => (
            <StyledTableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              style={{ height: "65px" }}
            >
              <StyledTableCell align="center">
                {task?.id || "-"}
              </StyledTableCell>

              <StyledTableCell align="center">
                {task?.name || "-"}
              </StyledTableCell>
              <StyledTableCell align="center">
                {task?.project?.fullName || "-"}
              </StyledTableCell>
              <StyledTableCell align="center">
                {!task?.taskDate ? "-" : getDate(task?.taskDate)}
              </StyledTableCell>
              <StyledTableCell align="center">
                {task?.status?.name || "-"}
              </StyledTableCell>
              <StyledTableCell align="center">
                {task?.priority?.name || "-"}
              </StyledTableCell>

              <StyledTableCell align="center">
                <DisplayProgressBar data={task} />
              </StyledTableCell>
              <StyledTableCell align="center">
                {!task?.taskEndDate ? "-" : getDate(task?.taskEndDate)}
              </StyledTableCell>
              <StyledTableCell align="center">
                {task?.assignedTo?.fullName || "-"}
              </StyledTableCell>
              <StyledTableCell align="center">
                {task?.parentTask?.fullName || "-"}
              </StyledTableCell>
              <StyledTableCell align="center">
                <Link to={`${task.id}`}>
                  <Button variant="contained" color="success">
                    <Edit />
                  </Button>
                </Link>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Button
                  variant="contained"
                  onClick={() =>
                    handleClickOpen(task.id, task.version, task.name, setData)
                  }
                  color="error"
                >
                  <Delete />
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))
        ) : (
          <NoRecords />
        )}
      </TableBody>
    </>
  );
};

const TicketTableContent = (data, setData, handleClickOpen) => {
  return (
    <>
      <TableBody>
        {data ? (
          data?.map((ticket, i) => (
            <StyledTableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              style={{ height: "65px" }}
            >
              <StyledTableCell align="center">
                {ticket?.id || "-"}
              </StyledTableCell>

              <StyledTableCell align="center">
                {ticket?.name || "-"}
              </StyledTableCell>
              <StyledTableCell align="center">
                {ticket?.project?.fullName || "-"}
              </StyledTableCell>
              <StyledTableCell align="center">
                {!ticket?.taskDate ? "-" : getDate(ticket?.taskDate)}
              </StyledTableCell>
              <StyledTableCell align="center">
                {ticket?.status?.name || "-"}
              </StyledTableCell>
              <StyledTableCell align="center">
                {ticket?.priority?.name || "-"}
              </StyledTableCell>
              <StyledTableCell align="center">
                <DisplayProgressBar data={ticket} />
              </StyledTableCell>
              <StyledTableCell align="center">
                {!ticket?.taskEndDate ? "-" : getDate(ticket?.taskEndDate)}
              </StyledTableCell>
              <StyledTableCell align="center">
                {ticket?.assignedTo?.fullName || "-"}
              </StyledTableCell>
              <StyledTableCell align="center">
                {ticket?.parentTask?.fullName || "-"}
              </StyledTableCell>
              <StyledTableCell align="center">
                <Link to={`${ticket.id}`}>
                  <Button variant="contained" color="success">
                    <Edit />
                  </Button>
                </Link>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Button
                  variant="contained"
                  onClick={() =>
                    handleClickOpen(
                      ticket.id,
                      ticket.version,
                      ticket.name,
                      setData
                    )
                  }
                  color="error"
                >
                  <Delete />
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))
        ) : (
          <NoRecords />
        )}
      </TableBody>
    </>
  );
};

export { ProjectTableContent, TaskTableContent, TicketTableContent };
