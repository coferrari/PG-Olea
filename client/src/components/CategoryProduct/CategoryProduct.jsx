import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsByCategory } from "../../redux/actions";
import Products from "../Products/Products";

export default function CategoryProduct() {
  const dispatch = useDispatch();
  const productsByCategory = useSelector(
    (state) => state.categoryReducer.productsByCategory
  );

  console.log(productsByCategory);

  useEffect(() => {
    dispatch(getProductsByCategory());
  }, [dispatch]);

  return <Products products={productsByCategory} />;
}
