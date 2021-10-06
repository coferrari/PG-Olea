import {
    GET_WISHLIST,
  } from "../actions/types";

  const initialState = {
    wishlist: [],
  };
  
  export default function wishlistReducer(state = initialState, action) {
    switch (action.type) {
  
      case GET_WISHLIST:
        console.log(action.payload);
        return {
          ...state,
          wishlist: action.payload
        };

      default:
        return state;
    }
  }