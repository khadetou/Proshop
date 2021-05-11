import {PRODUCT_LIST_FAIL, PRODUCT_LIST_RESQUEST, PRODUCT_LIST_SUCCESS, SET_PRODUCT_LOADING} from '../actions/type';
const initialState ={
    products: null,
    error: null,
    loading: false
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) =>{
    const {type, preload, error} = action;
    switch(type){
        case PRODUCT_LIST_RESQUEST:
            return{
                ...state,
                products: []
            }

        case PRODUCT_LIST_SUCCESS:
            return{
                ...state,
                products: preload,
                loading: false
            }
        case PRODUCT_LIST_FAIL:
            return{
                ...state,
                error: error
            }
        case SET_PRODUCT_LOADING:
            return{
                ...state,
                loading: true
            }
            
        default:
            return state
    }
}