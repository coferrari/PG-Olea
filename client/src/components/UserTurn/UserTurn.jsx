import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { getTurnByUser } from "../../turns/index";
import { decodeToken } from "../../utils";
import { CANCEL_TURN } from "../../consts";
import swal from "sweetalert";
import axios from "axios";
import style from "./userturnos.module.css";
//agregar desde la fecha actual

export default function UserTurn() {
  const [turn, setTurn] = useState();
  const history = useHistory();

  const getTurnUser = async () => {
    const { username } = decodeToken();
    const turnUser = await getTurnByUser(username);
    await setTurn(turnUser);
  };

  useEffect(() => {
    getTurnUser();
  }, []);

  const onClick = async () => {
    await axios.delete(CANCEL_TURN, {
      data: {
        orderId: parseInt(turn[0].id),
        store: turn[1].store,
        date: turn[1].date,
        hour: turn[1].hour,
      },
    });
    setTurn(null);
    swal("Tu turno fue cancelado");
    history.push("/");
  };

  const backOnClick = () => {
    history.push("/account");
  };
  return (
    <div>
      {!turn?.[1]?.store ? (
        <div>
          <Card>
            <Card.Title className={style.turnos}>
              <Card.Header>No hay turnos pendientes</Card.Header>
            </Card.Title>
            <Button variant="dark" onClick={backOnClick}>
              Volver
            </Button>
          </Card>
        </div>
      ) : (
        <div>
          <Card className="text-center">
            <Card.Header>Retiro por sucursal</Card.Header>
            <Card.Body>
              <Card.Title>Detalles del turno</Card.Title>
              <Card.Text>
                <div>Sucursal: {turn[1].store}</div>
                <div>Fecha: {turn[1].date}</div>
                <div>Horario: {turn[1].hour}</div>
              </Card.Text>
              <Card.Title>Detalles de la compra</Card.Title>
              <Card.Text>
                Productos:{" "}
                {turn?.[0].products?.map((p) => {
                  return (
                    <div>
                      {p.name} x {p.Order_Products.quantity}
                    </div>
                  );
                })}
                <div>Total: ${turn[0].price}</div>
              </Card.Text>
              <Button variant="dark" onClick={backOnClick}>
                Volver
              </Button>
              <Button variant="danger" onClick={onClick}>
                Cancelar turno
              </Button>
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
  );
}
