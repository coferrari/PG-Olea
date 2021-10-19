import axios from "axios";
import { EDIT_STOCK } from "../consts";

export const editStock = async (payload) => {
  return await axios.put(`${EDIT_STOCK}`, payload);
};
