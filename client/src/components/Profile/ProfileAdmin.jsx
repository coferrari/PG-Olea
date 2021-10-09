import React, { useEffect, useState } from "react";
import { decodeToken } from "../../utils";
import UploadImg from "./UploadImg";
import BarraAdmin from "./BarraAdmin";
const ProfileAdmin = () => {
  const [usuario, setUsuario] = useState();
  const profile = () => {
    let user = decodeToken();
    setUsuario(user);
  };
  useEffect(() => {
    profile();

  }, [UploadImg]);
  return (
    <div> 
      <img src={usuario ? usuario.picture : null}></img>
  console.log(usuario);
  return (
    <div>
      <h1>Admin</h1>
     <UploadImg />
     <BarraAdmin />
      <img src={usuario ? usuario.picture : null}></img>
    </div>
  );
};
export default ProfileAdmin;
