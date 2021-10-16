import { combineReducers } from "redux";
import productsReducer from "./productsReducer";
import productDetailReducer from "./productDetailReducer";
import categoryReducer from "./categoryReducer";
import carritoReducer from "./carritoReducer";
import orderReducer from "./orderReducer";
import wishlistReducer from "./wishlistReducer";


const rootReducer = combineReducers({
  productsReducer,
  productDetailReducer,
  categoryReducer,
  carritoReducer,
  orderReducer,
  wishlistReducer
});

export default rootReducer;
