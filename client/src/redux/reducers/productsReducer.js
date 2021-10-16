import { GET_PRODUCTS, FILTER_PRODUCTS_SEARCH } from "../actions/types";

const initialState = {
  allProducts: [],
  products: [],
};

function productsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        allProducts: action.payload,
        products: action.payload
      };
    case FILTER_PRODUCTS_SEARCH:
      const products = state.allProducts;
      const productsFiltered = products.filter((product) => product.name.toLowerCase().includes(action.payload.toLowerCase()))
      return {
        ...state,
        allProducts: products,
        products: productsFiltered
      }
    default:
      return state;
  }
}

export default productsReducer;
