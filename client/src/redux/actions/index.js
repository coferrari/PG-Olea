import axios from "axios";
import {
  GET_PRODUCTS,
  SEARCH_PRODUCTS,
  GET_PRODUCT_DETAIL,
  CATEGORY_FILTER,
  ALL_CATEGORIES,
  ADD_TO_CHART,
  REMOVE_FROM_CHART,
} from "./types";
import {
  GET_PRODUCTS_URL,
  SEARCH_PRODUCTS_URL,
  GET_PRODUCT_DETAIL_URL,
  CATEGORY_URL,
  //AGREGAR RUTAS BACK
} from "../../consts";

export function getProducts() {
  return function (dispatch) {
    return axios.get(GET_PRODUCTS_URL).then((products) => {
      dispatch({
        type: GET_PRODUCTS,
        payload: products.data,
      });
    });
  };
}

export function searchProducts(name) {
  return function (dispatch) {
    return axios.get(SEARCH_PRODUCTS_URL + name).then((products) => {
      dispatch({
        type: SEARCH_PRODUCTS,
        payload: products.data,
      });
    });
  };
}

export function getProductDetail(id) {
  return function (dispatch) {
    return axios.get(GET_PRODUCT_DETAIL_URL + id).then((product) => {
      dispatch({
        type: GET_PRODUCT_DETAIL,
        payload: product.data,
      });
    });
  };
}

export function getProductsByCategory(id) {
  return function (dispatch) {
    return axios.get(CATEGORY_URL + id).then((products) => {
      dispatch({
        type: CATEGORY_FILTER,
        payload: products.data,
      });
    });
  };
}

export function getCategories() {
  return function (dispatch) {
    return axios.get(CATEGORY_URL).then((categories) => {
      dispatch({
        type: ALL_CATEGORIES,
        payload: categories.data,
      });
    });
  };
}

export function addProductsToChart(product) {
  return {
    type: ADD_TO_CHART,
    payload: product,
  };
}

export function removeProductsFromChart(id) {
  return {
    type: REMOVE_FROM_CHART,
    payload: id,
  };
}


