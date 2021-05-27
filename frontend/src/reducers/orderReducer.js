import { ORDER_CREATE_FAIL, ORDER_CREATE_SUCCESS } from '../actions/type';

const initialState = {
    order: null,
    loading: true,
    success: false,
    error: null
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state= initialState, action)=>{
    const {preload, type}= action;

    switch(type){
        case ORDER_CREATE_SUCCESS:
            return{
                loading: false,
                success: true,
                order: preload
            }
        case ORDER_CREATE_FAIL:
            return{
                loading: false,
                error: preload
            }
        default:
            return state;
    }
}