import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions/index";
import { Product } from "../Product/Product";

export default function Carousel({ img }) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productsReducer.products);

  const [product, setProduct] = useState(0);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const newItemProducts = img
    ? img
    : products.filter((products) => products.newItem === true);

  function productNext() {
    if (product < newItemProducts.length - 1) {
      setProduct(product + 1);
    }
  }
  function productPrev() {
    if (product >= 1) {
      setProduct(product - 1);
    }
  }

  return (
    <div>
      <button onClick={() => productPrev()}>-</button>
      {newItemProducts?.map((p, i) => {
        if (product === i) {
          return <Product id={p.id} name={p.name} image={p.image[0]} />;
        }
      })}
      <button onClick={() => productNext()}>+</button>
    </div>
  );
}
