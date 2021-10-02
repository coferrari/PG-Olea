import { ADD_TO_CHART, REMOVE_FROM_CHART } from "../actions/types";

const initialState = {
  productsCarrito: [],
};

export default function carritoReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CHART:
      return {
        ...state,
        productsCarrito: [...state.productsCarrito, action.payload],
      };
    case REMOVE_FROM_CHART:
      return {
        ...state,
        productsCarrito: state.productsCarrito.filter(
          (product) => product.id !== action.payload
        ),
      };
    default:
      return state;
  }
}
