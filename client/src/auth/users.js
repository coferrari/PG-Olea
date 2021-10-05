import axios from "axios";
import { getToken } from "../utils";
const baseUrl = "http://localhost:3001/api/user";

export const register = async (user) => {
  return await axios.post(`${baseUrl}/register`, user);
};
export const requestChangePassword = async (email) => {
  return await axios.post(`${baseUrl}/requestchangepassword`, { email: email });
};
export const changePassword = async (email, password) => {
  return await axios.put(`${baseUrl}/changepassword`, {
    email: email,
    password: password,
  });
};
export const logIn = async (user) => {
  const token = await axios.post(`${baseUrl}/login`, user);
  localStorage.setItem("token", token.data.data.token);
  return token.data;
};
export const logOut = () => {
  window.localStorage.removeItem("token");
};
export const logInGoogle = async (response) => {
  const res = await axios.post(`${baseUrl}/googlelogin`, {
    token: response.tokenId,
  });
  localStorage.setItem("token", res.data.data.token);
  return res.data;
};
export const confirmRegister = async (data) => {
  const res = await axios.post(`${baseUrl}/confirmregister`, { token: data });
};
export const getUsers = async (token) => {
  const res = await axios.get(`${baseUrl}`, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};
