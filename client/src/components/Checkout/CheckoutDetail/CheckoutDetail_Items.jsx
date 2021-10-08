import React from "react";
import { useSelector } from "react-redux";
import ItemCheckout from "./CheckoutDetail_Item";
import style from "./ItemsCheckout.module.css";


const ItemsCheckout = () => {

  const productsReducer = useSelector(
      (state) => state.carritoReducer.productsCarrito
    );

  return (
    <div className={style.container}>
      {productsReducer?.map((product) => (
        <div key={product.id}>
          <ItemCheckout
            id={product.id}
            name={product.name}
            image={product.image}
            price={product.price}
            quantity={product.quantity}
          />
        </div>
      ))}
    </div>
  );
};

export default ItemsCheckout;