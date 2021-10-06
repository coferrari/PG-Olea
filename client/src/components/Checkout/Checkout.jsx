import React from "react";
import ItemsCart from "../ItemsCart/ItemsCart";
import Data from "./CheckoutData/CheckoutData";
import Delivery from "./CheckoutDelivery/CheckoutDelivery";
import Details from "./CheckoutDetail/CheckoutDetail";
import { decodeToken, isAuthorized } from "../../utils";
import Button from "@restart/ui/esm/Button";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { checkoutMercadoPago } from "../../redux/actions";

const Checkout = () => {
    const history = useHistory();
    const sesionIniciada = isAuthorized();
    const datosLogin = decodeToken();
    const dispatch = useDispatch();

    const itemsCheckout = useSelector(state => state.carritoReducer.productsCarrito)
    console.log(itemsCheckout)

    const handlePay = (e) => {
      e.preventDefault()
      dispatch(checkoutMercadoPago(itemsCheckout))
      //acá va la action de pagar
    }

    return <div>
        {sesionIniciada === true ? (
            <div>
                <Data datosLogin={datosLogin} />
                <Delivery />
                <Details/>
                <Button onClick={e => handlePay(e)}>Pagar</Button>
            </div>
        ) : <div>{confirmAlert ({
            title: "No iniciaste sesión",
            message: "Para continuar con tu compra debes registrarte o iniciar sesión",
            buttons: [
                {
                  label: "Iniciar Sesión",
                  onClick: () => history.push("/login")
                },
                {
                  label: "Registrarse",
                  onClick: () => history.push("/register"),
                },
                {
                  label: "Inicio",
                  onClick: () => history.push("/"),
                },
              ],})}
        </div>}
    </div>
}
export default Checkout;