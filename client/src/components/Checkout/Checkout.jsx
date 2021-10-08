import React from "react";
import Data from "./CheckoutData/CheckoutData";
import Delivery from "./CheckoutDelivery/CheckoutDelivery";
import Details from "./CheckoutDetail/CheckoutDetail";
import { decodeToken, isAuthorized } from "../../utils";
import{ Button} from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { checkoutMercadoPago } from "../../redux/actions";
import style from "./Checkout.module.css";


const Checkout = () => {
  const history = useHistory();
  const sesionIniciada = isAuthorized();
  const datosLogin = decodeToken();
  const dispatch = useDispatch();
  let linkDePago = useSelector((state) => state.carritoReducer.linkPago)

  const itemsCheckout = useSelector(
    (state) => state.carritoReducer.productsCarrito
  );

  const handleConfirmOrder = async (e) => {
    e.preventDefault();
    dispatch(checkoutMercadoPago(itemsCheckout));
    console.log(linkDePago)

    //este handler nos llena el estado de link de pago (no redirecciona)
  };

  return (
    <div>
      {sesionIniciada === true ? (
        <div className={style.checkoutContainer}>
          <Data datosLogin={datosLogin} />
          <Delivery />
          <Details />
          <div className={style.buttonConfirmarCompra}>
          <Button variant="dark" onClick={(e) => handleConfirmOrder(e)}>Confirmar la compra</Button>
          {linkDePago && ((confirmAlert({
            title: "Atención",
            message: "Usted será redirigido al checkout de Mercado Pago",
            buttons: [
              {
                label: "Aceptar",
                onClick: () => {
                  window.open(linkDePago)
                  window.location.href=""
                },
              },
              {
                label: "Volver",
                onClick: () => {window.location.href=""},
              },
            ],
          })))}
          </div>
        </div>
      ) : (
        <div>
          {confirmAlert({
            title: "No iniciaste sesión",
            message:
              "Para continuar con tu compra debes registrarte o iniciar sesión",
            buttons: [
              {
                label: "Iniciar Sesión",
                onClick: () => history.push("/login"),
              },
              {
                label: "Registrarse",
                onClick: () => history.push("/register"),
              },
              {
                label: "Inicio",
                onClick: () => history.push("/"),
              },
            ],
          })}
        </div>
      )}
    </div>
  );
};
export default Checkout;
