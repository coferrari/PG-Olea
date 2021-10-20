import React, { useState } from "react";
import style from "./ItemCheckout.module.css";
import { format } from "../../../utils/index.js";

const ItemCheckout = ({
  name,
  image,
  price,
  quantity,
  categories,
  descuentoProducto,
  diaDescuentoProducto,
  descuentoCategoria,
  diaDescuentoCategoria,
  id,
}) => {
  const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart"));
  var now = new Date().toLocaleDateString();
  const index = cartFromLocalStorage?.findIndex(
    (product) => product.id === parseInt(id)
  );
  const [q, setQ] = useState(
    quantity || cartFromLocalStorage[index].Carrito_Products.quantity
  );
  if (index >= 0) {
    cartFromLocalStorage[index].quantity = q;
  }
  if (index >= 0) {
    var descuentoCategoriaBD =
      cartFromLocalStorage[index].categories?.[0].offer;
    var diaDescuentoCategoriaBD =
      cartFromLocalStorage[index].categories?.[0].offerday;
    var descuentoProductoBD = cartFromLocalStorage[index].offer;
    var diaDescuentoProductoBD = cartFromLocalStorage[index].offerday;
  }
  var precio = parseInt(price);
  return (
    <div className={style.container}>
      <div>
        {Array.isArray(image) ? (
          <div className={style.containerimg}>
            <img className={style.img} src={image[0]} alt={image[0]}/>
          </div>
        ) : (
          <div className={style.containerimg}>
            <img className={style.img} src={image} alt={image} />
          </div>
        )}
      </div>
      <div className={style.details}>
        <h4 className={style.name}>{name}</h4>
        <p className={style.price}>
          ${" "}
          {q ? (
            now === diaDescuentoProducto || now === diaDescuentoCategoria ? (
              descuentoProducto > descuentoCategoria ? (
                <span className={style.descuento}>
                  {format(
                    precio * q -
                      Math.round((precio * descuentoProducto) / 100) * q
                  )}
                </span>
              ) : (
                <span className={style.descuento}>
                  {format(
                    precio * q -
                      Math.round((precio * descuentoCategoria) / 100) * q
                  )}
                </span>
              )
            ) : (
              format(precio * q)
            )
          ) : now === diaDescuentoProductoBD ||
            now === diaDescuentoCategoriaBD ? (
            descuentoProductoBD > descuentoCategoriaBD ? (
              <span className={style.descuento}>
                {format(
                  precio *
                    cartFromLocalStorage[index].Carrito_Products.quantity -
                    Math.round((precio * descuentoProductoBD) / 100) *
                      cartFromLocalStorage[index].Carrito_Products.quantity
                )}
              </span>
            ) : (
              <span className={style.descuento}>
                $
                {format(
                  precio *
                    cartFromLocalStorage[index].Carrito_Products.quantity -
                    Math.round((precio * descuentoCategoriaBD) / 100) *
                      cartFromLocalStorage[index].Carrito_Products.quantity
                )}
              </span>
            )
          ) : (
            format(
              precio * cartFromLocalStorage[index].Carrito_Products.quantity
            )
          )}
        </p>
        <p className={style.price}>Cantidad: {quantity}</p>
      </div>
    </div>
  );
};

export default ItemCheckout;
