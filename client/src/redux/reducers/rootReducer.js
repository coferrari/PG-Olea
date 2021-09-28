import { combineReducers } from 'redux';
// importar reducers
import categoryFilter from './categoryReducer';

const rootReducer = combineReducers({
    categoryFilter,
});

export default rootReducer;

