import React, { forwardRef } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogBox = ({ type, id, open, handleCancel, handleClose, onClick }) => {
  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        maxWidth="xs"
        onClose={handleClose}
        aria-describedby="responsive-alert-dialog-slide-description"
      >
        <DialogTitle>{"Alert"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {type === "Delete"
              ? "This data will be deleted"
              : "This data will be saved"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={onClick}
            variant="contained"
            color={type === "Delete" ? "error" : "success"}
          >
            {type === "Delete" ? "Delete" : id ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DialogBox;
