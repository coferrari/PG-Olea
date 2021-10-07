import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
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
        <option value={"name asc"}>Order by name: A-Z</option>
        <option value={"name desc"}>Order by name: Z-A</option>
        <option
          value={"price desc"}
          onChange={(e) => handleOrderSelect(e.target.name, e.target.value)}
        >
          Order by price: highest to lowest
        </option>
        <option value={"price asc"}>Order by price: lowest to highest</option>
      </select>
    </div>
  );
}
