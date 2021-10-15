import axios from "axios";
import {
  GET_PRODUCTS,
  SEARCH_PRODUCTS,
  GET_PRODUCT_DETAIL,
  CATEGORY_FILTER,
  ALL_CATEGORIES,
  CLEAR_CART,
  UPDATE_CART,
  PAY_MERCADOPAGO,
  CLEAR_DETAIL,
  GET_ORDER_DETAILS,
  GET_WISHLIST,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  CLEAR_WISHLIST
} from "./types";
import {
  GET_PRODUCTS_URL,
  SEARCH_PRODUCTS_URL,
  GET_PRODUCT_DETAIL_URL,
  CATEGORY_URL,
  PAY_MERCADOPAGO_URL,
  GET_ORDER_DETAILS_URL,
  GET_WISHLIST_URL

} from "../../consts";

export function getProducts() {
  return function (dispatch) {
    return axios.get(`${GET_PRODUCTS_URL}`).then((products) => {
      dispatch({
        type: GET_PRODUCTS,
        payload: products.data,
      });
    });
  };
}

export function searchProducts(name) {
  return function (dispatch) {
    return axios.get(`${SEARCH_PRODUCTS_URL}${name}`).then((products) => {
      dispatch({
        type: SEARCH_PRODUCTS,
        payload: products.data,
      });
    });
  };
}

export function getProductDetail(id) {
  return function (dispatch) {
    return axios.get(`${GET_PRODUCT_DETAIL_URL}${id}`).then((product) => {
      dispatch({
        type: GET_PRODUCT_DETAIL,
        payload: product.data,
      });
    });
  };
}

export function getProductsByCategory(name) {
  return function (dispatch) {
    return axios.get(`${CATEGORY_URL}${name}`).then((products) => {
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

export function clearCart() {
  return {
    type: CLEAR_CART,
  };
}

export function updateCart(products) {
  return {
    type: UPDATE_CART,
    payload: products,
  };
}

export function checkoutMercadoPago(itemsCheckout,idOrden) {
  return function (dispatch) {
    axios.post(PAY_MERCADOPAGO_URL, [itemsCheckout, idOrden]).then((response) => {
      dispatch({
        type: PAY_MERCADOPAGO,
        payload: response.data,
      });
    });
  };
}

export function clearDetail() {
  return {
    type: CLEAR_DETAIL,
  };
}


export function getOrderDetails (id) {
  return function (dispatch) {
    axios.get(`${GET_ORDER_DETAILS_URL}/${id}`).
      then((response) => {
      dispatch({
        type: GET_ORDER_DETAILS ,
        payload: response.data,
export function getWishlist(payload) {
  console.log(payload)
  return function (dispatch) {
    return axios.get(GET_WISHLIST_URL, {params: payload}).then((wishlist) => {
      dispatch({
        type: GET_WISHLIST,
        payload: wishlist.data,
      });
    });
  };
}

export function addToWishlist(product) {
  return {
    type: ADD_TO_WISHLIST,
    payload: product
  }
}
export function removeFromWishlist(id) {
  return {
    type: REMOVE_FROM_WISHLIST,
    payload: id
  }
}
export function clearWishlist() {
  return {
    type: CLEAR_WISHLIST
  }
}

