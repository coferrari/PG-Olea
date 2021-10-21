import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { getOrderDetails, changeStatus } from "../../order";
import { ListGroup, Button, Spinner } from "react-bootstrap";
import style from "./CheckoutConfirm.module.css";
import styles from "../OrderDetail/orderdetail.module.css";

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



  return (
    <div>
      {!orden.email ? (
        <div>
           <Spinner className={style.spinner} animation="grow" variant="secondary" />
        </div>
      ) : location.search &&
        location.search.includes("collection_status=approved") ? (
        <div className="container">
          <ListGroup>
            <ListGroup.Item variant="success">
              Compra procesada con éxito!
            </ListGroup.Item>
            <ListGroup.Item>
              Cliente: {orden.contactName + " " + orden.contactSurname}
            </ListGroup.Item>
            <ListGroup.Item>Tel: {orden.phone}</ListGroup.Item>
            <ListGroup.Item>
              Fecha:{" "}
              {orden.updatedAt.slice(0, 10).split("-").reverse().join("-")}
            </ListGroup.Item>
            <ListGroup.Item>ID de compra: {idOrder} </ListGroup.Item>
            <ListGroup.Item>Estado del pago: Aprobada</ListGroup.Item>
            {orden.address !== "" ? (
              <ListGroup.Item>Dirección: {orden.address}</ListGroup.Item>
            ) : (
              <ListGroup.Item>Retiro por local : {orden.local}</ListGroup.Item>
            )}
            <ListGroup.Item>
              Productos: {orden.products?.map((p) => p.name + ", ")}
            </ListGroup.Item>
            <ListGroup.Item>
              {" "}
              {orden.info === "en-espera"
                ? "Envio a domicilio"
                : "Retira por local"}{" "}
            </ListGroup.Item>
            <ListGroup.Item>Total: ${orden.price}</ListGroup.Item>
          </ListGroup>
          <Button className="container" variant="dark" onClick={onClick}>
            Volver
          </Button>
        </div>
      ) : (
        <div className="container">
          <ListGroup>
            <ListGroup.Item variant="danger">
              Algo pasó con el pago de tu orden!
            </ListGroup.Item>
            <ListGroup.Item>
              Cliente: {orden.contactName + " " + orden.contactSurname}
            </ListGroup.Item>
            <ListGroup.Item>Tel: {orden.phone}</ListGroup.Item>
            <ListGroup.Item>
              Fecha:{" "}
              {orden.updatedAt.slice(0, 10).split("-").reverse().join("-")}
            </ListGroup.Item>
            <ListGroup.Item>ID de compra: {idOrder} </ListGroup.Item>
            <ListGroup.Item>Estado del pago: Rechazado</ListGroup.Item>
            {orden.address !== "" ? (
              <ListGroup.Item>Dirección: {orden.address}</ListGroup.Item>
            ) : (
              <ListGroup.Item>Retiro por local: {orden.local}</ListGroup.Item>
            )}
            <ListGroup.Item>
              Productos: {orden.products?.map((p) => p.name + ", ")}
            </ListGroup.Item>
            <ListGroup.Item>
              {" "}
              {orden.info === "en-espera"
                ? "Envio a domicilio"
                : "Retira por local"}{" "}
            </ListGroup.Item>
            <ListGroup.Item>Total: ${orden.price}</ListGroup.Item>
          </ListGroup>
          <Button className="container" variant="dark" onClick={onClick}>
            Volver
          </Button>
        </div>
      )}
    </div>
  );
};
export default CheckoutConfirm;
