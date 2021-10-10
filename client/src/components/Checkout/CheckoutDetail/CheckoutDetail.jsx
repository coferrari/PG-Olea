import React from "react";
import { Card, ListGroup, Nav, Button } from "react-bootstrap";
//import ItemsCart from "../../ItemsCart/ItemsCart";
import style from "../Checkout.module.css";
import ItemsCheckout from "./CheckoutDetail_Items";

const Details = () => {
  return (
    <div>
      <Card  style={{ width: "%100" }}>
        <Card.Header className={style.title}>
          3 - Detalle de tu Compra
        </Card.Header>
        {/* <ItemsCart/> */}
        <ItemsCheckout />
      </Card>
    </div>
  );
};
export default Details;
