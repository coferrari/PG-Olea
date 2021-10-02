import React from "react";
import { useHistory, Link } from "react-router-dom";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { logIn, logInGoogle } from "../../auth/users";
import GoogleLogin from "react-google-login";
import style from "./Login.module.css";

export function validate(input) {
  let errors = {};
  if (!input.email) {
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

const LoginButton = () => {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const history = useHistory();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

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

  const handleSubmit = async (e) => {
    console.log("entra al submit");
    e.preventDefault();
    try {
      await logIn(input);
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  const responseSuccessGoogle = async (response) => {
    console.log(response);
    await logInGoogle(response);
    history.push("/");
  };
  const responseErrorGoogle = async (response) => {
    console.log(response);
    console.log(response.profileObj);
    history.push("/");
  };

  return (
    <div>
      <h3>Iniciar sesión</h3>
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
                className={errors.username && style.inputdanger}
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
            <Link to="/requestchangepassword">
              <Form.Label>¿Olvidaste tu contraseña?</Form.Label>
            </Link>
            <div>
              {input.email &&
                !errors.email &&
                input.password &&
                !errors.password && (
                  <Button variant="dark" type="submit">
                    Ingresa
                  </Button>
                )}
            </div>
          </Form>
          <div className={style.googleLogin}>
            <GoogleLogin
              clientId={clientId}
              buttonText="Iniciar sesión con Google"
              onSuccess={responseSuccessGoogle}
              onFailure={responseErrorGoogle}
              cookiePolicy={"single_host_origin"}
              isSignedIn={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginButton;
