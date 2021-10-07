import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getCategories } from "../../../../redux/actions";

export default function CategoriasTable() {
  const dispatch = useDispatch();
  const history = useHistory();
  const categories = useSelector((state) => state.categoryReducer.categories);
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  return (
    <div>
      <h1>hola</h1>
    </div>
  );
}
