import axios from "axios";
import { CREATE_TURN } from "../consts";

export const newTurn = async (payload) => {
  console.log(payload);
  const newTurn = await axios.post(CREATE_TURN, payload);
  return newTurn.data;
};
