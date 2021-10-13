import {
  GET_WISHLIST,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
} from "../actions/types";

const initialState = {
  wishlist: [],
};

export default function wishlistReducer(state = initialState, action) {
  switch (action.type) {
    case GET_WISHLIST:
      return {
        ...state,
        wishlist: action.payload,
      };
    case ADD_TO_WISHLIST:
        return {
            ...state,
            wishlist: [...state.wishlist, action.payload]
        }
    case REMOVE_FROM_WISHLIST:
        return {
            ...state,
            wishlist: state.wishlist.filter((product) => product.id !== action.payload)
        }

    default:
      return state;
  }
}
