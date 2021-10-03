import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Offcanvas } from "react-bootstrap";
import ItemsCart from "../ItemsCart/ItemsCart";
import { clearCart } from "../../redux/actions/index";

const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");

const ShoppingCart = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  const [cart, setCart] = useState(cartFromLocalStorage);

  const dispatch = useDispatch();

  const productsCart = useSelector(
    (state) => state.carritoReducer.productsCarrito
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleClearCart = (e) => {
    e.preventDefault();
    localStorage.clear();
    dispatch(clearCart());
  };

  return (
    <>
      <Button variant="primary" onClick={toggleShow} className="me-2">
        Carrito
      </Button>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Carrito</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ItemsCart />
          {productsCart.length !== 0 ? (
            <div>
              <div>total</div>
              <div>
                <Button
                  onClick={(e) => handleClearCart(e)}
                  variant="dark"
                  type="submit"
                >
                  vaciar carrito
                </Button>
              </div>
              <div>
                <Button variant="dark" type="submit">
                  Checkout!
                </Button>
              </div>
            </div>
          ) : (
            <div>Agrega items al carrito!</div>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default ShoppingCart;
