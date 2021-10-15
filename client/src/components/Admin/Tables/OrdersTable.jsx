import React, { useState, useEffect } from "react";
import { getAllOrder } from "./../../../cart/index";
import Table from "react-bootstrap/Table";
import { Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { changeStatusOrder } from "../../../auth/admin";
import swal from "sweetalert";
function OrdersTable() {
  const [order, setOrder] = useState();
  const [show, setShow] = useState(false);
  const [input, setInput] = useState("");
  const getAllOrders = async () => {
    const orders = await getAllOrder();
    console.log("order", orders);
    setOrder(orders.data);
  };
  const changeInput = (e) => {
    setInput(e.target.value);
  };
  const changeStatus = async (e, id) => {
    e.preventDefault();
    try {
      await changeStatusOrder(id, input);
      swal("Se cambio el estado de la orden correctamente");
      window.location.reload(false);
    } catch (err) {
      console.log(err.msg);
    }
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
              <th>Usuario</th>
              <th>Contacto</th>
              <th>Teléfono</th>
              <th>Precio total</th>
              <th>Estado de orden</th>
              <th>Fecha</th>
              <th>Modificar</th>
            </tr>
          </thead>
          <tbody>
            {order?.map((o) => {
              console.log(o);
              return (
                <tr>
                  <Link to={`/order/${o.id}`}>
                    <td>{o.id}</td>
                  </Link>
                  <td>{o.userUsername}</td>
                  <td>{o.contactName + " " + o.contactSurname}</td>
                  <td>{o.phone}</td>
                  <td>${o.price}</td>
                  <td>{o.status}</td>
                  <td>{o.date.split("T")[0]}</td>
                  <td>
                    <Button variant="primary" onClick={() => setShow(true)}>
                      Modificar estado
                    </Button>
                    <Modal
                      show={show}
                      onHide={() => setShow(false)}
                      dialogClassName="modal-90w"
                      aria-labelledby="example-custom-modal-styling-title"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                          Actualizar orden
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form.Group controlId="formGridState">
                          <Form.Label>Nuevo estado de la orden:</Form.Label>
                          <Form.Select onChange={(e) => changeInput(e)}>
                            <option>Elegir</option>
                            <option value="finalizada">Aprobada</option>
                            <option value="cancelada">Rechazada</option>
                            <option value="procesando">En proceso</option>
                          </Form.Select>
                        </Form.Group>
                        <Form.Group>
                          {input ? (
                            <Button
                              type="submit"
                              onClick={(e) => changeStatus(e, o.id)}
                            >
                              Cambiar
                            </Button>
                          ) : (
                            ""
                          )}
                        </Form.Group>
                      </Modal.Body>
                    </Modal>
                  </td>
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
