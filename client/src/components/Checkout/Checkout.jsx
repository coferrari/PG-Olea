import React from "react";
import ItemsCart from "../ItemsCart/ItemsCart";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import Data from "./CheckoutData/CheckoutData";
import Delivery from "./CheckoutDelivery/CheckoutDelivery";
import Payment from "./CheckoutPayment/CheckoutPayment";

const Checkout = ()=>{
    return <div>
        <Data />
        <Delivery/>
        <Payment/>
        <div><ShoppingCart /></div>
    </div>

}
export default Checkout;