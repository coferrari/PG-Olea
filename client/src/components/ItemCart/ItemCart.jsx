import React, { useState, useEffect } from "react";
import { updateCart } from "../../redux/actions/index";
import { useDispatch } from "react-redux";
import style from "./ItemCart.module.css";
import { Button } from "react-bootstrap";
import { isAuthorized, decodeToken } from "../../utils/index";
import { addOrEditCart, removeProductCart } from "../../cart/index";

const ItemCart = ({ id, name, image, price, quantity }) => {
  const dispatch = useDispatch();
  const [remove, setRemove] = useState(false);
  const validate = isAuthorized();
  const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart"));

  const index = cartFromLocalStorage?.findIndex(
    (product) => product.id === parseInt(id)
  );
  const [q, setQ] = useState(quantity || cartFromLocalStorage[index].Carrito_Products.quantity);
  if (index >= 0) {
    cartFromLocalStorage[index].quantity = q;
  }

  // me va actualizando las cantidades del carrito
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartFromLocalStorage));
    dispatch(updateCart(cartFromLocalStorage));

    return () => {};
  }, [dispatch, q, cartFromLocalStorage]);

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
  }, [dispatch, id, remove]);

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

  // controlar stock??
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

  const format = (num) => {
    num = num + "";
    var str = "";
    for (var i = num.length - 1, j = 1; i >= 0; i--, j++) {
      if (j % 3 === 0 && i !== 0) {
        str += num[i] + ".";
        continue;
      }
      str += num[i];
    }
    return str.split("").reverse().join("");
  };

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
        <p className={style.price}>$ {q ? format(price * q) : format(price * cartFromLocalStorage[index].Carrito_Products.quantity)}</p>
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
