import React from "react";
import { Link } from "react-router-dom";
import styles from "./Product.module.css";

export function Product({ id, name, image, price }) {
  return (
    // definir qué info mostrar
    <div className={styles.container}>
      <img src={image} alt="" />
      <Link to={`/product/${id}`}>
        <span>{name}</span>
      </Link>
      <span>{price}</span>
    </div>
  );
}
