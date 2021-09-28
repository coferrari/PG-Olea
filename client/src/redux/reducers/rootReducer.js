import { combineReducers } from 'redux';
// importar reducers
import productsReducer from './productsReducer';

const rootReducer = combineReducers({
    // aca irian los nombres de los reducers
    productsReducer
});

export default rootReducer;

