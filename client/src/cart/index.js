import axios from "axios";
import {
  ADD_OR_EDIT_CART,
  REMOVE_CART,
  CREATE_CART_LOGIN,
  EMPTY_CART,
  GET_CARRITO_USERNAME,
  GET_ALL_ORDER,
} from "../consts";

export const addOrEditCart = async (payload) => {
  return await axios.post(`${ADD_OR_EDIT_CART}`, payload);
};

export const removeProductCart = async (payload) => {
  return await axios.delete(`${REMOVE_CART}`, { data: payload });
};

export const createCartLogin = async (payload) => {
  return await axios.post(`${CREATE_CART_LOGIN}`, payload);
};

export const emptyCart = async (payload) => {
  return await axios.delete(`${EMPTY_CART}`, { data: payload });
};

export const getByUsername = async (payload) => {
  return await axios.get(`${GET_CARRITO_USERNAME}`, { params: payload });
};

export const getAllOrder = async () => {
  return await axios.get(`${GET_ALL_ORDER}`);
};
