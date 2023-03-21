import React from "react";

import Button from "react-bootstrap/Button";

const CartButton = ({ onClick }) => {
  return (
    <Button variant="primary" onClick={onClick}>
      Empty Cart
    </Button>
  );
};

export default CartButton;
