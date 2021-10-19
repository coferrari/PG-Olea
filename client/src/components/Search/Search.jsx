import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { GoSearch } from "react-icons/go";
import style from "./Search.module.css";
import { useDispatch } from "react-redux";
import { getProductsFiltered, getCategoriesFiltered } from "../../redux/actions/index";

export function Search() {
  const [input, setInput] = useState({
    name: "",
  });
  const dispatch = useDispatch();
  const {pathname} = useLocation();
  const path = pathname.split('/')[1]

  useEffect(() => {
    if (path === "home") {
      dispatch(getProductsFiltered(input.name))
    }
    if (path === "category") {
      dispatch(getCategoriesFiltered(input.name))
    }
  }, [dispatch, input.name, path])

  const handleChange = function (e) {
    setInput({
      ...input,
      name: e.target.value,
    });
  };

  return (
    <div>
      <input
        className={style.search}
        type="text"
        name="name"
        value={input.name}
        placeholder="buscar..."
        onChange={handleChange}
      />
      <button
        disabled={!input.name ? true : false}
        className={style.bntsearch}
      >
        <GoSearch className={style.iconsearch} />
      </button>
    </div>
  );
}
