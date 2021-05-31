import { GET_ORDERS_FAIL, GET_ORDERS_SUCCESS, ORDER_CREATE_FAIL, ORDER_CREATE_SUCCESS, ORDER_ITEMS_FAIL, ORDER_ITEMS_SUCCESS } from '../actions/type';

const initialState = {
    order: null,
    orders: null,
    loading: true,
    success: false,
    error: null,
    orderd: null
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state= initialState, action)=>{
    const {preload, type}= action;

    switch(type){
        case ORDER_CREATE_SUCCESS:
            return{
                ...state,
                loading: false,
                success: true,
                order: preload,

            }
        case GET_ORDERS_SUCCESS:
            return{
                ...state,
                loading:false,
                success: true,
                orders:preload,
            }
        case ORDER_ITEMS_SUCCESS:
            return{
                ...state,
                orderd: preload,
                loading: false,
                error: null
            }
        case ORDER_CREATE_FAIL:
        case ORDER_ITEMS_FAIL:
        case GET_ORDERS_FAIL:
            return{
                loading: false,
                error: preload
            }
        default:
            return state;
    }
}