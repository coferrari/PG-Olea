import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import {requestChangePassword} from "../../auth/users";
import style from "./RequestChangePassword.module.css";
import { useHistory } from "react-router-dom";

export function validate(email) {
  let errors = "";
  if (!/\S+@\S+\.\S+/.test(email)) {
    errors = "Email is invalid";
  }
  return errors;
}

const RequestChangePassword = () => {
  const [email, setEmail] = useState();
  const [errors, setErrors] = useState();

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // alert ('revisa tu mail')
      await requestChangePassword(email);
      history.push('/')
    } catch (err) {
      console.log(err);
    }

  };

  const handleChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
    setErrors(validate(e.target.value));
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
              value={email}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            {errors && <div className={style.errors}>{errors}</div>}
          </Form.Group>

          {!errors && email && (
            <Button variant="dark" type="submit">
              Solicitar cambio de contraseña
            </Button>
          )}
        </Form>
      </div>
    </div>
  );
};

export default RequestChangePassword;