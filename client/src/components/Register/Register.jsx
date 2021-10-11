import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { register } from "../../auth/users";
import { useHistory } from "react-router";
import style from "./Register.module.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Nombre requerido";
  } else if (!input.surname) {
    errors.surname = "Apellido requerido";
  } else if (!input.username) {
    errors.username = "Nombre de usuario requerido";
  } else if (!input.email) {
    errors.email = "Por favor ingrese su email";
  } else if (!/\S+@\S+\.\S+/.test(input.email)) {
    errors.email = "El email ingreado no es válido";
  } else if (!input.password) {
    errors.password = "Por favor ingrese su contraseña";
  } else if (
    !/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(input.password)
  ) {
    errors.password = "El formato de contraseña no es valido";
  }
  return errors;
}

const Register = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    surname: "",
  });
  const [errors, setErrors] = useState({});



  const history = useHistory();

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

  const submit = (e) => {
    confirmAlert({
      title: "Confirmar registro",
      message: "Desea confirmar su registro?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            alert(
              "Revise su bandeja de entrada para continuar con el registro"
            );
            await register(input);
            history.push("/");
          },
        },
        {
          label: "No",
          onClick: () => history.push("/home"),
        },
      ],
    });
  };

  return (
    <div className={style.container}>
      <h3 className={style.title}>Registrate</h3>
      <div className="container">
        <div className="col-lg-4 mx-auto text-center">
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              submit(e);
            }}
          >
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="name"
                placeholder="Ingresá tu nombre"
                name="name"
                value={input.name}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              {errors.name && <div className={style.errors}>{errors.name}</div>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="surname"
                placeholder="Ingresá tu apellido"
                name="surname"
                value={input.surname}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              {errors.surname && (
                <div className={style.errors}>{errors.surname}</div>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nombre de usuario</Form.Label>
              <Form.Control
                type="username"
                placeholder="Ingresá un nombre de usuario"
                name="username"
                value={input.username}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              {errors.username && (
                <div className={style.errors}>{errors.username}</div>
              )}
            </Form.Group>

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
                Nunca compartiremos esta información.
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
                placeholder="Ingresà una contraseña"
                name="password"
                value={input.password}
              />
              {errors.password && (
                <div className={style.errors}>{errors.password}</div>
              )}
            </Form.Group>

            {input.username &&
              !errors.username &&
              input.name &&
              !errors.name &&
              input.surname &&
              !errors.surname &&
              input.email &&
              !errors.email &&
              input.password &&
              !errors.password && (
                <Button variant="dark" type="submit">
                  Registrate
                </Button>
              )}
          </Form>
   
        </div>
      </div>
    </div>
  );
};
export default Register;
