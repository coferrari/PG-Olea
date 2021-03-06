import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getToken } from "../../../../utils/index";
import { getProducts, getProductDetail } from "../../../../redux/actions";
import swal from "sweetalert";
import { confirmAlert } from "react-confirm-alert"; // Import
import { GET_PRODUCTS_URL } from "../../../../consts";
import { Link } from "react-router-dom";
import axios from "axios";
export default function ProductTable() {
  const dispatch = useDispatch();
  let products = useSelector((state) => state.productsReducer.products);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  const remove = (name, id) => {
    confirmAlert({
      title: "Eliminar usuario",
      message: `Desea eliminar ${name}`,
      buttons: [
        {
          label: "Si",
          onClick: async () => {
            swal("Este producto ha sido eliminado");
            await axios.delete(GET_PRODUCTS_URL + id, {
              headers: {
                authorization: getToken(),
              },
            });
            window.location.reload(false);
          },
        },
        {
          label: "No",
        },
      ],
    });
  };
  return (
    <div className="container">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Descripción</th>
            <th>Reviews</th>
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((e) => {
            return (
              <tr>
                <td>{e.id}</td>
                <td>{e.name}</td>
                <td>{e.price}</td>
                <td>{e.stock}</td>
                <td>{e.description}</td>
                <td>
                  <Link to={`/admin/reviews/${e.id}`}>
                    <Button variant="dark">Ver Reviews</Button>
                  </Link>
                </td>
                <td>
                  <Link to={`/admin/editproduct/${e.id}`}>
                    <Button variant="dark" onClick={() => dispatch(getProductDetail(e.id))}>
                      Editar Producto
                    </Button>
                  </Link>
                </td>
                <td>
                  <Button variant="dark" onClick={() => remove(e.name, e.id)}>Eliminar</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
