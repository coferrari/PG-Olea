import React from "react";
import { Card, ListGroup, Nav, Button } from "react-bootstrap";
import ItemsCart from "../../ItemsCart/ItemsCart";
import style from "../Checkout.module.css";

const Details = () => {
  return (
    <div>
      <Card  style={{ width: "%100" }}>
        <Card.Header className={style.title}>
          3 - Detalle de tu Compra
        </Card.Header>
        <ItemsCart/>
      </Card>
    </div>
  );
};
export default Details;
