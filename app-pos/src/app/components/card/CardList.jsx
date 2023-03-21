import React from "react";

import { Row, Col } from "react-bootstrap";

import ItemCard from "./ItemCard";

const CardList = ({ data, onAdd }) => {
  console.log("data >>>", data);
  return (
    <>
      <Row xs={2} md={4} lg={6}>
        {data.map((card) => (
          <Col key={card.id}>
            <ItemCard
              key={card.id}
              image={card.image}
              cardTitle={card.cardTitle}
              itemPrice={card.itemPrice}
              item={card}
              onAdd={onAdd}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default CardList;
