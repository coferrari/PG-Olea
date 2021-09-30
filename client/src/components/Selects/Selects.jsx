import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getCategories } from "../../redux/actions";

export default function Selects() {
  const dispatch = useDispatch();
  const history = useHistory();
  const categories = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  function handleCategorySelect(id) {
    history.push(`/category/${id}`);
  }

  const handleOrderSelect = function (order) {
    order = order.split(" ");
    history.push(`/home/${order[0]}/${order[1]}`);
  };

  return (
    <div>
      <select onChange={(e) => handleCategorySelect(e.target.value)}>
        <option disabled selected hidden>
          Category...
        </option>
        {categories?.map((c) => (
          <option value={c.id}>{c.nameCategory}</option>
        ))}
      </select>
      <select onChange={(e) => handleOrderSelect(e.target.value)}>
        <option disabled selected hidden>
          Select order...
        </option>
        <option value={"name asc"}>Order by name: A-Z</option>
        <option value={"name desc"}>Order by name: Z-A</option>
        <option
          value={"rating desc"}
          onChange={(e) => handleOrderSelect(e.target.name, e.target.value)}
        >
          Order by rating: highest to lowest
        </option>
        <option value={"rating asc"}>Order by rating: lowest to highest</option>
      </select>
    </div>
  );
}
