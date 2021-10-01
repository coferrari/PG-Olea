import axios from "axios";
import { getToken } from "../utils";
const baseUrl = "http://localhost:3001/api/user";

export const register = async (user) => {
  console.log("entre");
  return await axios.post(`${baseUrl}/register`, user);
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
  console.log(res.data.data.token);
  return res.data;
};
export const registerGoogle = async (response) => {
  const res = await axios.post(`${baseUrl}/googleregister`, {
    token: response.tokenId,
  });
};
export const confirmRegister = async (data) => {
  const res = await axios.post(`${baseUrl}/confirmregister`, { token: data });
};
