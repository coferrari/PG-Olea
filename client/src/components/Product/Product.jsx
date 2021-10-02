import React from "react";
import { Link } from "react-router-dom";
import style from "./Product.module.css";
import { Card } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

export function Product({ id, name, image, price }) {
  return (
    // definir qué info mostrar
    <div className={style.container}>
      {image ? (
        <Card className={style.card}>
          <Card>
            <Card.Img
              variant="top"
              className={style.img}
              src={image ? image : ""}
              alt="producto"
            />
          </Card>
          <Card.Body>
            <div className={style.cardbody}>
              <Link className={style.link} to={`/product/${id}`}>
                <Card.Title className={style.titlecard}>{name}</Card.Title>
              </Link>
              <Card.Text className={style.subtitlecard}>${price}</Card.Text>
            </div>
          </Card.Body>
        </Card>
      ) : (
        <Spinner animation="border" />
      )}
    </div>
  );
}
