import React from "react";
import { useSelector } from "react-redux";
import ItemCart from "../ItemCart/ItemCart";
import style from "./ItemsCart.module.css";

const ItemsCart = () => {

  const productsReducer = useSelector(
      (state) => state.carritoReducer.productsCarrito
    );

  return (
    <div className={style.container}>
      {productsReducer?.map((product) => (
        <div key={product.id}>
          <ItemCart
            id={product.id}
            name={product.name}
            image={product.image}
            price={product.price}
            quantity={product.quantity}
            stock={product.stock}
          />
        </div>
      ))}
    </div>
  );
};

export default ItemsCart;
