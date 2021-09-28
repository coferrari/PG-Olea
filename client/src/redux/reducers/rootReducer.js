import { combineReducers } from 'redux';
// importar reducers
import productsReducer from './productsReducer';
import searchProductsReducer from './searchProductsReducer';

const rootReducer = combineReducers({
    // aca irian los nombres de los reducers
    productsReducer,
    searchProductsReducer
});

export default rootReducer;

