import React, { useState, useEffect } from "react";
import { updateCart } from "../../redux/actions/index";
import { useDispatch } from "react-redux";
import style from "./ItemCart.module.css";
import { Button } from "react-bootstrap";
import { isAuthorized, decodeToken } from "../../utils/index";
import { addOrEditCart, removeProductCart } from "../../cart/index";
import { format } from "../../utils/index";

const ItemCart = ({
  id,
  name,
  image,
  price,
  quantity,
  stock,
  descuentoProducto,
  diaDescuentoCategoria,
  diaDescuentoProducto,
  descuentoCategoria,
  categories,
}) => {
  const dispatch = useDispatch();
  const [remove, setRemove] = useState(false);
  const validate = isAuthorized();
  const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart"));

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
  // me va actualizando las cantidades del carrito
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartFromLocalStorage));
    dispatch(updateCart(cartFromLocalStorage));

    return () => {};
  }, [q]);

  useEffect(() => {
    if (remove) {
      const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart"));
      const cartRemoved = cartFromLocalStorage.filter(
        (product) => product.id !== id
      );
      localStorage.setItem("cart", JSON.stringify(cartRemoved));
      dispatch(updateCart(cartRemoved));
      return () => {
        localStorage.setItem("cart", JSON.stringify(cartRemoved));
        setRemove(false);
      };
    }
  }, [remove]);

  const handleAddOne = async (e) => {
    e.preventDefault();
    setQ(q + 1);
    if (validate) {
      const user = decodeToken();
      const username = user.username;
      addOrEditCart({
        productID: id,
        quantity: quantity + 1,
        username: username,
      });
    }
  };

  const handleRemoveOne = (e) => {
    e.preventDefault();
    setQ(q - 1);
    if (validate) {
      const user = decodeToken();
      const username = user.username;
      addOrEditCart({
        productID: id,
        quantity: quantity - 1,
        username: username,
      });
    }
  };

  const handleRemoveItem = (e) => {
    e.preventDefault();
    setRemove(true);
    if (validate) {
      const user = decodeToken();
      const username = user.username;
      removeProductCart({
        productID: id,
        username: username,
      });
    }
  };

  var now = new Date().toLocaleDateString();
  var precio = parseInt(price);

  return (
    <div className={style.container}>
      <div>
        {Array.isArray(image) ? (
          <div className={style.containerimg}>
            <img className={style.img} src={image[0]} alt={image[0]} />
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
        <p className={style.stock}>* {stock} en stock</p>
        <div className={style.btncontainer}>
          <Button
            className={style.btn}
            variant="dark"
            type="submit"
            disabled={q === 1 ? true : false}
            onClick={(e) => handleRemoveOne(e)}
          >
            -
          </Button>
          <Button className={style.btn} variant="dark" type="submit">
            {q ? q : cartFromLocalStorage[index].Carrito_Products.quantity}
          </Button>
          <Button
            className={style.btn}
            variant="dark"
            type="submit"
            disabled={q === stock ? true : false}
            onClick={(e) => handleAddOne(e)}
          >
            +
          </Button>
          <div>
            <button
              onClick={(e) => handleRemoveItem(e)}
              className={style.delete}
            >
              eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCart;
