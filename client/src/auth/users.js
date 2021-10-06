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
  localStorage.setItem("token", token.data.data.token);
  return token.data;
};
export const logOut = () => {
  window.localStorage.removeItem("token");
};
export const logInGoogle = async (response) => {
  const res = await axios.post(`/api/user/googlelogin`, {
    token: response.tokenId,
  });
  localStorage.setItem("token", res.data.data.token);
  return res.data;
};
export const confirmRegister = async (data) => {
  const res = await axios.post(`/api/user/confirmregister`, { token: data });
};
export const getUsers = async (token) => {
  const res = await axios.get(`/api/user`, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};
