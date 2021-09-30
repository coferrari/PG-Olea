import React from "react";
import { Link } from "react-router-dom";
import styles from "./Product.module.css";
import { Card } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
export function Product({ id, name, image, price }) {
  return (
    // definir qué info mostrar
    <div className={styles.container}>
      {image ? (
        <Card style={{ width: "30rem" }}>
          <Card.Img variant="top" src={image ? image : ""} alt="producto" />
          <Card.Body>
            <Link to={`/product/${id}`}>
              <Card.Title>{name}</Card.Title>
            </Link>
            <Card.Text>{price}</Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <Spinner animation="border" />
      )}
    </div>
  );
}
