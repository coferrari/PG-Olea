import axios from "axios";
import {
  GET_DELIVERY_URL,
  CHANGE_STATUS_DELIVERY
} from "../consts";


export const getDeliveries = async () => {
    const deliveries = await axios.get(`${GET_DELIVERY_URL}`);
    return deliveries.data;
  };
export const changedelivery = async (id) => {
    const Changedeliveries = await axios.put(`${CHANGE_STATUS_DELIVERY}/${id}`);
    return Changedeliveries.data;
  };