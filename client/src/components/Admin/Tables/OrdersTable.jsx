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

  useEffect(() => {
    getAllOrders();
  }, []);
  return (
    <div>
      {order === undefined ? (
        <h1>No hay ordenes activas</h1>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Precio</th>
              <th>Estado</th>
              <th>Usuario</th>
            </tr>
          </thead>
          <tbody>
            {order?.map((o) => {
              return (
                <tr>
                  <Link to={`/order/${o.id}`}>
                    <td>{o.id}</td>
                  </Link>
                  <td>{o.price}</td>
                  <td>{o.status}</td>
                  <td>{o.username}</td>
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
