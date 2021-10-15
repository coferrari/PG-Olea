import axios from "axios";
import { getToken } from "../utils";

export const register = async (user) => {
  return await axios.post(`/api/user/register`, user);
};
export const requestChangePassword = async (email) => {
  return await axios.post(`/api/user/requestchangepassword`, { email: email });
};
export const changePassword = async (email, password, token) => {
  return await axios.put(`/api/user/changepassword`, {
    email: email,
    password: password,
    token: token,
  });
};
export const logIn = async (user) => {
  const token = await axios.post(`/api/user/login`, user);
  if (token.data.msg) {
    localStorage.setItem("user", token.data.username);
    return token.data;
  } else {
    localStorage.setItem("token", token.data.data.token);
    return token.data;
  }
};
export const codeLogin = async (code) => {
  console.log(code);
  const user = localStorage.getItem("user");
  console.log("user");
  const token = await axios.post(`/api/user/authenticateadmin`, {
    code: code,
    username: user,
  });
  localStorage.setItem("token", token.data.data.token);
};

export const logOut = async () => {
  localStorage.clear();
};
export const logInGoogle = async (response) => {
  const res = await axios.post(`/api/user/googlelogin`, {
    token: response.tokenId,
  });
  localStorage.setItem("token", res.data.data.token);
  return res.data;
};
export const confirmRegister = async (data) => {
  return await axios.post(`/api/user/confirmregister`, { token: data });
};
export const getUsers = async (token) => {
  const res = await axios.get(`/api/user`, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};
export const updateProfile = async (usuario) => {
  const tokenRefresh = await axios.put(`/api/user/updateprofile`, {
    usuario: usuario,
    token: getToken(),
  });
  localStorage.setItem("token", tokenRefresh.data.data.token);
};
export const suscribeNewsLetter = async (email) => {
  console.log(email);
  const res = await axios.post(`/api/news/suscribe`, { email: email });
  return res.data;
};
