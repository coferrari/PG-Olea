import React from "react";
import ItemsCart from "../ItemsCart/ItemsCart";
import Data from "./CheckoutData/CheckoutData";
import Delivery from "./CheckoutDelivery/CheckoutDelivery";
import Payment from "./CheckoutPayment/CheckoutPayment";
import { decodeToken, isAuthorized } from "../../utils";
import Button from "@restart/ui/esm/Button";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { useHistory } from "react-router";

const Checkout = () => {
    const history = useHistory();
    const sesionIniciada = isAuthorized();
    const datosLogin = decodeToken();
    return <div>
        {sesionIniciada === true ? (
            <div>
                <Data datosLogin={datosLogin} />
                <Delivery />
                <Payment />
                <ItemsCart />
                <Button>Finalizar Compra</Button>
            </div>
        ) : <div>{confirmAlert ({
            title: "No iniciaste sesión",
            message: "Para continuar con tu compra debes registrarte o iniciar sesión, si ya lo hiciste",
            buttons: [
                {
                  label: "Iniciar Sesión",
                  onClick: () => history.push("/login")
                },
                {
                  label: "Registrarse",
                  onClick: () => history.push("/register"),
                },
              ],})}
        </div>}
    </div>
}
export default Checkout;