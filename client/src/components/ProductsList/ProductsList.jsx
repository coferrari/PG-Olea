import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useParams } from "react-router";
import { useHistory, Redirect, Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import { getToken, decodeToken } from "../../utils/index";
import { getUsers } from "../../auth/users";

export default function ProductList() {
  const [users, setUsers] = useState();
  const get = async () => {
    const use = await getUsers(getToken());
    setUsers(use);
  };

  useEffect(() => {
    get();
  }, []);

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Descripcion</th>
            <th>Reviews</th>
            <th>Stock</th>
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
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
