import { GET_STORES } from "../actions/types";

const initialState = {
  stores: [],
};

function storesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_STORES:
      return { ...state, stores: action.payload };
    default:
      return state;
  }
}

export default storesReducer;
