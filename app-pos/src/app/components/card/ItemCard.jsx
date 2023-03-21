import React from "react";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import CardImage from "./cardimage/CardImage";

const ItemCard = ({ cardTitle, image, itemPrice, item, onAdd, id }) => {
  return (
    <Card key={id} className="p-3 shadow p-3 mb-5 bg-white rounded">
      <CardImage image={image} />
      <Card.Body>
        <Card.Title>{cardTitle}</Card.Title>
        <Card.Text className="fw-bold"> Price : ₹ {itemPrice}</Card.Text>
        <Button variant="primary" onClick={() => onAdd(item)}>
          Add To Cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ItemCard;
