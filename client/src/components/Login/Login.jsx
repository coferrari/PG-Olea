import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { logIn } from "../../auth/users";
const LoginButton = () => {
  const history = useHistory();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await logIn(input);
      history.push("/");
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

export default LoginButton;
