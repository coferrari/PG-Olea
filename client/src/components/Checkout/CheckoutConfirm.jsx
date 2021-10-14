import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { getOrderDetails, changeStatus } from "../../order";
import { ListGroup, Button } from "react-bootstrap";

const CheckoutConfirm = () => {
  const location = useLocation();
  const history = useHistory();
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
    getOrden();
  }, []);

  function onClick() {
    history.push("/home");
  }

  console.log(orden);

  return (
    <div>
      {location.search &&
      location.search.includes("collection_status=approved") ? (
        <div>
          <ListGroup>
            <ListGroup.Item variant="success">
              Compra procesada con éxito!
            </ListGroup.Item>
            <ListGroup.Item>
              Cliente: {orden.contactName + " " + orden.contactSurname}
            </ListGroup.Item>
            <ListGroup.Item>Tel: {orden.phone}</ListGroup.Item>
            <ListGroup.Item>Fecha: {orden.date}</ListGroup.Item>
            <ListGroup.Item>ID de compra: {idOrder} </ListGroup.Item>
            <ListGroup.Item>Status: {orden.statusPago}</ListGroup.Item>
            {orden.address !== "" ? (
              <ListGroup.Item>Dirección: {orden.address}</ListGroup.Item>
            ) : (
              <ListGroup.Item>Retiro por local</ListGroup.Item>
            )}
            <ListGroup.Item>
              Productos: {orden.products?.map((p) => p.name + ", ")}
            </ListGroup.Item>
            <ListGroup.Item>Total: ${orden.price}</ListGroup.Item>
          </ListGroup>
          <Button variant="dark" onClick={onClick}>
            Volver
          </Button>
        </div>
      ) : (
        <div>
          Algo salió mal con el pago
          <Button variant="dark" onClick={onClick}>
            Dark
          </Button>
        </div>
      )}
    </div>
  );

  //   address: ""
  // contactName: "Dylan"
  // contactSurname: "Gavilan"
  // createdAt: "2021-10-14T15:58:35.961Z"
  // date: "2001-10-14T03:00:00.000Z"
  // id: 1
  // phone: "11111111"
  // price: "5405"
  // products: (5) [{…}, {…}, {…}, {…}, {…}]
  // status: "creada"
  // statusPago: "pendiente"
  // updatedAt: "2021-10-14T15:58:36.043Z"
  // userUsername: "dylan"

  // return (
  //   <div>
  //     {location.search &&
  //     location.search.includes("collection_status=approved") ? (
  //       <div>
  //         El estado es {statusPago} y el id de la orden es {idOrder}{" "}
  //       </div>
  //     ) : (
  //       <div>Algo no fue bien con el pago</div>
  //     )}
  //   </div>
  // );
};
export default CheckoutConfirm;
