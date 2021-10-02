import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Product.module.css";
import { Card, Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import {
  addProductsToChart,
  removeProductsFromChart,
} from "../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";

export function Product({ id, name, image, price }) {
  const productsChart = useSelector(
    (state) => state.carritoReducer.productsCarrito
  );

  const isInChart = productsChart.find((product) => product.id === id);

  const dispatch = useDispatch();

  const handleAddToChart = (e) => {
    e.preventDefault();
    dispatch(addProductsToChart({ id }));
  };

  const handleRemoveFromChart = (e) => {
    e.preventDefault();
    dispatch(removeProductsFromChart(id));
  };

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

          {isInChart ? (
            <Button
              variant="secondary"
              type="submit"
              onClick={(e) => handleRemoveFromChart(e)}
            >
              Eliminar del carrito
            </Button>
          ) : (
            <Button
              variant="dark"
              type="submit"
              onClick={(e) => handleAddToChart(e)}
            >
              Agregar al carrito
            </Button>
          )}
        </Card>
      ) : (
        <Spinner animation="border" />
      )}
    </div>
  );
}
