import { combineReducers } from "redux";
import productsReducer from "./productsReducer";
import searchProductsReducer from "./searchProductsReducer";
import productDetailReducer from "./productDetailReducer";
import categoryReducer from "./categoryReducer";
import carritoReducer from "./carritoReducer";
import wishlistReducer from "./wishlistReducer";

const rootReducer = combineReducers({
  productsReducer,
  searchProductsReducer,
  productDetailReducer,
  categoryReducer,
  carritoReducer,
  wishlistReducer
});

export default rootReducer;
