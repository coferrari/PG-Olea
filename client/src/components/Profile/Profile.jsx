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
    console.log(usuario);
  };
  useEffect(() => {
    newToken();
  }, [token]);
  return (
    <div>
      {usuario ? (
        <div>
          <img
            src={usuario.picture}
            alt={usuario.username}
            className={style.imagen}
          />
          <h3>
            {usuario.name} {usuario.surname}
          </h3>
          <div>
            <h3>{usuario.email}</h3>
          </div>
          <div>{usuario.phone}</div>
          <div>{usuario.adress}</div>
          <div>
            <ChangePerfil />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Profile;
