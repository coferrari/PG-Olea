import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Offcanvas } from "react-bootstrap";
import ItemsCart from "../ItemsCart/ItemsCart";
import { clearCart, updateCart } from "../../redux/actions/index";
import style from "./ShoppingCart.module.css";
import carrito from "../../img/iconshoppingcart.png";
import { useHistory } from "react-router";

const ShoppingCart = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");
  const [clear, setClear] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const productsCart = useSelector(
    (state) => state.carritoReducer.productsCarrito
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartFromLocalStorage));
  }, []);

  useEffect(() => {
    if (clear) {
      localStorage.setItem("cart", JSON.stringify([]));
      dispatch(updateCart([]));
    }
    return () => {
      setClear(false);
      localStorage.setItem("cart", JSON.stringify([]));
    };
  }, [clear]);

  const handleClearCart = (e) => {
    e.preventDefault();
    dispatch(clearCart());
    setClear(true);
  };

  const handleCheckout = (e) =>{
    e.preventDefault()
    history.push("/checkout")
  }

  const totalSum = productsCart?.reduce((acc, curr) => {
    return acc + parseInt(curr.price) * curr.quantity;
  }, 0);

  const totalQuantity = productsCart?.reduce((acc, curr) => {
    return acc + curr.quantity;
  }, 0);

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
    <>
      <button onClick={toggleShow} className={style.carrito}>
        <img src={carrito} />
      </button>
      {productsCart.length !== 0 && (
        <div className={style.itemcarrito}>
          <div className={style.qitems}>{totalQuantity}</div>
        </div>
      )}
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        scroll="true"
        backdrop="true"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className={style.title}>Carrito</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ItemsCart />
          {cartFromLocalStorage.length !== 0 ? (
            <div className={style.container}>
              <div className={style.continue}>
                <Button
                  className={style.shop}
                  variant="dark"
                  type="submit"
                  onClick={() => handleClose()}
                >
                  Seguir comprando
                </Button>
              </div>
              <div className={style.bntcontainer}>
                <div className={style.total}>total ${format(totalSum)}</div>
                <div>
                  <Button
                    className={style.vaciar}
                    onClick={(e) => handleClearCart(e)}
                    variant="dark"
                    type="submit"
                  >
                    vaciar carrito
                  </Button>
                </div>
              </div>

              <div>

                <Button className={style.checkout} variant="dark" type="submit" onClick={ e=> {handleCheckout(e)}} >
                  terminar compra
                </Button>
              </div>
            </div>
          ) : (
            <div className={style.add}>
              el carrito esta vacio
              <Button
                className={style.shop}
                variant="dark"
                type="submit"
                onClick={() => handleClose()}
              >
                agregar productos
              </Button>
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default ShoppingCart;
