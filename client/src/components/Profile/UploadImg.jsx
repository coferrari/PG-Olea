import React, { useState, useEffect } from "react";
import axios from "axios";
import { uploadImage } from "../../auth/users";
import { decodeToken } from "../../utils";
const UploadImg = () => {
  const [image, setImage] = useState("");
  const [urlImage, setUrlImage] = useState("");
  const user = decodeToken();
  const sendImage = (e) => {
    e.preventDefault();
    console.log("ws");
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "oleaproyecto");
    console.log(data);
    axios
      .post(
        "https://api.cloudinary.com/v1_1/oleaproyecto2021/image/upload",
        data
      )
      .then((response) => setUrlImage(response.data.url));
  };
  const upload = async () => {
    await uploadImage(urlImage, user.username);
  };
  console.log(urlImage);
  useEffect(() => {
    if (urlImage) {
      upload(urlImage);
    }
  }, [urlImage]);

  return (
    <div>
      <form onSubmit={(e) => sendImage(e)}>
        <div className="btn #64b5f6 blue darken-1">
          <span>Uplaod Image</span>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};
export default UploadImg;
