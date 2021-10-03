import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from "../actions/types";

const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");

const initialState = {
  productsCarrito: cartFromLocalStorage,
};

export default function carritoReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        productsCarrito: [...state.productsCarrito, action.payload],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        productsCarrito: state.productsCarrito.filter(
          (product) => product.id !== action.payload
        ),
      };
    case CLEAR_CART:
      return {
        ...state,
        productsCarrito: [],
      };
    default:
      return state;
  }
}
