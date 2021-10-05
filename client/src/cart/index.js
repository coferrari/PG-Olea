import axios from "axios";
import { ADD_OR_EDIT_CART, REMOVE_CART } from "../consts";

export const addOrEditCart = async (payload) => {
  const res = await axios.post(`${ADD_OR_EDIT_CART}`, payload);
  return res;
};
export const removeProductCart = async (payload) => {
  console.log(payload);
  return await axios.delete(`${REMOVE_CART}`, { data: payload });
};
