import axios from "axios";
import {
  CHANGE_STATUS,
  CREATE_ORDER_URL,
  GET_ORDER_DETAILS_URL,
} from "../consts";

export const createOrder = async (payload) => {
  const newOrder = await axios.post(`${CREATE_ORDER_URL}`, payload);
  return newOrder.data.id;
};
export const getOrderDetails = async (id) => {
  const orderDetails = await axios.get(`${GET_ORDER_DETAILS_URL}/${id}`);
  return orderDetails.data;
};
export const changeStatus = async (statusPago, idOrder) => {
  const updateOrder = await axios.put(`${CHANGE_STATUS}/${idOrder}`, {
    estado: statusPago,
  });
  return updateOrder.data;
};
export const getOrderUser = async (username) => {
  console.log(username);
  const orderUser = await axios.get(`/api/order/getuserorder`, {
    username: username,
  });
  console.log(orderUser.data);
};
