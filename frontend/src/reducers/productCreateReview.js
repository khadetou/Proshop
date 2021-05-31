import { PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_CREATE_REVIEW_RESET, PRODUCT_CREATE_REVIEW_SUCCESS } from '../actions/type';
const initialState = {
    success: false,
    error: null
} 

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) =>{
    const {type, preload} = action;
    switch(type){
        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return{
                ...state,
                success: true,
        
            }
        case PRODUCT_CREATE_REVIEW_FAIL:
            return{
                ...state,
                error: preload,
     
            }
        case PRODUCT_CREATE_REVIEW_RESET:
            return{

            }
        default:
            return state
    }
}
