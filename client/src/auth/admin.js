import axios from "axios";
import { getToken } from "../utils";

export const getUsers = async () => {
  const res = await axios.get(`/api/user`, {
    headers: {
      authorization: getToken(),
    },
  });
  return res.data;
};
export const changePasswordAdmin = async (email) => {
  const res = await axios.post(
    `/api/user/changepasswordadmin`,
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
  const res = await axios.delete(`/api/user/deleteuser/${username}`, {
    headers: {
      authorization: getToken(),
    },
  });
  return res.data;
};
export const generateAdminDB = async (username) => {
  console.log(getToken());
  const res = await axios.put(
    `/api/user/generateadmin`,
    { username },
    {
      headers: {
        authorization: getToken(),
      },
    }
  );
  return res.data;
};
