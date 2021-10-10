import React, { useState, useEffect } from "react";
import { getOrderId } from "../../cart/index";
import Table from "react-bootstrap/Table";

function OrderDetail() {
  const [orderDetail, setOrderDetail] = useState();
  const getOrderIds = async () => {
    const orderDetails = await getOrderId();

    setOrderDetail(orderDetails.data);
  };
  useEffect(() => {
    getOrderIds();
  }, []);
  return (
    <div>
      {orderDetail === undefined ? (
        <h1>no hay nada</h1>
      ) : (
        <h1>agregar detalles</h1>
      )}
    </div>
  );
}

export default OrderDetail;
