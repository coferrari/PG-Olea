import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { changePassword } from "../../auth/users";
import style from "./ChangePassword.module.css";
import { useHistory } from "react-router-dom";

export function validate(input) {
  let errors = {};
  if (!input.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(input.email)) {
    errors.email = "Email is invalid";
  } else if (!input.passwordOne) {
    errors.passwordOne = "Password is required";
  } else if (
    !/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(input.passwordOne)
  ) {
    errors.passwordOne = "Password is invalid";
  } else if (!input.passwordTwo) {
    errors.passwordTwo = "Password is required";
  } else if (input.passwordOne !== input.passwordTwo) {
    errors.passwordTwo = "Password must much";
  }
  return errors;
}

const ChangePassword = () => {
  const [input, setInput] = useState({
    email: "",
    passwordOne: "",
    passwordTwo: "",
  });

  const [errors, setErrors] = useState({});
  const history = useHistory();

  const handleSubmit = (e) => {
      e.preventDefault()
      changePassword(input.email, input.passwordTwo);
      history.push('/login')
  }

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  return (
    <div className="container">
      <div className="col-lg-4 mx-auto text-center">
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
            {errors.email && <div className={style.errors}>{errors.email}</div>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={(e) => {
                handleChange(e);
              }}
              type="password"
              placeholder="Password"
              name="passwordOne"
              value={input.passwordOne}
            />
            {errors.passwordOne && (
              <div className={style.errors}>{errors.passwordOne}</div>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Repeti tu password</Form.Label>
            <Form.Control
              onChange={(e) => {
                handleChange(e);
              }}
              type="password"
              placeholder="Password"
              name="passwordTwo"
              value={input.passwordTwo}
            />
            {errors.passwordTwo && (
              <div className={style.errors}>{errors.passwordTwo}</div>
            )}
          </Form.Group>
          {input.email &&
            input.passwordOne &&
            input.passwordTwo &&
            !errors.email &&
            !errors.passwordOne &&
            !errors.passwordTwo && (
              <Button variant="dark" type="submit">
                Confirmar cambio de contraseña
              </Button>
            )}
        </Form>
      </div>
    </div>
  );
};

export default ChangePassword;
