import React from "react";
import { Route } from "react-router-dom";
import { useParams } from "react-router";
import { useHistory, Redirect } from "react-router-dom";
import { Button } from "react-bootstrap";
import { getToken, decodeToken } from "../../utils/index";
import Admin from "../Admin/Admin";
export default function User() {
  const loggedIn = decodeToken();
  console.log(loggedIn);
  return (
    <div>
      <h1>Users</h1>
      {loggedIn.admin ? <Admin /> : <Redirect to="/home" />}
    </div>
  );
}
