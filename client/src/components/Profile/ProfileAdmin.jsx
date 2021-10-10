import React, { useEffect, useState } from "react";
import { decodeToken } from "../../utils";
import axios from "axios";
import style from "./ProfileAdmin.module.css";
import { uploadImage, updateNames } from "../../auth/users";
import BarraAdmin from "./BarraAdmin";
import { getToken } from "../../utils";
const ProfileAdmin = () => {
  const [urlImage, setUrlImage] = useState("");
  const [usuario, setUsuario] = useState();
  const [token, setToken] = useState();
  const [input, setInput] = useState({
    name: "",
    surname: "",
  });
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const newToken = () => {
    const tokenNuevo = getToken();
    setToken(tokenNuevo);
    let user = decodeToken();
    setUsuario(user);
  };
  const changeAvatar = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", e.target.files[0]);
    data.append("upload_preset", "oleaproyecto");
    axios
      .post(
        "https://api.cloudinary.com/v1_1/oleaproyecto2021/image/upload",
        data
      )
      .then((response) => setUrlImage(response.data.url));
  };
  const upload = async () => {
    await uploadImage(urlImage, usuario.username);
    window.location.reload(false);
  };
  const updateInfo = async () => {
    await updateNames(input, usuario.username);
  };
  const sendUpdates = async (e) => {
    e.preventDefault();
    if (urlImage) {
      await upload();
    }
    if (input.name || input.surname) {
      await updateInfo();
    }
  };
  useEffect(() => {
    newToken();
  }, [token]);
  return (
    <div>
      <h1>Admin</h1>
      <BarraAdmin />
      {usuario ? (
        <form onSubmit={(e) => sendUpdates(e)}>
          <div>
            <img
              src={urlImage ? urlImage : usuario ? usuario.picture : null}
              alt={usuario.username}
              className={style.imagen}
            ></img>
            <span>
              <i className="fas fa-camera"></i>
              <p>Change</p>
              <input
                type="file"
                name="file"
                id="file_up"
                onChange={changeAvatar}
              />
            </span>
          </div>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              name="name"
              id="name"
              defaultValue={usuario.name}
              placeholder="Your name"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Apellido</label>
            <input
              type="text"
              name="surname"
              id="surname"
              defaultValue={usuario.surname}
              placeholder="Your name"
              onChange={handleChange}
            />
          </div>
          <button type="submit"> Guardar</button>
        </form>
      ) : (
        ""
      )}
    </div>
  );
};
export default ProfileAdmin;
