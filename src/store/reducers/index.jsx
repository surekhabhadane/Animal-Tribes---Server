import { combineReducers } from 'redux';
import TodoApp from './todos.reducer';
import EmailApp from './email.reducer';
import ChatApp from './chat.reducer';
import EcommerceApp from './ecommerce.reducer';
import WishlistApp from './wishlist.reducer';
import Filters from './filters.reducer';
import Customizer from './customizer.reducer';
import User from './user.reducer';
import Navigation from './navigation.reducer';
import Product from './product.reducer';
import Tags from './tags.reducer';

const reducers = combineReducers({
    TodoApp,
    EmailApp,
    ChatApp,
    data: EcommerceApp,
    WishlistApp,
    Filters: Filters,
    Customizer,
    User,
    Product,
    Tags,
    Navigation,
});

export default reducers;