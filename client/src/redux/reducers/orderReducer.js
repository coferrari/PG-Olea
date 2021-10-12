import {
    COLLECT_USERNAME
  } from "../actions/types";
  
  
  const initialState = {
      dataOrder: {
          username: "",
          price: "",
          products: "",
          addres: "",
          addresNum: ""
      }
  };
  
  export default function orderReducer(state = initialState, action) {
    switch (action.type) {
  
      case COLLECT_USERNAME:
        return {
          ...state,
          dataOrder: {
              username: action.payload
          }
        };

      default:
        return state;
    }
  }