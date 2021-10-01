import React from "react";
import { useHistory } from "react-router-dom";
import { logOut } from "../../auth/users";
import { Button } from "react-bootstrap";

const LogoutButton = () => {
  const history = useHistory();
  const handleClick = (e) => {
    e.preventDefault();
    logOut();
    console.log('logout ok')
    history.push("/");
  };

  return (
    <div>
      <Button variant="dark" type="submit"
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Log Out
      </Button>
    </div>
  );
};

export default LogoutButton;
