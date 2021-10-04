import React from "react";
import Data from "./CheckoutData/CheckoutData";
import Delivery from "./CheckoutDelivery/CheckoutDelivery";
import Payment from "./CheckoutPayment/CheckoutPayment";

const Checkout = ()=>{
    return <div>
        <Data />
        <Delivery/>
        <Payment/>
        <div>Detalle del carrito</div>
    </div>

}
export default Checkout;