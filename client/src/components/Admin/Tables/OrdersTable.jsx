import React, { useState, useEffect } from "react";
import { getAllOrder } from "./../../../cart/index";
import { filterByStatus, orderByDate } from "../../../order";
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

  const filterOrdersbyStatus = async (e) => {
    let select = e.target.value
    if(select==="Todo"){
      getAllOrders()
    }
    let ordersFiltered =  await filterByStatus (select);
    !ordersFiltered && alert("No hay órdenes con ese estado")
    ordersFiltered && setOrder(ordersFiltered)
  }

  const handleorderByDate = async (e) => {
    let select = e.target.value
    console.log(select)
    let ordenesByDate = await orderByDate(select)
    console.log(ordenesByDate)
    setOrder(ordenesByDate)
  }

  


  return (
    <div>
      {order === undefined ? (
        <h1>No hay ordenes activas</h1>
      ) : (
        <div>
          {/* FILTROS */}
          <select class="form-select" aria-label="Default select example" onChange={(e)=>{filterOrdersbyStatus(e)}}>
            <option selected value="Todo">Todas las ordenes</option>
            <option value="creada">creadas</option>
            <option value="procesando">procesando</option>
            <option value="cancelada">canceladas</option>
            <option value="finalizada">finalizadas</option>
          </select>
          {/* ORDEN POR FECHA */}
          <select class="form-select" aria-label="Default select example" onChange={(e)=>{handleorderByDate(e)}}>
            <option selected value="masReciente">Más recientes</option>
            <option value="menosReciente">Menos Recientes</option>
          </select>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Usuario</th>
                <th>Contacto</th>
                <th>Teléfono</th>
                <th>Precio</th>
                <th>Estado de orden</th>
                <th>Fecha</th>
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
                    <td>{o.date.split("T")[0]}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>

        </div>
      )}
    </div>
  );
}

export default OrdersTable;
