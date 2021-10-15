import React, { useState, useEffect } from "react";
import { getOrderDetails } from "../../order/index";
import { ListGroup, Button, Table, Card } from "react-bootstrap";
import style from "./orderdetail.module.css";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { useLocation, useHistory } from "react-router";
import { Link } from "react-router-dom";

function OrderDetail() {
  const [orderDetail, setOrderDetail] = useState();

  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const history = useHistory();

  const getOrderIds = async () => {
    const orderDetails = await getOrderDetails(id);
    setOrderDetail(orderDetails);
  };

  useEffect(async () => {
    getOrderIds();
  }, []);

  return (
    <div className={style.containerAll}>
      {!orderDetail ? (
        <div className={style.div}>
          <h1 className={style.h1}>Ups, no se encontró la orden</h1>
        </div>
      ) : (
        <div className="container">
          <ListGroup>
            {/* <ListGroup.Item variant="Dark">
              Orden Nro: {orderDetail.id}
            </ListGroup.Item> */}
            <ListGroup.Item>
              Usuario: {orderDetail.userUsername}{" "}
            </ListGroup.Item>
            <ListGroup.Item>
              Contacto:
              {orderDetail.contactName + " " + orderDetail.contactSurname}{" "}
            </ListGroup.Item>
            {/* <ListGroup.Item> Email: "Por ahora order ditails no trae el email" </ListGroup.Item> */}
            <ListGroup.Item>Tel: {orderDetail.phone}</ListGroup.Item>
            <ListGroup.Item>
              Fecha:{" "}
              {orderDetail.updatedAt
                .slice(0, 10)
                .split("-")
                .reverse()
                .join("-")}
            </ListGroup.Item>
            <ListGroup.Item>
              Estado del pago: {orderDetail.statusPago}
            </ListGroup.Item>
            <ListGroup.Item>
              Estado del pedido: {orderDetail.status}
            </ListGroup.Item>
            <ListGroup.Item>
              Monto del pedido: ${orderDetail.price}
            </ListGroup.Item>
            <ListGroup.Item>Envío : {orderDetail.address}</ListGroup.Item>
            {/* <ListGroup.Item>Estado del pago: {orden.statusPago}</ListGroup.Item>
            {orden.address !== "" ? (
              <ListGroup.Item>Dirección: {orden.address}</ListGroup.Item>
            ) : (
              <ListGroup.Item>Retiro por local</ListGroup.Item>
            )}
            <ListGroup.Item>
              Productos: {orden.products?.map((p) => p.name + ", ")}
            </ListGroup.Item>
            <ListGroup.Item>Total: ${orden.price}</ListGroup.Item> */}
          </ListGroup>
          <Card>
            <Card.Header> Productos de la Orden </Card.Header>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Reseñas</th>
                </tr>
              </thead>
              <tbody>
                {orderDetail.products?.map((o) => {
                  return (
                    <tr>
                      <td>{o.name}</td>
                      <td>{o.Order_Products.quantity}</td>
                      <td>{o.price}</td>
                      <td>
                        <Link to={`/createreview/${o.id}`}>Dejar reseña</Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Card>
          <Button variant="dark" onClick={() => history.push("/account")}>
            Volver
          </Button>
        </div>
      )}
    </div>
  );
}

export default OrderDetail;
