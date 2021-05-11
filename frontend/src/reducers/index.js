import {combineReducers} from 'redux';
import productReducers from './productReducers';
import productDetailReducers from './productDetailReducer';
export default combineReducers({
    product: productReducers,
    productDetail: productDetailReducers
})