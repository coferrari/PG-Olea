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
      <BarraAdmin />
    </div>
  );
};
export default Profile;
