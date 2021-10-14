import React from "react";
import { Product } from "../Product/Product";
import styles from "./Products.module.css";

export default function Products({ products }) {
  return (
    <div className={styles.center}>
      <div className={styles.container}>
        {products?.map((p) => {
          console.log(p.categories[0].offer);
          return (
            <Product
              key={p.id}
              id={p.id}
              name={p.name}
              image={p.image[0]}
              price={p.price}
              stock={p.stock}
              categories={p.categories}
              offer={p.offer}
              offerday={p.categories[0].offerday}
              categoryOff={p.categories[0].offer}
              productOff={p.offerday}
            />
          );
        })}
      </div>
    </div>
  );
}
