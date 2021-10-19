import React from "react";
import { confirmRegister } from "../../auth/users";
import { useHistory, useParams } from "react-router";
import { Button } from "react-bootstrap";
import style from "./ConfirmRegister.module.css";
import swal from "sweetalert";

const ConfirmRegister = () => {
  const history = useHistory();
  const { token } = useParams();
  const handleSubmit = async () => {
    await confirmRegister(token);
    history.push("/login");
  };

  return (
    <div className={style.container}>
      <Button className={style.buttonConfirm} variant="dark" type="submit" onClick={handleSubmit}>
        Confirmar registro
      </Button>
    </div>
  );
};
export default ConfirmRegister;
