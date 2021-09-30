import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { register } from "../../auth/users";
import { Redirect } from "react-router";
const Register = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(input);
      setLoggedIn(true);
      <Redirect to="/" />;
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <div>
      Ingresa
      <Form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            placeholder="Enter email"
            name="username"
            value={input.username}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={input.email}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => {
              handleChange(e);
            }}
            type="password"
            placeholder="Password"
            name="password"
            value={input.password}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
export default Register;
