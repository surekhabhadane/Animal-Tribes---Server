import { combineReducers } from 'redux';
import Customizer from './customizer.reducer';
import Product from './product.reducer';

const reducers = combineReducers({
    Customizer,
    Product,
});

export default reducers;