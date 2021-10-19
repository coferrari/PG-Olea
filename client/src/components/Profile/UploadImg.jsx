import React, { useEffect, useState } from "react";
import { decodeToken } from "../../utils";
import axios from "axios";
import style from "./ProfileAdmin.module.css";
import { updateProfile } from "../../auth/users";
import { Button, Form, Modal } from "react-bootstrap";
import { getToken } from "../../utils";
const ChangePerfil = () => {
  const [urlImage, setUrlImage] = useState("");
  const [usuario, setUsuario] = useState();
  const [token, setToken] = useState();
  const [show, setShow] = useState(false);
  const [input, setInput] = useState({
    name: "",
    surname: "",
    phone: "",
    adress: "",
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
    setUrlImage(user.picture);
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
    let user = {
      name: "",
      surname: "",
      image: "",
    };
    input.name ? (user.name = input.name) : (user.name = usuario.name);
    input.surname
      ? (user.surname = input.surname)
      : (user.surname = usuario.surname);
    user.image = urlImage;
    input.phone ? (user.phone = input.phone) : (user.phone = usuario.phone);
    input.adress
      ? (user.adress = input.adress)
      : (user.adress = usuario.adress);
    await updateProfile(user);
  };
  console.log(urlImage);
  const sendUpdates = async (e) => {
    e.preventDefault();
    await upload();
    window.location.reload(false);
  };
  useEffect(() => {
    newToken();
  }, [token]);
  return (
    <div>
      <Button className={style.buttonEditProfile} variant="dark" onClick={() => setShow(true)}>
        Editar perfil
      </Button>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Editar Perfil
          </Modal.Title>
        </Modal.Header>
        {usuario ? (
          <Modal.Body>
            <Form
              onSubmit={(e) => {
                sendUpdates(e);
              }}
            >
              <Form.Group>
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
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  id="name"
                  defaultValue={usuario.name}
                  placeholder="Your name"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  type="text"
                  name="surname"
                  id="surname"
                  defaultValue={usuario.surname}
                  placeholder="Your name"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Telefono</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  id="surname"
                  defaultValue={usuario.phone}
                  placeholder="Telefono"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Direccion</Form.Label>
                <Form.Control
                  type="text"
                  name="adress"
                  id="adress"
                  defaultValue={usuario.adress}
                  placeholder="Direccion"
                  onChange={handleChange}
                />
              </Form.Group>
              <Button type="submit">Crear</Button>
            </Form>
          </Modal.Body>
        ) : (
          ""
        )}
      </Modal>
    </div>
  );
};
export default ChangePerfil;
