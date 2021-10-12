import axios from "axios";
import { CREATE_ORDER_URL } from "../consts";


export const createOrder = async (payload) => {
    return await axios.post(`${CREATE_ORDER_URL}`, payload);
  };