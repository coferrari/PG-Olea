import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Product.module.css";
import { Card, Button } from "react-bootstrap";
import {
  addProductsToChart,
  removeProductsFromChart,
} from "../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";

export function Product({ id, name, image, price }) {
  const productsChart = useSelector(
    (state) => state.carritoReducer.productsCarrito
  );

  const nameItemStorage = localStorage.getItem(name);

  const dispatch = useDispatch();

  const handleAddToChart = (e) => {
    e.preventDefault();
    dispatch(addProductsToChart({ id }));
    localStorage.setItem(name, id);
  };

  const handleRemoveFromChart = (e) => {
    e.preventDefault();
    dispatch(removeProductsFromChart(id));
    localStorage.removeItem(name);
  };

  return (
    // definir qué info mostrar
    <div className={styles.container}>
        <Card style={{ width: "30rem" }}>
          <Card.Img variant="top" src={image ? image : ""} alt="producto" />
          <Card.Body>
            <Link to={`/product/${id}`}>
              <Card.Title>{name}</Card.Title>
            </Link>
            <Card.Text>{price}</Card.Text>
          </Card.Body>
          {!nameItemStorage && (
            <Button
              variant="dark"
              type="submit"
              onClick={(e) => handleAddToChart(e)}
            >
              Agregar al carrito
            </Button>
          )}
          {nameItemStorage && (
            <Button
              variant="secondary"
              type="submit"
              onClick={(e) => handleRemoveFromChart(e)}
            >
              Eliminar del carrito
            </Button>
          )}
        </Card>
    </div>
  );
}
