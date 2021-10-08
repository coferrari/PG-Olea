import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { getCategories } from "../../redux/actions";

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
    <select onChange={(e) => handleOrderSelect(e.target.value)}>
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
    </select>
    </div>
  );
}
