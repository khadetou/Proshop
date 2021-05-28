import {} from '../actions/productAction';
import { PAID_FAIL, PAID_RESET, PAID_SUCCESS } from '../actions/type';

const initialState = {
    error: null,
    loading: true,
    success: false
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action)=>{
    const {type, preload}= action;

    switch (type) {
        case PAID_SUCCESS:
            return{
                loading:false,
                success: true
            }
        case PAID_FAIL:
            return{
                error:preload,
                loading: false
            }
        case PAID_RESET:
            return{
            }
        default:
            return state;
    }
}