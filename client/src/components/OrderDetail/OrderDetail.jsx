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

  useEffect(() => {
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
            <ListGroup.Item>
              Usuario: {orderDetail.userUsername}{" "}
            </ListGroup.Item>
            <ListGroup.Item>
              Contacto:
              {orderDetail.contactName + " " + orderDetail.contactSurname}{" "}
            </ListGroup.Item>
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
            <ListGroup.Item>Envío: {orderDetail.address}</ListGroup.Item>
            <ListGroup.Item>
              Retiro por local: {orderDetail.local}
            </ListGroup.Item>
          </ListGroup>
          <Card>
            <Card.Header> Productos de la Orden </Card.Header>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>ID Producto</th>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Reseñas</th>
                </tr>
              </thead>
              <tbody>
                {orderDetail.products?.map((o) => {
                  return (
                    <tr key={o.id}>
                      <td>
                        <Link to={`/product/${o.id}`}>{o.id}</Link>
                      </td>
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
