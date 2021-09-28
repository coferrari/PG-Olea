import React from "react";
import ReactDOM from "react-dom";
import dotenv from "dotenv";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";
dotenv.config();

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-q0-1vzk1.us.auth0.com"
      clientId="C8yNpVeb83BZE3wMsCneJD3ExfNnOHJ3"
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
