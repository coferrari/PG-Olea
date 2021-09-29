import { GET_PRODUCT_DETAIL } from '../actions/types';

const initialState = {
    productDetail : []
}


function productDetailReducer(state = initialState, action) {
    switch (action.type){
        case GET_PRODUCT_DETAIL:
            return {
                ...state,
                productDetail: action.payload
            }
        default: 
            return state;
    }
}

export default productDetailReducer; 