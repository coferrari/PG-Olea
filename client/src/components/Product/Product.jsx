import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Product.module.css";
import { Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "../../redux/actions/index";

export function Product({ id, name, image, price }) {
  const [add, setAdd] = useState(false);
  const [remove, setRemove] = useState(false);
  const dispatch = useDispatch();
  const quantity = 1;

  const { productsCarrito } = useSelector((state) => state.carritoReducer);

  useEffect(() => {
    if (add) {
      const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart"));
      const cartAdded = [
        ...cartFromLocalStorage,
        { id, name, image, price, quantity },
      ];
      localStorage.setItem("cart", JSON.stringify(cartAdded));
      dispatch(updateCart(cartAdded));
      setAdd(false);
    }
    if (remove) {
      const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart"));
      const cartRemoved = cartFromLocalStorage.filter(
        (product) => product.id !== id
      );
      localStorage.setItem("cart", JSON.stringify(cartRemoved));
      dispatch(updateCart(cartRemoved));
      setRemove(false);
    }
  }, [add, remove]);

  const isInStore = productsCarrito.findIndex((product) => product.id === id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    setAdd(true);
  };

  const handleRemoveFromCart = (e) => {
    e.preventDefault();
    setRemove(true);
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Card>
          <Card.Img
            className={styles.img}
            variant="top"
            src={image ? image : ""}
            alt="producto"
          />{" "}
        </Card>
        <Card.Body>
          <div className={styles.cardbody}>
            <Link className={styles.link} to={`/product/${id}`}>
              <Card.Title className={styles.titlecard}>{name}</Card.Title>
            </Link>
            <Card.Text className={styles.subtitlecard}>{price}</Card.Text>
          </div>
          {isInStore === -1 && (
            <Button
              className={styles.btn}
              variant="dark"
              type="submit"
              onClick={(e) => handleAddToCart(e)}
            >
              Agregar al carrito
            </Button>
          )}
          {isInStore >= 0 && (
            <Button
              className={styles.btn}
              variant="secondary"
              type="submit"
              onClick={(e) => handleRemoveFromCart(e)}
            >
              Eliminar del carrito
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
