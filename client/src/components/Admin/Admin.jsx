import React from "react";
import { Route } from "react-router-dom";
import { useParams } from "react-router";
import { useHistory, Redirect } from "react-router-dom";
import { Button } from "react-bootstrap";
import { getToken, decodeToken } from "../../utils/index";
import CreateProduct from "../CreateProduct/CreateProduct";

export default function Admin() {
  const loggedIn = decodeToken();
  console.log(loggedIn);
  return <div></div>;
}
