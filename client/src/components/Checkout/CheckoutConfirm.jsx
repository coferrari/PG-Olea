import React, { useEffect } from "react";
import { useLocation} from 'react-router-dom';
import { getOrderDetails, changeStatus } from "../../order";

const CheckoutConfirm = () => {

const location = useLocation()
const datosPago = location.search.split("&")

//ESTADO DE PAGO
const status = datosPago[3].split("=")
const statusPago = status[1]


//ID DE LA ORDEN
const order = datosPago[4].split("=")
const idOrder = order[1]

let detalleOrden = {}

useEffect(() => {
  changeStatus(statusPago,idOrder)
  detalleOrden = getOrderDetails(idOrder)
},[])

  return (
    <div>{location.search && location.search.includes("collection_status=approved") ? (<div>El estado es {statusPago} y el id de la orden es {idOrder} </div>) : (<div>Algo no fue bien con el pago</div>) }

    </div>
  );
};
export default CheckoutConfirm;
