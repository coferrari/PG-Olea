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
    history.push("/");
  };
  const handleSubmitPrueba = async () => {
    const users = await getUsers(token);
    console.log(users);
  };
  return (
    <div>
      <Button variant="dark" type="submit" onClick={handleSubmit}>
        Confirmar registro

      </button>
      <button onClick={handleSubmitPrueba}>Prueba</button>
      </Button>

    </div>
  );
};
export default ConfirmRegister;
