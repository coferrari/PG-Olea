import React, { useState, useEffect } from "react";
import { getOrderDetails } from "../../order/index";
import { ListGroup, Button, Table, Card } from "react-bootstrap";
import { useLocation } from "react-router";
import CardHeader from "react-bootstrap/esm/CardHeader";

function OrderDetail() {
  const [orderDetail, setOrderDetail] = useState();

  const location = useLocation()
  const id = location.pathname.split("/")[2]

  const getOrderIds = async () => {
    const orderDetails = await getOrderDetails(id);
    setOrderDetail(orderDetails);
  };

  useEffect(async () => {
    getOrderIds();
  }, []);

  console.log(orderDetail)
  return (
    <div>
      {orderDetail === undefined ? (
        <h1>Ups, no se encontró la orden</h1>
      ) : (
        <div>
          <ListGroup>
            <ListGroup.Item variant="Dark">
              Orden Nro: {orderDetail.id}
            </ListGroup.Item>

            <ListGroup.Item> Usuario: {orderDetail.userUsername} </ListGroup.Item>
            <ListGroup.Item> Contacto: {orderDetail.contactName + " " + orderDetail.contactSurname} </ListGroup.Item>
            {/* <ListGroup.Item> Email: "Por ahora order ditails no trae el email" </ListGroup.Item> */}
            <ListGroup.Item>Tel: {orderDetail.phone}</ListGroup.Item>
            <ListGroup.Item>Fecha: {orderDetail.date.split("T")[0]}</ListGroup.Item>
            <ListGroup.Item>Estado del pago: {orderDetail.statusPago}</ListGroup.Item>
            <ListGroup.Item>Estado del pedido: {orderDetail.status}</ListGroup.Item>
            <ListGroup.Item>Monto del pedido: ${orderDetail.price}</ListGroup.Item>
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
                <th>id</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
            {orderDetail.products?.map((o) => {
              return (
                <tr>
                  <td>{o.id}</td>
                  <td>{o.name}</td>
                  <td>{o.Order_Products.quantity}</td>
                  <td>{o.price}</td>
                </tr>
              );
            })}
          </tbody>
          </Table>
          </Card>
          <Button variant="dark">
            Volver
          </Button>
        </div>
      )}
    </div>
  );
}

export default OrderDetail;
