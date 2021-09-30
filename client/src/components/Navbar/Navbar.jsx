import React from "react";
import { Link } from "react-router-dom";
import Register from "../Register/Register";
import { isAuthorized, decodeToken } from "../../utils/index";
const Navbar = () => {
  const validate = isAuthorized();
  if (validate) {
    const user = decodeToken();
    return (
      <div>
        <h1>hola {user.username}</h1>
        OLEA
        <ul>
          <Link to="/logout">
            <li>Logout</li>
          </Link>
        </ul>
      </div>
    );
  }
  return (
    <div>
      OLEA
      <ul>
        <Link to="/login">
          <li>Login</li>
        </Link>
        <Link to="/register">
          <li>Register</li>
        </Link>
        <Link to="/logout">
          <li>Logout</li>
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
