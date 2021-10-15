import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import swal from "sweetalert";
import {
  getUsers,
  changePasswordAdmin,
  removeUserDB,
  generateAdminDB,
} from "../../../../auth/admin";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
export default function UsersTable() {
  const [users, setUsers] = useState();
  const [az, setAz] = useState(false);
  const [email, setEmail] = useState(false);
  const [order, setOrder] = useState(false);
  const getAll = async () => {
    const users = await getUsers();
    setUsers(users);
  };
  const orderById = () => {
    az ? setAz(false) : setAz(true);
    let aux = [...users];
    if (az === true) {
      aux.sort((a, b) => {
        if (a.id > b.id) {
          return 1;
        } else {
          return -1;
        }
      });
      setUsers([...aux]);
    }
    if (az === false) {
      aux.sort((a, b) => {
        if (a.id < b.id) {
          return 1;
        } else {
          return -1;
        }
      });
      setUsers([...aux]);
    }
  };
  const orderByUser = () => {
    order ? setOrder(false) : setOrder(true);
    let aux = [...users];
    if (order === true) {
      aux.sort((a, b) => {
        if (a.username > b.username) {
          return 1;
        } else {
          return -1;
        }
      });
      setUsers([...aux]);
    }
    if (order === false) {
      aux.sort((a, b) => {
        if (a.username < b.username) {
          return 1;
        } else {
          return -1;
        }
      });
      setUsers([...aux]);
    }
  };
  const orderByEmail = () => {
    email ? setEmail(false) : setEmail(true);
    let aux = [...users];
    if (email === true) {
      aux.sort((a, b) => {
        if (a.username > b.username) {
          return 1;
        } else {
          return -1;
        }
      });
      setUsers([...aux]);
    }
    if (email === false) {
      aux.sort((a, b) => {
        if (a.username < b.username) {
          return 1;
        } else {
          return -1;
        }
      });
      setUsers([...aux]);
    }
  };
  const changePass = (email) => {
    confirmAlert({
      title: "Cambiar contraseña",
      message: "Desea forzar que el usuario cambie su contraseña?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            swal("Se le enviara un email al usuario");
            await changePasswordAdmin(email);
          },
        },
        {
          label: "No",
        },
      ],
    });
  };
  const removeUser = (user) => {
    confirmAlert({
      title: "Eliminar usuario",
      message: `Desea eliminar a ${user}`,
      buttons: [
        {
          label: "Si",
          onClick: async () => {
            swal("Este usuario ha sido eliminado");
            await removeUserDB(user);
            window.location.reload(false);
          },
        },
        {
          label: "No",
        },
      ],
    });
  };
  const generateAdmin = (user) => {
    confirmAlert({
      title: "Promover a administrador",
      message: `Desea darle rango administador a ${user}`,
      buttons: [
        {
          label: "Si",
          onClick: async () => {
            swal("Este usuario ahora es admin");
            await generateAdminDB(user);
            window.location.reload(false);
          },
        },
        {
          label: "No",
        },
      ],
    });
  };
  useEffect(() => {
    getAll();
  }, []);
  return (
    <div className="container">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th onClick={orderById}>Id</th>
            <th onClick={orderByUser}>Nombre</th>
            <th onClick={orderByEmail}>Email</th>
            <th>Admin</th>
            <th>Forzar contraseña</th>
            <th>Eliminar usuario</th>
            <th>Fecha de registro</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => {
            return (
              <tr>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                {user.admin ? (
                  <td> Si</td>
                ) : (
                  <td>
                    <Button onClick={() => generateAdmin(user.username)}>
                      Dar admin
                    </Button>
                  </td>
                )}
                {user.admin ? (
                  <td></td>
                ) : (
                  <td>
                    <Button
                      onClick={() => {
                        changePass(user.email);
                      }}
                    >
                      Cambiar contraseña
                    </Button>
                  </td>
                )}
                {user.admin ? (
                  <td></td>
                ) : (
                  <td>
                    <Button
                      onClick={() => {
                        removeUser(user.username);
                      }}
                    >
                      Eliminar usuario
                    </Button>
                  </td>
                )}
                <td>{user.createdAt.slice(0, 10)}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
