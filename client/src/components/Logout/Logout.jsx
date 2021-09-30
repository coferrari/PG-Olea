import React from "react";
import { Link, useHistory } from "react-router-dom";
import { logOut } from "../../auth/users";
import { GoogleLogout, useGoogleLogout } from "react-google-login";
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const LogoutButton = () => {
  const history = useHistory();
  const handleClick = (e) => {
    e.preventDefault();
    logOut();
    history.push("/");
  };
  const onSuccess = (response) => {
    alert("Logout ok");
    history.push("/");
  };
  return (
    <div>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Log Out
      </button>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
};

export default LogoutButton;
