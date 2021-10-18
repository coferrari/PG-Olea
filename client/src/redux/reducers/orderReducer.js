import { GET_ORDER_DETAILS } from "../actions/types";

const initialState = {
    orderDetails: []
}

export default function orderReducer(state = initialState, action){
    switch(action.type){
        case GET_ORDER_DETAILS:
            return {
                ...state,
                orderDetails: action.payload
            }
        default: return state;
    }
}