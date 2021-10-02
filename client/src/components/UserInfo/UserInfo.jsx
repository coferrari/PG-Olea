import React from "react";
import { Route } from "react-router-dom";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import CreateProduct from "../CreateProduct/CreateProduct";

export default function UserInfo() {
  return (
    <div>
      <h1>Users</h1>

      <CreateProduct />
    </div>
  );
}
