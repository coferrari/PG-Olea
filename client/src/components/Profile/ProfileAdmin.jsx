import React, { useEffect, useState } from "react";

import { getToken, decodeToken } from "../../utils";
import ChangePerfil from "./UploadImg";
import Profile from "./Profile";
const ProfileAdmin = () => {
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
          <Profile />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default ProfileAdmin;
