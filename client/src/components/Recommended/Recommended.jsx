import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { decodeToken } from "../../utils/index";

import { Link } from "react-router-dom";
import styles from "./Recommended.module.css";

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
    recommendend(users?.almacen, users?.cosmetica, users?.decoracion);
  }, [products]);

  const recommendend = (almacen, cosmetica, decoracion) => {
    const arr = [
      { Almacen: almacen },
      { Cosmetica: cosmetica },
      { Decoracion: decoracion },
    ];
    const mayor = arr.sort((a, b) => {
      if (Object.values(a)[0] < Object.values(b)[0]) {
        return 1;
      } else {
        return -1;
      }
    });

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

  return (
    <div className={styles.container}>
      {users?.almacen === 0 && users?.cosmetica === 0 && users?.decoracion === 0
        ? null
        : productsRecommended?.map((e) => {
            return (
              <div key={e.id} className={styles.recommendations}>
                <a href="">
                  <Link to={`/product/${e.id}`}>
                    <div className={styles.containerimg}>
                      <img
                        src={e.image[0]}
                        alt="producto"
                        className={styles.imagen}
                      />
                    </div>
                  </Link>
                </a>
              </div>
            );
          })}
    </div>
  );
}
