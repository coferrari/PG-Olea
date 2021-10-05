import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { register } from "../../auth/users";
import { useHistory } from "react-router-dom";
import GoogleLogin from "react-google-login";
import style from "./Register.module.css";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
export function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Name is required";
  } else if (!input.surname) {
    errors.surname = "Surname is required";
  } else if (!input.username) {
    errors.username = "Username is required";
  } else if (!input.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(input.email)) {
    errors.email = "Email is invalid";
  } else if (!input.password) {
    errors.password = "Password is required";
  } else if (
    !/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(input.password)
  ) {
    errors.password = "Password is invalid";
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

  //POP UP
  const [show, setShow] = useState(false);

  const handleClose = () => {
    history.push("/")
    //setShow(false)
  };
  // const handleShow = () => setShow(true);

  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
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
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                name="name"
                value={input.name}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              {errors.name && <div className={style.errors}>{errors.name}</div>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Surname</Form.Label>
              <Form.Control
                type="surname"
                placeholder="Enter surname"
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
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="username"
                placeholder="Enter username"
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
              {errors.email && (
                <div className={style.errors}>{errors.email}</div>
              )}
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
