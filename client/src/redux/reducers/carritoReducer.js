import {
  CLEAR_CART,
  UPDATE_CART
} from "../actions/types";

const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");

const initialState = {
  productsCarrito: cartFromLocalStorage,
};

export default function carritoReducer(state = initialState, action) {
  switch (action.type) {

    case CLEAR_CART:
      return {
        ...state,
        productsCarrito: [],
      };

      case UPDATE_CART: 
      return {
        ...state,
        productsCarrito: action.payload
      }
    default:
      return state;
  }
}
