import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import OrderDetail from "../OrderDetail/OrderDetail";
import swal from "sweetalert";

export default function UserTurn() {
  const history = useHistory();
  const onClick = (e) => {
    swal("Tu turno fue cancelado");
  };

  const backOnClick = () => {
    history.push("/");
  };

  return (
    <Card className="text-center">
      <Card.Header>Retiro por sucursal</Card.Header>
      <Card.Body>
        <Card.Title>Detalles</Card.Title>
        <Card.Text>
          Sucursal: {/* {local} */}
          Fecha: {/* {fecha} */}
          Horario: {/*{hora}*/}
        </Card.Text>
        <OrderDetail />
        <Button variant="dark" onClick={backOnClick}>
          Volver
        </Button>
        <Button variant="danger" onClick={onClick}>
          Cancelar
        </Button>
      </Card.Body>
      {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
    </Card>
  );
}
