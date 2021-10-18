import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsByCategory, getWishlist } from "../../redux/actions";
import Products from "../Products/Products";
import { useParams } from "react-router";
import Selects from "../Selects/Selects";
import { Search } from "../Search/Search";
import style from "./CategoryProducts.module.css";
import { isAuthorized, decodeToken } from "../../utils";

export default function CategoryProduct() {
  const dispatch = useDispatch();
  const { nameCategory, attribute, order } = useParams();
  const validate = isAuthorized();
  let productsByCategory = useSelector(
    (state) => state.categoryReducer.productsByCategory
  );

  useEffect(() => {
    dispatch(getProductsByCategory(nameCategory));
    if (validate) {
      const user = decodeToken();
      const username = user.username;
      dispatch(getWishlist({ username }));
    }
  }, [dispatch, nameCategory]);

  // PARA ORDENAR
  if (attribute === "name" && order === "asc") {
    //ordenar alfabeticamente de A a Z
    productsByCategory = productsByCategory.sort(function (a, b) {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });
  } else if (attribute === "name" && order === "desc") {
    // ordenar alfabeticamente de la Z a la A
    productsByCategory = productsByCategory.sort(function (a, b) {
      if (b.name > a.name) {
        return 1;
      }
      if (b.name < a.name) {
        return -1;
      }
      return 0;
    });
  } else if (attribute === "price" && order === "asc") {
    // ordenar por rating del menor a mayor
    productsByCategory = productsByCategory.sort((a, b) => a.price - b.price);
  } else if (attribute === "price" && order === "desc") {
    // ordenar por rating de mayor a menor
    productsByCategory = productsByCategory.sort((a, b) => b.price - a.price);
  }

  return (
    <div>
      <div className={style.bar}>
        <Search />
        <Selects />
      </div>
      <Products products={productsByCategory} />
    </div>
  );
}
