import { GET_PRODUCTS } from './types';
import axios from 'axios';
import { GET_PRODUCTS_URL, SEARCH_PRODUCTS } from '../../consts';



export function getProducts() {
    return function (dispatch) {
        return axios.get(GET_PRODUCTS_URL)
        .then((products) => {
            dispatch ({
                type: GET_PRODUCTS,
                payload: products.data
            })
        })
    }
}

export function searchProducts() {
    return function (dispatch) {
        return axios.get(SEARCH_PRODUCTS_URL)
        .then((products) => {
            dispatch ({
                type: GET_PRODUCTS,
                payload: products.data
            })
        })
    }
}