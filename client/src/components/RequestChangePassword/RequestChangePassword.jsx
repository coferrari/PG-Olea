import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { requestChangePassword } from "../../auth/users";
import style from "./RequestChangePassword.module.css";
import { useHistory } from "react-router";

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
  const [emailError, setEmailError] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // alert ('revisa tu mail')
      await requestChangePassword(email);
      history.push("/");
    } catch (err) {
      setEmailError("Este email no esta registrado");
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
    setErrors(validate(e.target.value));
  };

  return (
    <div className="container">
      <div className={style.container}>
        <h3 className={style.title}>solicitar cambio de contraseña</h3>
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
            <div className={style.errors}>{emailError ? emailError : ""}</div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RequestChangePassword;
