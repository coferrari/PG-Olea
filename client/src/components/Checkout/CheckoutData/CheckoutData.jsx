import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import style from "../Checkout.module.css";

const Data = (datosLogin) => {
  const nombre = datosLogin.datosLogin.name;
  const apellido = datosLogin.datosLogin.surname;
  const mail = datosLogin.datosLogin.email;
  return (
    <div>
      <Card style={{ width: "%100" }}>
        <Card.Header className={style.title}> 1 - Datos Personales</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <input type="text" value={nombre} />
          </ListGroup.Item>
          <ListGroup.Item>
            <input type="text" placeholder="Apellido" value={apellido} />
          </ListGroup.Item>
          <ListGroup.Item>
            <input type="text" placeholder="Mail" value={mail} />
          </ListGroup.Item>
          <ListGroup.Item>
            <input type="text" placeholder="Teléfono" />
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
};
