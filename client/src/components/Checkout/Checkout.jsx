import React from "react";
import ItemsCart from "../ItemsCart/ItemsCart";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import Data from "./CheckoutData/CheckoutData";
import Delivery from "./CheckoutDelivery/CheckoutDelivery";
import Payment from "./CheckoutPayment/CheckoutPayment";
import { decodeToken, isAuthorized } from "../../utils";

const Checkout = () => {
    const sesionIniciada = isAuthorized();
    const datosLogin = decodeToken();
    return <div>
        {sesionIniciada === true ? (
            <div>
                <Data datosLogin={datosLogin} />
                <Delivery />
                <Payment />
                <ItemsCart />
            </div>
        ) : <h2>Para seguir con la compra debes Iniciar Sesion</h2>}
        </div>
}
export default Checkout;