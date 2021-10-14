import React, { useEffect, useState } from "react";
import style from "./ProfileAdmin.module.css";
import { getToken, decodeToken } from "../../utils";
import ChangePerfil from "./UploadImg";
import { BsPersonSquare } from "react-icons/bs";
import UserOrders from "../UserOrders/UserOrders";

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
    <div className="container">
      {usuario ? (
        <div className={style.containerprofile}>
          {usuario.picture ? (
            <img
              src={usuario.picture}
              alt={usuario.username}
              className={style.imagen}
            />
          ) : (
            <BsPersonSquare className={style.iconprofile} />
          )}
          <h3 className={style.name}>
            {usuario.name} {usuario.surname}
          </h3>
          <div>
            <h3 className={style.mail}>{usuario.email}</h3>
          </div>
          <div className={style.mail}>{usuario.phone}</div>
          <div className={style.mail}>{usuario.adress}</div>
          <div>
            <ChangePerfil />
          </div>
          <div>
            <UserOrders />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Profile;
