import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import { getToken } from "../../../../utils/index";
import swal from "sweetalert";
import { confirmAlert } from "react-confirm-alert"; // Import
import { GET_REVIEWS } from "../../../../consts";
import axios from "axios";

export default function ReviewsTable() {
  const [reviews, setReviews] = useState();
  const { productid } = useParams();
  const review = async () => {
    const res = await axios.get(GET_REVIEWS + productid, {
      headers: {
        authorization: getToken(),
      },
    });

    setReviews(res.data);
    console.log(reviews);
  };
  useEffect(() => {
    review();
  }, [productid]);

  const remove = (id) => {
    confirmAlert({
      title: "Eliminar usuario",
      message: `Desea eliminar la review`,
      buttons: [
        {
          label: "Si",
          onClick: async () => {
            swal("Esta review ha sido eliminado");
            await axios.delete(GET_REVIEWS + id, {
              headers: {
                authorization: getToken(),
              },
            });

            window.location.reload(false);
          },
        },
        {
          label: "No",
          onClick: () => console.log("zs"),
        },
      ],
    });
  };

  return (
    <div>
      {
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Usuario</th>
              <th>Rating</th>
              <th>Comentario</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {reviews?.map((e) => {
              return (
                <tr>
                  <td>{e.id}</td>
                  <td>{e.userUsername}</td>
                  <td>{e.rating}</td>
                  <td>{e.comment}</td>
                  <td>
                    <Button onClick={() => remove(e.id)}>Eliminar</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      }
    </div>
  );
}
