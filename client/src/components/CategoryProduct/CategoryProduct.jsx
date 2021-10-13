import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsByCategory, getCategories } from "../../redux/actions";
import Products from "../Products/Products";
import { useParams, useHistory } from "react-router";
import style from "../Selects/Selects.module.css";
import { Search } from "../Search/Search";
import style2 from "./CategoryProducts.module.css";

export default function CategoryProduct() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { nameCategory, attribute, order } = useParams();
  let productsByCategory = useSelector(
    (state) => state.categoryReducer.productsByCategory
  );

  useEffect(() => {
    dispatch(getProductsByCategory(nameCategory));
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


  const handleOrderSelect = function (order) {
    order = order.split(" ");
    history.push(`/category/${nameCategory}/${order[0]}/${order[1]}`);
  };

  return (
    <div>
      <div className={style2.bar}>
      <Search />
      <div>
      <select
        className={style.select}
        onChange={(e) => handleOrderSelect(e.target.value)}
      >
        <option value="" selected disabled hidden>Ordenar por...</option>
        <option value={"name asc"}>Alfabeticamente, A-Z</option>
        <option value={"name desc"}>Alfabeticamente, Z-A</option>
        <option
          value={"price desc"}
          onChange={(e) => handleOrderSelect(e.target.name, e.target.value)}
        >
          precio, mayor a menor
        </option>
        <option value={"price asc"}>precio, menor a mayor</option>
      </select>
      </div>
      </div>
  <Products products={productsByCategory} />
  </div>
  );
}
