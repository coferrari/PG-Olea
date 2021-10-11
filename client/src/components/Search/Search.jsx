import React, { useState } from "react";
import { useHistory } from "react-router";
import { GoSearch } from "react-icons/go";
import style from "./Search.module.css";

export function Search() {
  const history = useHistory();
  const [input, setInput] = useState({
    name: "",
  });

  const handleChange = function (e) {
    setInput({
      ...input,
      name: e.target.value,
    });
  };

  const handleClick = function () {
    history.push(`/search/${input.name}`);
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
        onClick={handleClick}
      >
        <GoSearch className={style.iconsearch} />
      </button>
    </div>
  );
}
