import React from "react";
import style from "./ItemCheckout.module.css";

const ItemCheckout = ({ name, image, price, quantity }) => {

  return (
    <div className={style.container}>
      <div>
        {Array.isArray(image) ? (
          <div className={style.containerimg}>
            <img className={style.img} src={image[0]} />
          </div>
        ) : (
          <div className={style.containerimg}>
            <img className={style.img} src={image} />
          </div>
        )}
      </div>
      <div className={style.details}>
        <h4 className={style.name}>{name}</h4>
        <p className={style.price}>$ {(price * quantity)}</p>
        <p className={style.price}>Cantidad {quantity}</p>
        <div className={style.btncontainer}>
        </div>
      </div>
    </div>
  );
};

export default ItemCheckout;