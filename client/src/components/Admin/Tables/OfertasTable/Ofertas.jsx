import React, { useState, useEffect } from "react";
import { getOffer } from "../../../../cart/index";
import Calendar from "react-calendar";
import Table from "react-bootstrap/Table";

function Ofertas() {
  const [off, setOff] = useState([]);

  const [value, onChange] = useState(new Date());
  const getOfertas = async () => {
    let res = value.toLocaleDateString();
    const ofertas = await getOffer(res);
    setOff(ofertas);
  };
  useEffect(() => {
    getOfertas();
  }, [value]);

  return (
    <div>
      <Calendar onChange={onChange} value={value} />
      {off.data ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Categoria</th>
              <th>Producto</th>
              <th>Descuento</th>
            </tr>
          </thead>
          <tbody>
            {off.data.map((o) => {
              return (
                <tr>
                  <td>{o.nameCategory}</td>
                  <td>{o.name}</td>
                  <td>{o.offer}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <h1>No hay ofertas</h1>
      )}
    </div>
  );
}

export default Ofertas;
