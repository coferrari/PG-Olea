import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getUserOrder } from "../../order";
import { Table, Button } from "react-bootstrap";
import { decodeToken } from "../../utils";

const UserOrders = () => {
  const history = useHistory();
  const [userOrders, setUserOrders] = useState();
  const getOrden = async () => {
    const user = decodeToken();
    console.log(user);
    const order = await getUserOrder(user.username);
    setUserOrders(order);
  };

  useEffect(async () => {
    await getOrden();
  }, []);

  return (
    <div>
      <Table striped bordered>
        <thead>
          <tr>
            <th>#Orders</th>
            <th>Precio</th>
            <th>Date</th>
            <th>Estado</th>
            <th>Productos</th>
          </tr>
        </thead>
        <tbody>
          {userOrders?.map((e) => {
            return (
              <tr>
                <td>{e.id}</td>
                <td>${e.price}</td>
                <td>{e.updatedAt}</td>
                <td>{e.statusPago}</td>
                <td>
                  {e.products.map((n) => {
                    return <td>{n.name}</td>;
                  })}
                </td>
                <Button
                  variant="outline-dark"
                  onClick={() => {
                    history.push(`/order/${e.id}`);
                  }}
                >
                  Ver detalles
                </Button>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default UserOrders;
