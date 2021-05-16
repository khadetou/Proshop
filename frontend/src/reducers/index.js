import {combineReducers} from 'redux';
import productReducers from './productReducers';
import productDetailReducers from './productDetailReducer';
import cartReducers from './cartReducers';

export default combineReducers({
    product: productReducers,
    productDetail: productDetailReducers,
    cart: cartReducers
})