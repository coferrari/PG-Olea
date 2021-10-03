import React, { useState } from "react";
import { removeProductsFromChart } from "../../redux/actions/index";
import { useDispatch } from "react-redux";

const ItemCart = ({ id, name, image, price, quantity }) => {
  const [q, setQ] = useState(quantity);
  const [disable, setDisable] = useState(true)
  const dispatch = useDispatch();

  const handleAddOne = (e) => {
    e.preventDefault();
    setQ(q + 1);
    setDisable(false)
  };

  const handleRemoveOne = (e) => {
    e.preventDefault();
    setQ(q - 1);
  };

  // controlar stock??
  const handleRemoveItem = (e) => {
    e.preventDefault();
    dispatch(removeProductsFromChart(id));
  };

  return (
    <div>
      {Array.isArray(image) ? <img src={image[0]} /> : <img src={image} />}
      <h4>{name}</h4>
      <p>{price}</p>
      <div>
        <button disabled={q === 1 ? true : false} onClick={(e) => handleRemoveOne(e)}>-</button>
        <button>{q}</button>
        <button onClick={(e) => handleAddOne(e)}>+</button>
      </div>
      <button onClick={(e) => handleRemoveItem(e)}>eliminar del carrito</button>
    </div>
  );
};

export default ItemCart;
