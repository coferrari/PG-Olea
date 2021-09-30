import React from "react";
import { useHistory } from "react-router-dom";
import { logOut } from "../../auth/users";

const LogoutButton = () => {
  const history = useHistory();
  const handleClick = (e) => {
    e.preventDefault();
    logOut();
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
    </div>
  );
};

export default LogoutButton;
