import axios from "axios";
import {
  CHANGE_STATUS,
  CREATE_ORDER_URL,
  FILTER_BY_STATUS,
  GET_ORDER_DETAILS_URL,
  GET_USER_ORDERS,
  ORDER_BY_DATE
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
export const filterByStatus = async (status) => {
  const orderByStatus = await axios.get(`${FILTER_BY_STATUS}/${status}`);
  return orderByStatus.data;
};

export const getUserOrder = async (username) => {
  console.log(username);
  const userOrders = await axios.get(`${GET_USER_ORDERS}/${username}`);
  return userOrders.data;
};

export const orderByDate = async (opcion) => {
  const userOrders = await axios.get(`${ORDER_BY_DATE}/${opcion}`);
  return userOrders.data;
};
