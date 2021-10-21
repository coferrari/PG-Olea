import React, { useEffect } from "react";
import Products from "../Products/Products";
import Selects from "../Selects/Selects";
import { Search } from "../Search/Search";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, getWishlist, clearProducts } from "../../redux/actions/index";
import { useParams, useLocation } from "react-router";
import style from "./Home.module.css";
import { isAuthorized, decodeToken } from "../../utils/index";

const Home = () => {
  const dispatch = useDispatch();
  let products = useSelector((state) => state.productsReducer.products);
  const { attribute, order } = useParams();
  const validate = isAuthorized();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/home") {
      dispatch(getProducts());
    }
    if (validate) {
      const user = decodeToken();
      const username = user.username;
      dispatch(getWishlist({ username }));
    }
    return () => {
      dispatch(clearProducts());
    };
  }, [dispatch]);

  // PARA ORDENAR
  if (attribute === "name" && order === "asc") {
    //ordenar alfabeticamente de A a Z
    products = products.sort(function (a, b) {
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
    products = products.sort(function (a, b) {
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
    products = products.sort((a, b) => a.price - b.price);
  } else if (attribute === "price" && order === "desc") {
    // ordenar por rating de mayor a menor
    products = products.sort((a, b) => b.price - a.price);
  }

  return (
    <div>
      <div className={style.bar}>
        <Search />
        <Selects />
      </div>
      <Products products={products} />
    </div>
  );
};
export default Home;
