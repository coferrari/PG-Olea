import { combineReducers } from 'redux';
// importar reducers
import productsReducer from './productsReducer';
import searchProductsReducer from './searchProductsReducer';
import productDetailReducer from './productDetailReducer';

const rootReducer = combineReducers({
    // aca irian los nombres de los reducers
    productsReducer,
    searchProductsReducer,
    productDetailReducer
});

export default rootReducer;

