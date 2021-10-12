import React, { useState } from "react";
import Data from "./CheckoutData/CheckoutData";
import Delivery from "./CheckoutDelivery/CheckoutDelivery";
import Details from "./CheckoutDetail/CheckoutDetail";
import { decodeToken, isAuthorized } from "../../utils";
import { Button } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { checkoutMercadoPago } from "../../redux/actions";
import style from "./Checkout.module.css";
import { Card, ListGroup, Nav, Form } from "react-bootstrap";

const Checkout = () => {
  const history = useHistory();
  const sesionIniciada = isAuthorized();
  const datosLogin = decodeToken();
  console.log(datosLogin);
  const dispatch = useDispatch();
  const [delivery, setDelivery] = useState(true);
  const [order, setOrder] = useState({
    username: datosLogin.username,
    price: 0,
    products: [],
    addres: "",
    addresNum: 0,
  });

  let linkDePago = useSelector((state) => state.carritoReducer.linkPago);

  const itemsCheckout = useSelector(
    (state) => state.carritoReducer.productsCarrito
  );

  // let total = 0;
  // for (var i = 0; i < itemsCheckout.length; i++) {
  //   let totalPorUnidad = itemsCheckout[i].price * itemsCheckout[i].quantity;
  //   total = total + totalPorUnidad;
  // }

  const totalSum = itemsCheckout?.reduce((acc, curr) => {
    const result = curr.Carrito_Products
      ? acc + parseInt(curr.price) * curr.Carrito_Products.quantity
      : acc + parseInt(curr.price) * curr.quantity;
    return result;
  }, 0);

  // const totalQuantity = itemsCheckout?.reduce((acc, curr) => {
  //   const result = curr.Carrito_Products
  //     ? acc + curr.Carrito_Products.quantity
  //     : acc + curr.quantity;
  //   return result;
  // }, 0);

  const handleConfirmOrder = async (e) => {
    e.preventDefault();
    dispatch(checkoutMercadoPago(itemsCheckout));
    // dispatch(createOrder({
    //   username: ,
    //   price: ,
    //   products: [],
    //   addres:,
    //   addresNum:
    // }))
  };

  const handleSelected = (selectedKey) => {
    if (selectedKey === "Envío") {
      setDelivery(true);
    } else {
      setDelivery(false);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setOrder({
      ...order,
      addres: e.target.value,
    });
  };

  const format = (num) => {
    num = num + "";
    var str = "";
    for (var i = num.length - 1, j = 1; i >= 0; i--, j++) {
      if (j % 3 === 0 && i !== 0) {
        str += num[i] + ".";
        continue;
      }
      str += num[i];
    }
    return str.split("").reverse().join("");
  };

  return (
    <div>
      {sesionIniciada === true ? (
        <div className={style.checkoutContainer}>
          {/* <Data datosLogin={datosLogin} /> */}
          <div>
            <Card style={{ width: "%100" }}>
              <Card.Header className={style.title}>
                {" "}
                1 - Datos Personales
              </Card.Header>
              <ListGroup className={style.listgroup}>
                <ListGroup.Item className={style.listgroup}>
                  <label> Nombre </label>{" "}
                  <input
                    className={style.input}
                    type="text"
                    placeholder="Nombre"
                    defaultValue={datosLogin.name}
                  />
                </ListGroup.Item>
                <ListGroup.Item className={style.listgroup}>
                  <label> Apellido </label>
                  <input
                    className={style.input}
                    type="text"
                    placeholder="Apellido"
                    defaultValue={datosLogin.surname}
                  />
                </ListGroup.Item>
                <ListGroup.Item className={style.listgroup}>
                  <label> Teléfono </label>{" "}
                  <input
                    className={style.input}
                    type="text"
                    placeholder="Teléfono"
                  />
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </div>
          <div>
            <Card>
              <Card.Header className={style.title}>
                {" "}
                2 - Datos de Envío
              </Card.Header>
              <Card.Header className={style.title}>
                <Nav
                  justify
                  variant="tabs"
                  className={style.tabsDelivery}
                  defaultActiveKey="#envio"
                  onSelect={(e) => handleSelected(e)}
                >
                  <Nav.Item>
                    <Nav.Link
                      className={style.navLink}
                      href="#envio"
                      eventKey="Envío"
                    >
                      Envío
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      className={style.navLink}
                      href="#retiro"
                      eventKey="Retiro"
                    >
                      Retiro
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Header>
              <Card.Body className={style.bodyDelivery} eventKey={delivery}>
                {delivery === true ? (
                  <div>
                    <Card.Title>Envío</Card.Title>
                    <Form.Group
                      className={style.datosEnvio}
                      controlId="formBasicPassword"
                    >
                      <Form.Label>Localidad</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Localidad"
                        name="localidad"
                        className={style.inputDatosEnvio}
                      />
                      <Form.Label>Domicilio de envío</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Domicilio de Envío"
                        name="domicilio"
                        className={style.inputDatosEnvio}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                    </Form.Group>
                  </div>
                ) : (
                  <div>
                    <Card.Title>Retiro</Card.Title>
                    <Card.Text>
                      Pasá a retirar tu pedido por Garibaldi 283, Coronel Suárez
                      <br />
                      Horario : Lu a Vi 9: 30-12: 30, 17: 30-19: 30 y Sa 10-12:
                      30
                    </Card.Text>
                  </div>
                )}
                {/* <Button variant="primary">Go somewhere</Button> */}
              </Card.Body>
            </Card>
          </div>
          <Details />
          <p className={style.total}> Total ${format(totalSum)}</p>
          <div className={style.buttonConfirmarCompra}>
            <Button variant="dark" onClick={(e) => handleConfirmOrder(e)}>
              Confirmar la compra
            </Button>
            {linkDePago &&
              confirmAlert({
                title: "Atención",
                message: "Usted será redirigido al checkout de Mercado Pago",
                buttons: [
                  {
                    label: "Aceptar",
                    onClick: () => {
                      window.open(linkDePago);
                      window.location.href = "/";
                    },
                  },
                  {
                    label: "Volver",
                    onClick: () => {
                      window.location.href = "";
                    },
                  },
                ],
              })}
          </div>
        </div>
      ) : (
        <div>
          {confirmAlert({
            title: "No iniciaste sesión",
            message:
              "Para continuar con tu compra debes registrarte o iniciar sesión",
            buttons: [
              {
                label: "Iniciar Sesión",
                onClick: () => history.push("/login"),
              },
              {
                label: "Registrarse",
                onClick: () => history.push("/register"),
              },
              {
                label: "Inicio",
                onClick: () => history.push("/"),
              },
            ],
          })}
        </div>
      )}
    </div>
  );
};
export default Checkout;
