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
            categories={product.categories}
            quantity={product.quantity}
            stock={product.stock}
            descuentoProducto={product.offer} // % de descuento del producto
            descuentoCategoria={product.categories?.[0].offer} // % de descuento de la cat
            diaDescuentoCategoria={product.categories?.[0].offerday} // dia de descuento de la cat
            diaDescuentoProducto={product.productOff} // dia de descuento del producto
          />
        </div>
      ))}
    </div>
  );
};

export default ItemsCart;
