import React, { useState, useEffect } from "react";
import { getAllOrder } from "./../../../cart/index";
import { filterByStatus } from "../../../order";
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

    console.log(select)
    if(select==="Todo"){
      getAllOrders()
    }

    let ordersFiltered =  await filterByStatus (select);
    console.log(ordersFiltered)
    
    !ordersFiltered && alert("No hay órdenes con ese estado")
    ordersFiltered && setOrder(ordersFiltered)
    // if(ordersFiltered===[]){
    //   alert("No hay órdenes con ese estado")
    // } else {
    //   setOrder(ordersFiltered)
    // }
  }
console.log(order)

  


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
