import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getToken } from "../../utils/index";
import { getUsers } from "../../auth/users";

export default function Recommendend() {
  const [users, setUsers] = useState();
  const [productsRecommended, setProductsRecommended] = useState([]);
  const products = useSelector((state) => state.productsReducer.products);
  const get = async () => {
    const use = await getUsers(getToken());
    setUsers(use);
  };

  useEffect(() => {
    get();
    productsFiltersRecommended();
  }, []);

  const recommendend = (almacen, cosmetica, decoracion) => {};

  const productsFiltersRecommended = (cat) => {
    const filt = products.filter((e) => cat === e.categories[0].nameCategory);
    setProductsRecommended(filt);
  };

  return (
    <div>
      {productsRecommended?.map((e) => {
        return <div>{e.name}</div>;
      })}
    </div>
  );
}
