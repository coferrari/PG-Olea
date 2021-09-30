import React from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { logIn } from "../../auth/users";
import GoogleLogin from "react-google-login";
const LoginButton = () => {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
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
  const responseSuccessGoogle = (response) => {
    console.log(response);
    console.log(response.profileObj);
    // despachar accion a back / post  || tokenId: response.tokenId
    history.push("/");
  };
  const responseErrorGoogle = (response) => {
    console.log(response);
    console.log(response.profileObj);
    history.push("/");
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
      <GoogleLogin
        clientId={clientId}
        buttonText="Iniciar sesión con Google"
        onSuccess={responseSuccessGoogle}
        onFailure={responseErrorGoogle}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </div>
  );
};

export default LoginButton;
