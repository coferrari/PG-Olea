import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Product.module.css";
import { Card, Button } from "react-bootstrap";
import {
  addProductsToChart,
  removeProductsFromChart,
} from "../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";

export function Product({ id, name, image, price }) {
  const productsCart = useSelector(
    (state) => state.carritoReducer.productsCarrito
  );

  const isInStore = productsCart?.filter((product) => product.id == id);

  const quantity = 1;

  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(productsCart));
  }, [productsCart]);

  const handleAddToChart = (e) => {
    e.preventDefault();
    dispatch(addProductsToChart({ id, name, image, price, quantity }));
  };

  const handleRemoveFromChart = (e) => {
    e.preventDefault();
    dispatch(removeProductsFromChart(id));
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
        {!isInStore.length ? (
          <Button
            variant="dark"
            type="submit"
            onClick={(e) => handleAddToChart(e)}
          >
            Agregar al carrito
          </Button>
        ) : (
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
