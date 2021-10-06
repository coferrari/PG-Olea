import axios from "axios";
import { ADD_TO_WISHLIST_URL, REMOVE_FROM_WISHLIST_URL } from "../consts";

export const addToWishlist = async (payload) => {
  const res = await axios.post(ADD_TO_WISHLIST_URL, { data: payload});
  return res;
};
export const removeFromWishlist = async (payload) => {
  return await axios.delete(REMOVE_FROM_WISHLIST_URL, { data: payload });
};
