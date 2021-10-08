import React, { useState } from "react";
import { Card, Nav, Form } from "react-bootstrap";
import style from "../Checkout.module.css";

const Delivery = () => {
  const [delivery, setDelivery] = useState(true);

  const handleSelected = (selectedKey) => {
    if (selectedKey === "Envío") {
      setDelivery(true);
    } else {
      setDelivery(false);
    }
  };

  return (
    <div>
      <Card>
        <Card.Header className={style.title}> 2 - Datos de Envío</Card.Header>
        <Card.Header className={style.title}>
          <Nav
            justify
            variant="tabs"
            className={style.tabsDelivery}
            defaultActiveKey="#envio"
            onSelect={(e) => handleSelected(e)}
          >
            <Nav.Item>
              <Nav.Link className={style.navLink}  href="#envio" eventKey="Envío">
                Envío
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className={style.navLink} href="#retiro" eventKey="Retiro">
                Retiro
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body className={style.bodyDelivery} eventKey={delivery}>
          {delivery === true ? (
            <div>
              <Card.Title>Envío</Card.Title>
              <Form.Group className={style.datosEnvio} controlId="formBasicPassword">
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

                />
              </Form.Group>
            </div>
          ) : (
            <div>
              <Card.Title>Retiro</Card.Title>
              <Card.Text>
                Pasá a retirar tu pedido por Garibaldi 283, Coronel Suárez
                <br />
                Horario : Lu a Vi 9: 30-12: 30, 17: 30-19: 30 y Sa 10-12: 30
              </Card.Text>
            </div>
          )}
          {/* <Button variant="primary">Go somewhere</Button> */}
        </Card.Body>
      </Card>
    </div>
  );
};
export default Delivery;
