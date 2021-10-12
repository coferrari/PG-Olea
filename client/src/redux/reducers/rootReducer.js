import { combineReducers } from "redux";
import productsReducer from "./productsReducer";
import searchProductsReducer from "./searchProductsReducer";
import productDetailReducer from "./productDetailReducer";
import categoryReducer from "./categoryReducer";
import carritoReducer from "./carritoReducer";

const rootReducer = combineReducers({
  productsReducer,
  searchProductsReducer,
  productDetailReducer,
  categoryReducer,
  carritoReducer,
});

export default rootReducer;
