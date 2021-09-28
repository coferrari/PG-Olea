import { SEARCH_PRODUCTS } from '../actions/types';

const initialState = {
    searchedProducts = []
}


function searchProductsReducer(state = initialState, action) {
    switch (action.type){
        case SEARCH_PRODUCTS:
            return {
                ...state,
                searchedProducts: action.payload
            }
        default: 
            return state;
    }
}

export default searchProductsReducer; 