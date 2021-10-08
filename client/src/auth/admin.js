import axios from "axios";
import { getToken } from "../utils";
const baseUrl = "http://localhost:3001/api/admin";
const usersUrl = "http://localhost:3001/api/user";
const productUrl = "http://localhost:3001/api/category";
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
export const createCategory = async (input) => {
  const res = await axios.post(
    `${productUrl}`,
    { nameCategory: input.texto },
    {
      headers: {
        authorization: getToken(),
      },
    }
  );
  return res.data;
};
export const deleteCategory = async (id) => {
  const res = await axios.delete(`${productUrl}/${id}`, {
    headers: {
      authorization: getToken(),
    },
  });
  return res.data;
};
export const updateCategory = async (id, nameCategory) => {
  console.log(id, nameCategory);
  const res = await axios.put(`${productUrl}/${id}`, {
    nameCategory: nameCategory,
  });
  return res.data;
};
