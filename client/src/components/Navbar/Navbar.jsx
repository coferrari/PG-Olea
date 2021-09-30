import React from "react";
import Nav from "react-bootstrap/Nav";

const Navbar = () => {
  return (
    <div>
      <Nav justify variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link href="/login">Login</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/register">Register</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/logout">Logout</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/">Back</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Navbar;
