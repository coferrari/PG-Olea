import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { decodeToken, getToken } from "../../utils/index";
import { getUsers } from "../../auth/users";

export default function Recommendend() {
  const [users, setUsers] = useState();
  const [productsRecommended, setProductsRecommended] = useState([]);
  const products = useSelector((state) => state.productsReducer.products);
  const get = () => {
    const use = decodeToken();
    setUsers(use);
  };

  useEffect(async () => {
    get();
    recommendend(1, 2, 4);
  }, [products]);

  const recommendend = (almacen, cosmetica, decoracion) => {
    const arr = [
      { Almacen: almacen },
      { Cosmetica: cosmetica },
      { Decoracion: decoracion },
    ];
    const mayor = arr.sort((a, b) => {
      if (a < b) {
        return 1;
      } else {
        return -1;
      }
    });
    console.log(users, "aaa");
    const pri = Object.keys(mayor[0]);
    const sec = Object.keys(mayor[1]);
    const pre1 = productsFiltersRecommended(pri[0])?.slice(0, 3);
    const pre2 = productsFiltersRecommended(sec[0])?.slice(0, 3);
    const finale = pre1.concat(pre2);
    setProductsRecommended(finale);
  };

  const productsFiltersRecommended = (cat) => {
    return products.filter((e) => cat === e.categories[0].nameCategory);
  };
  console.log(productsRecommended, "aaa");

  return (
    <div>
      {productsRecommended?.map((e) => {
        return <div>{e.name}</div>;
      })}
    </div>
  );
}
