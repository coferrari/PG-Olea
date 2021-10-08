import React, { useState } from "react";
import { useHistory } from "react-router-dom";

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
        type="text"
        name="name"
        value={input.name}
        placeholder="Ingrese un producto..."
        onChange={handleChange}
      />
      <button onClick={handleClick}>Buscar</button>
    </div>
  );
}
