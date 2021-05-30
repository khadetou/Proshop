import {PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_RESQUEST, PRODUCT_DETAILS_SUCCESS} from '../actions/type';

const initialState ={
    productsD: null,
    loading: null,
    error: null
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action)=>{
    const {preload, type, error} = action;

    switch(type){
        case PRODUCT_DETAILS_RESQUEST:
            return{
                ...state
            }

            case PRODUCT_DETAILS_SUCCESS:
                return{
                    ...state,
                    productsD: preload,
                    reviews:[],
                    loading: false
                }
            case PRODUCT_DETAILS_FAIL:
                return{
                    ...state,
                    error: error
                }
        default:
            return state
    }
}