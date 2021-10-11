import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { getCategories } from "../../redux/actions";
import style from "./Selects.module.css";

export default function Selects() {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleOrderSelect = function (order) {
    order = order.split(" ");
    history.push(`/home/${order[0]}/${order[1]}`);
  };

  return (
    <div>
      <select
        className={style.select}
        onChange={(e) => handleOrderSelect(e.target.value)}
      >
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
  );
}
