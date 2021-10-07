import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../../redux/actions";

export default function CategoriasTable() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categoryReducer.categories);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  console.log(categories);
  return (
    <div>
      <h1>hola</h1>
    </div>
  );
}
