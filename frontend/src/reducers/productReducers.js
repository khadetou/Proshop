import {PRODUCT_DELETE_FAIL, PRODUCT_DELETE_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_RESQUEST, PRODUCT_LIST_SUCCESS} from '../actions/type';
const initialState ={
    products: null,
    error: null,
    loading: true
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) =>{
    const {type, preload} = action;
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
        case PRODUCT_DELETE_SUCCESS:
            return{
                ...state,
                products: state.products.filter(product=>product._id!==preload),
                loading:false
            }
        case PRODUCT_LIST_FAIL:
        case PRODUCT_DELETE_FAIL:
            return{
                ...state,
                error: preload
            }
        default:
            return state
    }
}