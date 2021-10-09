import React, { useEffect, useState } from "react";
import BarraAdmin from "./BarraAdmin";
import { decodeToken } from "../../utils";
const Profile = () => {
  const [usuario, setUsuario] = useState();
  const profile = () => {
    let user = decodeToken();
    setUsuario(user);
  };
  useEffect(() => {
    profile();
  }, [decodeToken]);
  console.log(usuario);
  return (
    <div>
      <h1>Usuario</h1>
    </div>
  );
};
export default Profile;
