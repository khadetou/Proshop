import { ORDER_CREATE_FAIL, ORDER_CREATE_SUCCESS, ORDER_ITEMS_FAIL, ORDER_ITEMS_SUCCESS } from '../actions/type';

const initialState = {
    order: null,
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
                order: preload
            }
        case ORDER_ITEMS_SUCCESS:
            return{
                orderd: preload,
                loading: false,
                error: null
            }
        case ORDER_CREATE_FAIL:
        case ORDER_ITEMS_FAIL:
            return{
                loading: false,
                error: preload
            }
        default:
            return state;
    }
}