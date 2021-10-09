import React, { useEffect, useState } from "react";
import { decodeToken } from "../../utils";
import UploadImg from "./UploadImg";
const ProfileAdmin = () => {
  const [usuario, setUsuario] = useState();
  const profile = () => {
    let user = decodeToken();
    setUsuario(user);
  };
  useEffect(() => {
    profile();
  }, [UploadImg]);
  console.log(usuario);
  return (
    <div>
      <h1>Admin</h1>
      <h1>{usuario ? usuario.name : "Dylan"}</h1>
      <h2>{usuario ? usuario.email : "Gavilan"}</h2>

      <UploadImg />
      <img src={usuario ? usuario.picture : null}></img>
    </div>
  );
};
export default ProfileAdmin;
