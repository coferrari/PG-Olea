import React, { useEffect, useState } from "react";
import { decodeToken } from "../../utils";
import BarraAdmin from "./BarraAdmin";
const ProfileAdmin = () => {
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
      <h1>Admin</h1>
    </div>
  );
};
export default ProfileAdmin;
