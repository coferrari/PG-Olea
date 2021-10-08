import React from "react";
import { useHistory } from "react-router-dom";
import { logOut } from "../../auth/users";
import { Button } from "react-bootstrap";
import style from "./Logout.module.css";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/actions/index";

const LogoutButton = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleClick = (e) => {
    e.preventDefault();
    logOut();
    localStorage.setItem("cart", JSON.stringify([]));
    dispatch(clearCart([]));
    history.push("/");
  };

  return (
    <div className={style.container}>
      <h3 className={style.title}>¿seguro que deseas salir?</h3>
      <Button
        variant="dark"
        type="submit"
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
