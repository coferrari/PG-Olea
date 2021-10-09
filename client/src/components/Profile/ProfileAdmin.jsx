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
  }, [decodeToken]);
  console.log(usuario);
  return (
    <div>
      {/* <h1>{usuario.name ? usuario.name : "Dylan"}</h1>
      <h2>{usuario.surname ? usuario.surname : "Gavilan"}</h2> */}
      <h2>{usuario.email}</h2>
      <img src={usuario ? usuario.picture : null}></img>
      <UploadImg />
    </div>
  );
};
export default ProfileAdmin;
