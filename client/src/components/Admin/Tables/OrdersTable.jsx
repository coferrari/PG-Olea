import React, { useState, useEffect } from "react";
import { getAllOrder } from "./../../../cart/index";
import { filterByStatus, getUserOrder, orderByDate } from "../../../order";
import Table from "react-bootstrap/Table";
import { Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { changeStatusOrder } from "../../../auth/admin";
import swal from "sweetalert";
import { GoSearch } from "react-icons/go";
import style from "./OrdersTable.module.css";

function OrdersTable() {
  const [order, setOrder] = useState();
  const [show, setShow] = useState(false);
  const [input, setInput] = useState("");
  const [id, setId] = useState();
  const [mensaje, setMensaje] = useState("");
  const getAllOrders = async () => {
    const orders = await getAllOrder();
    setOrder(orders.data);
  };
  const changeInput = (e) => {
    setInput(e.target.value);
  };
  const changeStatus = async (e) => {
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
  const [search, setSearch] = useState("");
  const handleChange = function (e) {
    setSearch(e.target.value);
  };
  const filterOrdersbyStatus = async (e) => {
    let select = e.target.value;
    if (select === "Todo") {
      return getAllOrders();
    }
    let ordersFiltered = await filterByStatus(select);
    !ordersFiltered && alert("No hay órdenes con ese estado");
    ordersFiltered && setOrder(ordersFiltered);
  };

  const handleorderByDate = async (e) => {
    let select = e.target.value;
    let ordenesByDate = await orderByDate(select);
    setOrder(ordenesByDate);
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    const userSearch = await getUserOrder(search);
    console.log(userSearch);
    if (userSearch.message) {
      swal(userSearch.message);
      return;
    }
    setOrder(userSearch);
  };
  console.log("id", id);
  return (
    <div>
      {order === undefined ? (
        <div>{mensaje ? mensaje : "Aun no hay ordenes"}</div>
      ) : (
        <div>
          <div className={style.menuOrdenes}>
            <input
              className={style.searchOrdenes}
              type="text"
              name="name"
              value={input.name}
              placeholder="buscar órdenes por usuario..."
              onChange={handleChange}
            />
            <button
              //disabled={!input.name ? true : false}
              className={style.bntsearch}
              onClick={(e) => {
                handleSearch(e);
              }}
            >
              <GoSearch className={style.iconsearch} />
            </button>
            {/* FILTROS */}
            <select
              class="form-select"
              aria-label="Default select example"
              onChange={(e) => {
                filterOrdersbyStatus(e);
              }}
            >
              <option selected value="Todo">
                Todas las ordenes
              </option>
              <option value="creada">Creadas</option>
              <option value="procesando">Procesando</option>
              <option value="cancelada">Canceladas</option>
              <option value="finalizada">Finalizadas</option>
            </select>
            {/* ORDEN POR FECHA */}
            <select
              class="form-select"
              aria-label="Default select example"
              onChange={(e) => {
                handleorderByDate(e);
              }}
            >
              <option selected value="masReciente">
                Más recientes
              </option>
              <option value="menosReciente">Menos Recientes</option>
            </select>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Usuario</th>
                <th>Contacto</th>
                <th>Teléfono</th>
                <th>Precio</th>
                <th>Estado pago</th>
                <th>Delivery</th>
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
                    <td>${o.price}</td>
                    <td>
                      {o.statusPago === "approved" ? "Aprobado" : "Desaprobado"}
                    </td>
                    <td>{o.info.split("-").join(" ")}</td>
                    <td>
                      {o.status.charAt(0).toUpperCase() + o.status.slice(1)}
                    </td>
                    <td>
                      {o.updatedAt.slice(0, 10).split("-").reverse().join("-")}
                    </td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => {
                          setShow(true);
                          setId(o.id);
                        }}
                      >
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
                                onClick={(e) => changeStatus(e)}
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
        </div>
      )}
    </div>
  );
}

export default OrdersTable;
