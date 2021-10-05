import React from "react";
import { useHistory } from "react-router-dom";
import { logOut } from "../../auth/users";
import { Button } from "react-bootstrap";
import style from "./Logout.module.css";

const LogoutButton = () => {
  const history = useHistory();
  const handleClick = (e) => {
    e.preventDefault();
    logOut();
    console.log('logout ok')
    history.push("/");
  };

  return (
    <div className={style.container}>
     <h3 className={style.title}>¿seguro que deseas salir?</h3>
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
