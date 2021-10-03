import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import ItemCart from "../ItemCart/ItemCart";

const ItemsCart = () => {
  const productsCart = useSelector(
    (state) => state.carritoReducer.productsCarrito
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(productsCart));
  }, [productsCart]);

  return (
    <div>
      {productsCart?.map((product) => (
        <div key={product.id}>
          <ItemCart
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

export default ItemsCart;
