import React from "react";
import { Link, useHistory } from "react-router-dom";
import { logOut } from "../../auth/users";
const LogoutButton = () => {
  const history = useHistory();
  const handleClick = (e) => {
    e.preventDefault();
    logOut();
    history.push("/");
  };
  return (
    <button
      onClick={(e) => {
        handleClick(e);
      }}
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
