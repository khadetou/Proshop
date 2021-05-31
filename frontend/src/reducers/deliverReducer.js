
import { DELIVERED_FAIL, DELIVERED_RESET, DELIVERED_SUCCESS } from '../actions/type';

const initialState = {
    error: null,
    loading: true,
    success: false
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action)=>{
    const {type, preload}= action;

    switch (type) {
        case DELIVERED_SUCCESS:
            return{
                loading:false,
                success: true
            }
        case DELIVERED_FAIL:
            return{
                error:preload,
                loading: false
            }
        case DELIVERED_RESET:
            return{}
        default:
            return state;
    }
}