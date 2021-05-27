import {combineReducers} from 'redux';
import productReducers from './productReducers';
import productDetailReducers from './productDetailReducer';
import cartReducers from './cartReducers';
import alertReducer from './alertReducer';
import authReducer from './authReducer';
import orderReducer from './orderReducer';

export default combineReducers({
    product: productReducers,
    productDetail: productDetailReducers,
    cart: cartReducers,
    alert: alertReducer,
    auth: authReducer,
    orders: orderReducer
})