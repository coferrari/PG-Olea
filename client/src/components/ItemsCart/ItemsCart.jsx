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
          {console.log(product)}
          <ItemCart
            id={product.id}
            name={product.name}
            image={product.image}
            price={product.price}
            quantity={product.quantity}
            stock={product.stock}
            offer={product.offer} // % de descuento del producto
            categoryOff={product.categoryOff} // % de descuento de la cat
            offerday={product.offerday} // dia de descuento de la cat
            productOff={product.productOff} // dia de descuento del producto
          />
        </div>
      ))}
    </div>
  );
};

export default ItemsCart;
