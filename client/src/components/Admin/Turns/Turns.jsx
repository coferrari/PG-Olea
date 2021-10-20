import React, { useEffect, useState } from "react";
import { getTurns, deleteTurn } from "../../../turns/index";
import { Table, Button, Card } from "react-bootstrap";
import swal from "sweetalert";

export default function Turns() {
  const [turnos, setTurnos] = useState();

  const getAllTurns = async () => {
    const turns = await getTurns();
    setTurnos(turns);
  };

  useEffect(() => {
    getAllTurns();
  }, []);

  const onDelete = async (id) => {
    await deleteTurn(id);
    await swal("Turno borrado");
    window.location.reload(true);
  };

  return (
    <div>
      {!turnos?.[0]?.store ? (
        <Card body>No hay turnos creados.</Card>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>Local</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Cupos</th>
            </tr>
          </thead>
          <tbody>
            {turnos?.map((t) => {
              return (
                <tr>
                  <td>{t?.id}</td>
                  <td>{t?.store}</td>
                  <td>{t?.date}</td>
                  <td>{t?.hour}</td>
                  <td>{t?.full}/10</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => {
                        onDelete(t.id);
                      }}
                    >
                      Borrar
                    </Button>
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
