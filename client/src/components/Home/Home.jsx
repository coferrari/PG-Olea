import React from "react";
import Products from "../Products/Products";
import Selects from "../Selects/Selects";

export default function Home() {
  return (
    <div>
      <div>
        <Selects />
      </div>
      <div>
        <Products />
      </div>
    </div>
  );
}
