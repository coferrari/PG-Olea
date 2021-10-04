import React, { useEffect } from "react";
import Products from "../Products/Products";
import Selects from "../Selects/Selects";
import { Search } from "../Search/Search";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions/index";
import { useParams } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  let products = useSelector((state) => state.productsReducer.products);
  const { attribute, order } = useParams();

  useEffect(() => {
    dispatch(getProducts());
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
      <Search />
      <Selects />
      <Products products={products} />
    </div>
  );
}
