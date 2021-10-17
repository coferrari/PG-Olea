import {
  CATEGORY_FILTER,
  ALL_CATEGORIES,
  FILTER_CATEGORIES_SEARCH,
} from "../actions/types";

const initialState = {
  categories: [],
  allProductsByCategory: [],
  productsByCategory: []
};

export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case CATEGORY_FILTER:
      return {
        ...state,
        productsByCategory: action.payload,
        allProductsByCategory: action.payload,
      };
    case FILTER_CATEGORIES_SEARCH:
      const products = state.allProductsByCategory;
      const productsFiltered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(action.payload.toLowerCase()) ||
          product.description.toLowerCase().includes(action.payload.toLowerCase())
      );
      return {
        ...state,
        allProductsByCategory: products,
        productsByCategory: productsFiltered
      };
    case ALL_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    default:
      return state;
  }
}
