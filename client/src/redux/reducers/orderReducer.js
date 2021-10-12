import {
  CREATE_ORDER
  } from "../actions/types";
  
  
  const initialState = {
      dataOrder: {}
  };
  
  export default function createOrder(state = initialState, action) {
    switch (action.type) {
  
      case CREATE_ORDER:
        return {
          ...state,
          dataOrder: action.payload
        };

      default:
        return state;
    }
  }