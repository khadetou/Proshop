import { PRODUCT_TOP_FAIL, PRODUCT_TOP_SUCCESS } from '../actions/type';
const initialState ={
    products: null,
    error: null,
    loading: true
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) =>{
    const {type, preload} = action;
    switch(type){
        case PRODUCT_TOP_SUCCESS:
            return{
                ...state,
                products: preload,
                loading: false
            }
        case PRODUCT_TOP_FAIL:
            return{
                ...state,
                error: preload,
                loading:false
            }
        default:
            return state
    }
}