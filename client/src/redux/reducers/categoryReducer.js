import { CATEGORY_FILTER, ALL_CATEGORIES } from '../actions/types';

const initialState = {
    categories: [],
    productsByCategory: []
}

export default function categoryReducer(state = initialState, action){
    switch(action.type){
        case CATEGORY_FILTER:
            return {
                ...state,
                productsByCategory: action.payload
            }
        case ALL_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            }
        default: return state;
    }
}