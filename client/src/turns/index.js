import axios from "axios";
import {
  CREATE_TURN,
  GET_TURN_BY_USER,
  DELETE_TURN,
  GET_TURNS,
} from "../consts";

export const newTurn = async (payload) => {
  const newTurn = await axios.post(CREATE_TURN, payload);
  return newTurn.data;
};

export const getTurnByUser = async (payload) => {
  const turn = await axios.get(`${GET_TURN_BY_USER}/${payload}`);
  return turn.data;
};

export const getTurns = async () => {
  const allTurns = await axios.get(GET_TURNS);
  return allTurns.data;
};

export const deleteTurn = async (id) => {
  const deleted = await axios.delete(`${DELETE_TURN}/${id}`);
  return deleted.data;
};
