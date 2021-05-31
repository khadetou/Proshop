import { PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_CREATE_REVIEW_SUCCESS } from './type';
import axios from 'axios';


export const creatReview = (id, data)=> async dispatch=>{

    try {
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        const body = JSON.stringify(data);

        await axios.post(`/api/products/${id}/reviews`, body, config)
        dispatch({
            type:PRODUCT_CREATE_REVIEW_SUCCESS
        })
    } catch (error) {
        dispatch({
            type:  PRODUCT_CREATE_REVIEW_FAIL,
            preload: error.response.data.message
        })
    }

}