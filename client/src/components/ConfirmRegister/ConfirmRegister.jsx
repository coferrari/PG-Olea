import React from "react";
import { confirmRegister } from "../../auth/users";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
const ConfirmRegister = () => {
  const history = useHistory();
  const { token } = useParams();
  const handleSubmit = async () => {
    await confirmRegister(token);
    history.push("/");
  };
  return (
    <div>
      <button type="submit" onClick={handleSubmit}>
        Confirmar registro
      </button>
    </div>
  );
};
export default ConfirmRegister;
