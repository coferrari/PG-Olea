import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Form, Button, Modal } from "react-bootstrap";
import { logIn, logInGoogle, codeLogin } from "../../auth/users";
import GoogleLogin from "react-google-login";
import style from "./Login.module.css";
import { createCartLogin, getByUsername } from "../../cart/index";
import { isAuthorized, decodeToken } from "../../utils/index";
import { useDispatch } from "react-redux";
import { updateCart } from "../../redux/actions/index";

export function validate(input) {
  let errors = {};
  if (!input.email) {
    errors.email = "Por favor ingrese su email";
  } else if (!/\S+@\S+\.\S+/.test(input.email)) {
    errors.email = "El email ingresado no es válido";
  } else if (!input.password) {
    errors.password = "Por favor ingrese su contraseña";
  } else if (
    !/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(input.password)
  ) {
    errors.password = "El formato de contraseña no es valido";
  }
  return errors;
}
const LoginButton = () => {
  const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");
  const dispatch = useDispatch();
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const history = useHistory();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [code, setCode] = useState("");
  const [smShow, setSmShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [errorCode, setErrorCode] = useState("");
  const [errorLogin, setErrorLogin] = useState("");
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
  const codeChange = (e) => {
    setCode(e.target.value);
  };
  const codeSubmit = async (e) => {
    e.preventDefault();
    try {
      await codeLogin(code);
      history.push("/");
    } catch (err) {
      setErrorCode("Su codigo es incorrecto o expiro");
      console.log(err.message);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let x = await logIn(input);
      if (x.msg) {
        return setSmShow(true);
      }
      const validate = isAuthorized();
      history.push("/home");
      if (validate) {
        const user = decodeToken();
        const username = user.username;
        if (cartFromLocalStorage.length > 0) {
          createCartLogin({
            products: cartFromLocalStorage,
            username: username,
          });
        } else if (cartFromLocalStorage.length === 0) {
          const productsDB = await getByUsername({
            username: username,
          });
          if (productsDB.data.products.length) {
            localStorage.setItem(
              "cart",
              JSON.stringify(productsDB.data.products)
            );
            dispatch(updateCart(productsDB.data.products));
          }
        }
      }
    } catch (err) {
      console.log(err.message);
      setErrorLogin("Contraseña o usuario incorrecto");
    }
  };

  const responseSuccessGoogle = async (response) => {
    await logInGoogle(response);
    const validate = isAuthorized();
    history.push("/");
    if (validate) {
      const user = decodeToken();
      const username = user.username;
      if (cartFromLocalStorage.length > 0) {
        createCartLogin({
          products: cartFromLocalStorage,
          username: username,
        });
      } else if (cartFromLocalStorage.length === 0) {
        const productsDB = await getByUsername({
          username: username,
        });
        if (productsDB.data.products.length) {
          localStorage.setItem(
            "cart",
            JSON.stringify(productsDB.data.products)
          );
          dispatch(updateCart(productsDB.data.products));
        }
      }
    }
  };

  const responseErrorGoogle = async (response) => {
    // history.push("/");
  };

  return (
    <div className={style.container}>
      <h3 className={style.title}>Iniciar sesión</h3>
      <div className="container">
        <div className="col-lg-4 mx-auto text-center">
          <Form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                className={errors.username && style.inputdanger}
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
                placeholder="Ingresá tu contraseña"
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
                    Iniciar sesión
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
            />
          </div>
          <div className={style.errors}>{errorLogin ? errorLogin : ""}</div>
          <Modal
            size="sm"
            show={smShow}
            onHide={() => setSmShow(false)}
            aria-labelledby="example-modal-sizes-title-sm"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-sm">
                Codigo de confirmación
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form
                onSubmit={(e) => {
                  codeSubmit(e);
                }}
              >
                <Form.Group className="mb-3">
                  <Form.Label>Ingrese su codigo</Form.Label>
                  <Form.Control
                    type="codigo"
                    placeholder="Ingrese nombre de la categoria"
                    name="texto"
                    onChange={(e) => codeChange(e)}
                  />
                </Form.Group>
                <Button type="submit">Verificar</Button>
                <div className={style.errors}>{errorCode ? errorCode : ""}</div>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default LoginButton;
