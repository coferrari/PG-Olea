import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsByCategory } from "../../redux/actions";
import Products from "../Products/Products";
import { useParams } from "react-router";

export default function CategoryProduct() {
  const dispatch = useDispatch();
  const { nameCategory } = useParams();
  const productsByCategory = useSelector(
    (state) => state.categoryReducer.productsByCategory
  );

  console.log(productsByCategory);

  useEffect(() => {
    dispatch(getProductsByCategory(nameCategory));
  }, [dispatch]);

  return <Products products={productsByCategory} />;
}
