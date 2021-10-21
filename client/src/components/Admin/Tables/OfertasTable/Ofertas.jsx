import React, { useState, useEffect } from "react";
import { getOffer } from "../../../../cart/index";
import Calendar from "react-calendar";
import Table from "react-bootstrap/Table";
import { offerCategory, offerProduct } from "../../../../cart/index";
import swal from "sweetalert";
function Ofertas() {
  const [off, setOff] = useState([]);
  const [removed, setRemove] = useState(false);
  const [removedProduct, setremovedProduct] = useState(false);
  const [value, onChange] = useState(new Date());
  const getOfertas = async () => {
    let res = value.toLocaleDateString();
    const ofertas = await getOffer(res);
    setOff(ofertas);
  };
  useEffect(() => {
    getOfertas();
  }, [value]);

  const handleClick = (e, offerday, offer, id) => {
    // e.preventDefault();
    setremovedProduct(true);
    let res = {
      idProduct: id,
      offProduct: offer,
    };
    let fecha = offerday;
    offerProduct(res, fecha);
    swal("Descuento eliminado");
  };

  const handleClickCategory = (e, offerday, offer, id) => {
    // e.preventDefault();
    setRemove(true);
    let res = {
      idCat: id,
      offCat: offer,
    };
    let fecha = offerday;
    offerCategory(res, fecha);
    swal("Descuento eliminado");
  };

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
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {off.data.map((o) => {
              return (
                o.offer > 0 && (
                  <tr>
                    <td>{o.nameCategory}</td>
                    <td>{o.name}</td>
                    <td>{o.offer}</td>
                    {o.name ? (
                      <button
                        onClick={(e) => handleClick(e, o.offerday, 0, o.id)}
                      >
                        Eliminar
                      </button>
                    ) : (
                      <button
                        onClick={(e) =>
                          handleClickCategory(e, o.offerday, 0, o.id)
                        }
                      >
                        Eliminar
                      </button>
                    )}
                  </tr>
                )
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
