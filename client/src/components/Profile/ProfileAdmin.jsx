import React, { useEffect, useState } from "react";
import { decodeToken } from "../../utils";
import BarraAdmin from "./BarraAdmin";
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
