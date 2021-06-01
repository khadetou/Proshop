import {combineReducers} from 'redux';
import productReducers from './productReducers';
import productDetailReducers from './productDetailReducer';
import cartReducers from './cartReducers';
import alertReducer from './alertReducer';
import authReducer from './authReducer';
import orderReducer from './orderReducer';
import paymentOrder from './paymentOrder';
import myorderReducers from './myorderReducers';
import adminReducer from './adminReducer';
import deliverReducer from './deliverReducer';
import productCreateReview from './productCreateReview';
import topproductReducer from './topproductReducer';

export default combineReducers({
    product: productReducers,
    productDetail: productDetailReducers,
    cart: cartReducers,
    alert: alertReducer,
    auth: authReducer,
    orders: orderReducer,
    payment: paymentOrder,
    deliver: deliverReducer,
    myorders: myorderReducers,
    admin: adminReducer,
    review: productCreateReview,
    top:topproductReducer
})