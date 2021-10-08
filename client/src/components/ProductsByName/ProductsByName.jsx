import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Products from "../Products/Products";
import { searchProducts } from "../../redux/actions/index";

export default function ProductsByName() {
  const { name } = useParams();
  const dispatch = useDispatch();
  const { searchedProducts } = useSelector(
    (state) => state.searchProductsReducer
  );
  useEffect(() => {
    dispatch(searchProducts(name));
  }, [dispatch, name]);

  return <Products products={searchedProducts} />;
}
