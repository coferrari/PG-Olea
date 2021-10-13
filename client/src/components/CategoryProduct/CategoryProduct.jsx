import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsByCategory, getWishlist } from "../../redux/actions";
import Products from "../Products/Products";
import { useParams, useHistory } from "react-router";
import { isAuthorized, decodeToken } from "../../utils/index";

export default function CategoryProduct() {
  const dispatch = useDispatch();
  const history = useHistory();
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

  const handleOrderSelect = function (order) {
    order = order.split(" ");
    history.push(`/category/${nameCategory}/${order[0]}/${order[1]}`);
  };

  return (
    <div>
      {/* <select onChange={(e) => handleOrderSelect(e.target.value)}>
    <option value="" selected disabled hidden>Ordenar por...</option>
      <option value={"name asc"}>Nombre: A-Z</option>
      <option value={"name desc"}>Nombre: Z-A</option>
      <option
        value={"price desc"}
        onChange={(e) => handleOrderSelect(e.target.name, e.target.value)}
      >
        Precio: más alto a más bajo
      </option>
      <option value={"price asc"}>Precio: más bajo a más alto</option>
    </select> */}
      <Products products={productsByCategory} />
    </div>
  );
}
