import React, { useEffect } from "react";
import { useParams } from "react-router";
import { desuscribeNewsLetter } from "../../auth/users";
const Desuscribe = () => {
  const { token } = useParams();
  const desuscribe = async () => {
    await desuscribeNewsLetter(token);
  };
  useEffect(() => {
    desuscribe();
  }, [token]);
  return <div>Se ha anulado su suscripción correctamente :(</div>;
};
export default Desuscribe;
