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
export const createCategory = async (input) => {
  const res = await axios.post(
    `/api/category`,
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
  const res = await axios.delete(`/api/category/${id}`, {
    headers: {
      authorization: getToken(),
    },
  });
  return res.data;
};
export const updateCategory = async (id, nameCategory) => {
  console.log(id, nameCategory);
  const res = await axios.put(
    `/api/category/${id}`,
    {
      nameCategory: nameCategory,
    },
    {
      headers: {
        authorization: getToken(),
      },
    }
  );
  return res.data;
};
