import axios from 'axios';
import { CATEGORY_FILTER, ALL_CATEGORIES } from './types';
import { CATEGORY_URL } from '../../consts';

export function getProductsByCategory(id){
    return function(dispatch){
        return axios.get(CATEGORY_URL + id)
        .then(
            (products) => {
                dispatch({
                    type: CATEGORY_FILTER,
                    payload: products.data
                });
            }
        )
    }
}

export function getCategories(){
    return function(dispatch){
        return axios.get(CATEGORY_URL)
        .then(
            (categories) => {
                dispatch({
                    type: ALL_CATEGORIES,
                    payload: categories.data
                });
            }
        )
    }
}
