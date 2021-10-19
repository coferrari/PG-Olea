import axios from "axios";
import { CREATE_TURN, GET_TURN_BY_USER } from "../consts";

export const newTurn = async (payload) => {
  const newTurn = await axios.post(CREATE_TURN, payload);
  return newTurn.data;
};

export const getTurnByUser = async (payload) => {
  const turn = await axios.get(`${GET_TURN_BY_USER}/${payload}`);
  return turn.data;
};
