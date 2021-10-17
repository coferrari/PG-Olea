import React from "react";
import { Card } from "react-bootstrap";
import style from "../Checkout.module.css";
import ItemsCheckout from "./CheckoutDetail_Items";

const Details = () => {
  return (
    <div>
      <Card className={style.card}>
        <div className={style.headers}>
          <Card.Header className={style.title}>
            3 - Detalle de tu Compra
          </Card.Header>
        </div>
        <ItemsCheckout />
      </Card>
    </div>
  );
};
export default Details;
