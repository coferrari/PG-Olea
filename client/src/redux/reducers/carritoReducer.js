import {
  CLEAR_CART,
  UPDATE_CART,
  PAY_MERCADOPAGO
} from "../actions/types";

const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");

const initialState = {
  productsCarrito: cartFromLocalStorage,
  linkPago: ""
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
      case PAY_MERCADOPAGO:
        return {
          ...state,
          linkPago: action.payload
        }
    default:
      return state;
  }
}
