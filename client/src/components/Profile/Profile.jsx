import React, { useEffect, useState } from "react";
import style from "./ProfileAdmin.module.css";
import { getToken, decodeToken } from "../../utils";
import ChangePerfil from "./UploadImg";
const Profile = () => {
  const [usuario, setUsuario] = useState();
  const [token, setToken] = useState();
  const newToken = () => {
    const tokenNuevo = getToken();
    setToken(tokenNuevo);
    let user = decodeToken();
    setUsuario(user);
  };
  useEffect(() => {
    newToken();
  }, [token]);
  return (
    <div>
      {usuario ? (
        <div>
          {" "}
          <img src={usuario.picture} alt={usuario.username} />
          <h3>{usuario.name}</h3>
          <h3>{usuario.surname}</h3>
          <ChangePerfil />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Profile;
