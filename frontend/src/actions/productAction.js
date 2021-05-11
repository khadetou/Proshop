import {PRODUCT_LIST_FAIL, SET_PRODUCT_LOADING, PRODUCT_LIST_RESQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_DETAILS_FAIL,PRODUCT_DETAILS_RESQUEST,PRODUCT_DETAILS_SUCCESS} from './type';
import axios from 'axios';

//GET PRODUCTS
export const getProducts = () => async dispatch=>{

    try {
        setProductLoading();
        dispatch({
            type: PRODUCT_LIST_RESQUEST
        })
        const {data} = await axios.get('/api/products')
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            preload: data
        })
    } catch (error) {
        dispatch({
            type:PRODUCT_LIST_FAIL,
            error: error.response.data.message
        })
    }

} 



//GET PRODUCTS
export const getProductDetails = (id) => async dispatch=>{

    try {
        setProductLoading();
        dispatch({
            type: PRODUCT_DETAILS_RESQUEST
        })
        const {data} = await axios.get(`/api/products/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            error: error.response.data.message
        })
    }

} 

//SET LOADING TRUE  
export const setProductLoading = ()=>{
    return{
        type: SET_PRODUCT_LOADING
    }
}