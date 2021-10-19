import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router";
import { getCategories } from "../../redux/actions";
import style from "./Selects.module.css";

export default function Selects() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = useLocation();
  const path = pathname.split("/")[1];
  const { nameCategory } = useParams();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleOrderSelect = function (order) {
    order = order.split(" ");
    if (path === "home") {
      history.push(`/home/${order[0]}/${order[1]}`);
    }
    if (path === "category") {
      history.push(`/category/${nameCategory}/${order[0]}/${order[1]}`);
    }
  };

  return (
    <div>
      <select
        className={style.select}
        onChange={(e) => handleOrderSelect(e.target.value)}
      >
        <option value="" selected disabled hidden>
          Ordenar por...
        </option>
        <option value={"name asc"}>Alfabeticamente, A-Z</option>
        <option value={"name desc"}>Alfabeticamente, Z-A</option>
        <option value={"price desc"}>precio, mayor a menor</option>
        <option value={"price asc"}>precio, menor a mayor</option>
      </select>
    </div>
  );
}
