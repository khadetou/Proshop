import { PRODUCT_DELETE_FAIL, PRODUCT_TOP_SUCCESS } from './type';
import axios from 'axios';

export const getTopProducts = ()=> async dispatch=>{

    try {
        const {data}= await axios.get('/api/products/top');
        dispatch({
            type: PRODUCT_TOP_SUCCESS,
            preload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            preload: error.response.data.message
        })
    }

}