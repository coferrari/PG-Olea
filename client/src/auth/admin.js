import axios from "axios";
import { getToken } from "../utils";
const baseUrl = "http://localhost:3001/api/admin";
const usersUrl = "http://localhost:3001/api/user";
export const getUsers = async () => {
  const res = await axios.get(`${usersUrl}`, {
    headers: {
      authorization: getToken(),
    },
  });
  return res.data;
};
export const changePasswordAdmin = async (email) => {
  const res = await axios.post(
    `${usersUrl}/changepasswordadmin`,
    { email },
    {
      headers: {
        authorization: getToken(),
      },
    }
  );
  return res.data;
};
export const removeUserDB = async (username) => {
  const res = await axios.delete(`${usersUrl}/deleteuser/${username}`, {
    headers: {
      authorization: getToken(),
    },
  });
  return res.data;
};
export const generateAdminDB = async (username) => {
  console.log(getToken());
  const res = await axios.put(
    `${usersUrl}/generateadmin`,
    { username },
    {
      headers: {
        authorization: getToken(),
      },
    }
  );
  return res.data;
};
