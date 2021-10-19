import React from "react";
import { useSelector } from "react-redux";
import ItemCheckout from "./CheckoutDetail_Item";
import style from "./ItemsCheckout.module.css";

const ItemsCheckout = () => {
  const productsReducer = useSelector(
    (state) => state.carritoReducer.productsCarrito
  );

  return (
    <div className={style.cnt}>
      <div className={style.container}>
        {productsReducer?.map((product) => (
          <div key={product.id}>
            <ItemCheckout
              id={product.id}
              name={product.name}
              image={product.image}
              price={product.price}
              quantity={product.quantity}
              categories={product.categories}
              descuentoProducto={product.offer} // % de descuento del producto
              diaDescuentoProducto={product.offerday} // dia de descuento del producto
              descuentoCategoria={product.categories?.[0].offer} // % de descuento de la cat
              diaDescuentoCategoria={product.categories?.[0].offerday} // dia de descuento de la cat
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemsCheckout;
