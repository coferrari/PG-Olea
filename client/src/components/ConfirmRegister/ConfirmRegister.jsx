import React from "react";
import { confirmRegister, getUsers } from "../../auth/users";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";

const ConfirmRegister = () => {
  const history = useHistory();
  const { token } = useParams();
  const handleSubmit = async () => {
    await confirmRegister(token);
    history.push("/login");
  };
  const handleSubmitPrueba = async () => {
    const users = await getUsers(token);
  };
  return (
    <div>
      <Button variant="dark" type="submit" onClick={handleSubmit}>
        Confirmar registro
      </Button>
      <Button variant="dark" type="submit" onClick={handleSubmitPrueba}>
        Prueba
      </Button>
    </div>
  );
};
export default ConfirmRegister;
