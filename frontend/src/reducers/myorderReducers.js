import { GET_ORDERLIST_FAIL, GET_ORDERLIST_SUCCESS } from '../actions/type';

const initialState = {
    orders: null,
    loading: true,
    error: null,
   
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state= initialState, action)=>{
    const {preload, type}= action;

    switch(type){
        case GET_ORDERLIST_SUCCESS:
            return{
                ...state,
                loading: false,
                orders:preload
            }
        case GET_ORDERLIST_FAIL:
            return{
                ...state,
                loading:false,
                error: preload
            }
        default:
            return state;
    }
}