import axios from "axios";
import { CREATE_ORDER_URL } from "../consts";


export const createOrder = async (payload) => {
    const newOrder = await axios.post(`${CREATE_ORDER_URL}`, payload);
    return newOrder.data.id
  };
