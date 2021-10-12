import axios from "axios";
import { CREATE_ORDER } from "../consts";


export const createOrder = async (payload) => {
    return await axios.post(`${CREATE_ORDER}`, payload);
  };