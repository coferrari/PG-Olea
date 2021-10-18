import React, {useEffect, useState}from "react";
import { changedelivery, getDeliveries} from "../../../../delivery/delivery";
import { Table, Button} from "react-bootstrap";
import { Link } from "react-router-dom";
import swal from "sweetalert";

function EnviosAdmin() {
  const [order, setOrder] = useState([]);

  const getAllDelivery = async () => {
    const delivery = await getDeliveries();
    setOrder(delivery);
    console.log("delivery",delivery)
  };

  useEffect(() => {
    getAllDelivery();
  }, []);



  const despachar = async (e,id) =>{
    e.preventDefault();
    try {
      await changedelivery(id);
      swal("Se cambio el estado de la orden correctamente");
      window.location.reload(false);
    } catch (err) {
      console.log(err.msg);
    }
  }

  console.log(order)

    return (
      <div>
        <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                {/* <th>Usuario</th> */}
                <th>Contacto</th>
                <th>Teléfono</th>
                {/* <th>Precio</th>
                <th>Estado pago</th> */}
                <th>Delivery</th>
                <th>Estado de orden</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {order?.map((o) => {
                return (
                  <tr>
                    <Link to={`/order/${o.id}`}>
                      <td>{o.id}</td>
                    </Link>
                    {/* <td>{o.userUsername}</td> */}
                    <td>{o.contactName + " " + o.contactSurname}</td>
                    <td>{o.phone}</td>
                    {/* <td>${o.price}</td>
                    <td>
                      {o.statusPago === "approved" ? "Aprobado" : "Desaprobado"}
                    </td> */}
                    <td>{o.info.split("-").join(" ")} {o.info==="en-espera"? (<Button
                        variant="primary"
                        onClick={(e)=>despachar(e,o.id)}
                      >
                        Despachar
                      </Button>):""}
                      </td>
                    <td>
                      {o.status.charAt(0).toUpperCase() + o.status.slice(1)}
                    </td>
                    <td>
                      {o.updatedAt.slice(0, 10).split("-").reverse().join("-")}
                    </td>
                    <td>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
      </div>
    );
  }

  export default EnviosAdmin;