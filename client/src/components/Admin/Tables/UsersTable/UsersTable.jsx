import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import {
  getUsers,
  changePasswordAdmin,
  removeUserDB,
} from "../../../../auth/admin";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
export default function UsersTable() {
  const [users, setUsers] = useState();
  const getAll = async () => {
    const users = await getUsers();
    setUsers(users);
  };
  const changePass = (email) => {
    confirmAlert({
      title: "Cambiar contraseña",
      message: "Desea forzar que el usuario cambie su contraseña?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            alert("Se le enviara un email al usuario");
            await changePasswordAdmin(email);
          },
        },
        {
          label: "No",
          onClick: () => console.log("zs"),
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
          label: "Yes",
          onClick: async () => {
            alert("Este usuario ha sido eliminado");
            await removeUserDB(user);
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
  useEffect(() => {
    getAll();
  }, []);
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Reset password</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => {
            return (
              <tr>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.admin ? "Si" : "No"}</td>
                <td
                  onClick={() => {
                    changePass(user.email);
                  }}
                >
                  Cambiar password
                </td>
                {user.admin ? (
                  ""
                ) : (
                  <td
                    onClick={() => {
                      removeUser(user.username);
                    }}
                  >
                    Eliminar usuario
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
