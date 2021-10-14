import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getOrderDetails, changeStatus } from "../../order";

const CheckoutConfirm = () => {
  const location = useLocation();
  const datosPago = location.search.split("&");

  //ESTADO DE PAGO
  const status = datosPago[3].split("=");
  const statusPago = status[1];

  //ID DE LA ORDEN
  const order = datosPago[4].split("=");
  const idOrder = order[1];

  const [orden, setOrden] = useState({});

  const getOrden = async () => {
    const x = await getOrderDetails(idOrder);
    setOrden(x);
  };

  useEffect(async () => {
    await changeStatus(statusPago, idOrder);
    // getOrden()
  }, []);

  console.log(orden);

  return (
    <div>
      {location.search &&
      location.search.includes("collection_status=approved") ? (
        <div>
          El estado es {statusPago} y el id de la orden es {idOrder}{" "}
        </div>
      ) : (
        <div>Algo no fue bien con el pago</div>
      )}
    </div>
  );
};
export default CheckoutConfirm;