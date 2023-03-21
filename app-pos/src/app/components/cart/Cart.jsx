import React from "react";

import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import { Alert } from "react-bootstrap";

import CartButton from "./CartButton";

const Cart = ({ cart, onClick }) => {
  let totalPrice = (cart || []).reduce(
    (totalPrice, { itemPrice, quantity }) => totalPrice + itemPrice * quantity,
    0
  );

  return (
    <div className="p-2">
      {(cart || []).length === 0 ? (
        <Alert key="warning" variant="warning">
          Your Cart is Empty ¯\_(ツ)_/¯!!
        </Alert>
      ) : (
        <ListGroup as="ol">
          {(cart || []).map(({ cardTitle, quantity, itemPrice }, index) => {
            return (
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
                key={index}
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">
                    {index + 1}. {cardTitle}
                  </div>
                  <p>
                    ₹ {itemPrice} x {quantity}
                  </p>
                </div>
                <h4>
                  <Badge bg="primary" pill>
                    {itemPrice * quantity}
                  </Badge>
                </h4>
              </ListGroup.Item>
            );
          })}
          <ListGroup.Item
            as="div"
            className="d-flex justify-content-between align-items-center list-group-item"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">Net Total</div>
            </div>
            <h4>
              <span variant="primary" className="badge rounded-pill bg-primary">
                {totalPrice}
              </span>
            </h4>
          </ListGroup.Item>
          <ListGroup.Item
            as="div"
            className="d-flex justify-content-center align-items-center list-group-item"
          >
            <CartButton onClick={onClick}></CartButton>
          </ListGroup.Item>
        </ListGroup>
      )}
    </div>
  );
};

export default Cart;
