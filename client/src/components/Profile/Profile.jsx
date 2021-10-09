import React, { useEffect, useState } from "react";
import UploadImg from "./UploadImg";
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
      <UploadImg />
    </div>
  );
};
export default Profile;
