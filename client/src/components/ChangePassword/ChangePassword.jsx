import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { changePassword } from "../../auth/users";
import style from "./ChangePassword.module.css";
import { useHistory, useParams } from "react-router";
import swal from "sweetalert";

export function validate(input) {
  let errors = {};
  if (!input.email) {
    errors.email = "Por favor ingrese su email";
  } else if (!/\S+@\S+\.\S+/.test(input.email)) {
    errors.email = "El email ingresado no es válido";
  } else if (!input.passwordOne) {
    errors.passwordOne = "Por favor ingrese una contraseña";
  } else if (
    !/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(input.passwordOne)
  ) {
    errors.passwordOne = "El formato de contraseña no es valido";
  } else if (!input.passwordTwo) {
    errors.passwordTwo = "Por favor repita la contraseña";
  } else if (input.passwordOne !== input.passwordTwo) {
    errors.passwordTwo = "Las contraseñas deben ser iguales";
  }
  return errors;
}

const ChangePassword = () => {
  const { token } = useParams();
  const [input, setInput] = useState({
    email: "",
    passwordOne: "",
    passwordTwo: "",
  });
  const [errorEmail, setErrorEmail] = useState("");
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await changePassword(input.email, input.passwordTwo, token);
      // const x = await changePassword(input.email, input.passwordTwo, token);
      swal("Se modificó su contraseña correctamente")
      history.push("/login");
    } catch (err) {
      setErrorEmail(
        "Este email no pertenece al usuario que pidio el cambio de contraseña"
      );
    }
  };

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
      <div className={style.container}>
        <h3 className={style.title}>Cambia tu contraseña</h3>
        <div className="col-lg-4 mx-auto text-center">
          <Form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresá tu email"
                name="email"
                value={input.email}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <Form.Text className="text-muted">
              Nunca compartiremos esta información
              </Form.Text>
              {errors.email && (
                <div className={style.errors}>{errors.email}</div>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                onChange={(e) => {
                  handleChange(e);
                }}
                type="password"
                placeholder="Ingresá tu nueva contraseña"
                name="passwordOne"
                value={input.passwordOne}
              />
              {errors.passwordOne && (
                <div className={style.errors}>{errors.passwordOne}</div>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Repeti tu contraseña</Form.Label>
              <Form.Control
                onChange={(e) => {
                  handleChange(e);
                }}
                type="password"
                placeholder="Ingresá tu nueva contraseña otra vez"
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
            <div className={style.errors}>{errorEmail ? errorEmail : ""}</div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
