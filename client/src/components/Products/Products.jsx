import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions/index";
import { Product } from "../Product/Product";
import styles from "./Products.module.css";

export default function Products({ products }) {
  return (
    <div className={styles.container}>
      {/* <div className={styles.gallerycolums}> */}
        {products?.map((p) => {
          return (
            <Product
              id={p.id}
              name={p.name}
              image={p.image[0]}
              price={p.price}
            />
          );
        })}
      {/* </div> */}
    </div>
  );
}
