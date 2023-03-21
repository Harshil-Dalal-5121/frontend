import React from "react";

import { Toast } from "react-bootstrap";

const ToastMessage = ({ toast, onClose }) => {
  const { toastTitle } = toast;
  const handleClose = () => {
    onClose(toast);
  };

  return (
    <Toast onClose={handleClose} delay="1000" autohide>
      <Toast.Header>
        <strong className="me-auto">{toastTitle}</strong>
        <small>Just Now</small>
      </Toast.Header>
      <Toast.Body>
        <p>Added To Your cart</p>
      </Toast.Body>
    </Toast>
  );
};

export default ToastMessage;
