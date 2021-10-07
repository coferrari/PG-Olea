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
        <ListGroup  horizontal className={style.listgroup  }>
          <ListGroup.Item>
           <label> Nombre </label> <input className={style.input} type="text" defaultValue={nombre} />
          </ListGroup.Item>
          <ListGroup.Item>
          <label> Apellido </label><input className={style.input} type="text" placeholder="Apellido" defaultValue={apellido} />
          </ListGroup.Item>
          <ListGroup.Item>
          <label> E-mail </label> <input className={style.input} type="text" placeholder="Mail" defaultValue={mail} />
          </ListGroup.Item>
          <ListGroup.Item>
          <label> Teléfono </label> <input className={style.input} type="text" placeholder="Teléfono" />
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
};

export default Data;
