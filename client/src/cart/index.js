import axios from "axios";
import {
  ADD_OR_EDIT_CART,
  REMOVE_CART,
  CREATE_CART_LOGIN,
  EMPTY_CART,
  GET_CARRITO_USERNAME,
  GET_ALL_ORDER,
  GET_ORDER_DETAIL,
  ADD_OFFER_CATEGORY,
  ADD_OFFER_PRODUCT,
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

export const getOrderId = async (id) => {
  return await axios.get(`${GET_ORDER_DETAIL}` + id);
};

export const offerCategory = async (offCat, valor) => {
  return await axios.put(`${ADD_OFFER_CATEGORY}`, {
    categoryID: offCat.idCat,
    offerDay: valor,
    inOffer: offCat.offCat,
  });
};

export const offerProduct = async () => {
  return await axios.put(`${ADD_OFFER_PRODUCT}`);
};
