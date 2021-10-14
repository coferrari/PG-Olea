import React, { useState, useEffect } from "react";
import { getAllOrder } from "./../../../cart/index";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

function OrdersTable() {
  const [order, setOrder] = useState();
  const getAllOrders = async () => {
    const orders = await getAllOrder();

    setOrder(orders.data);
  };

  console.log(order)

  useEffect(() => {
    getAllOrders();
  }, []);
  console.log(order);
  return (
    <div>
      {order === undefined ? (
        <h1>No hay ordenes activas</h1>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Usuario</th>
              <th>Contacto</th>
              <th>Teléfono</th>
              <th>Precio</th>
              <th>Estado de orden</th>
            </tr>
          </thead>
          <tbody>
            {order?.map((o) => {
              return (
                <tr>
                  <Link to={`/order/${o.id}`}>
                    <td>{o.id}</td>
                  </Link>
                  <td>{o.userUsername}</td>
                  <td>{o.contactName + " " + o.contactSurname}</td>
                  <td>{o.phone}</td>
                  <td>{o.price}</td>
                  <td>{o.status}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default OrdersTable;
