import {PRODUCT_LIST_FAIL, SET_PRODUCT_LOADING, PRODUCT_LIST_RESQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_DETAILS_FAIL,PRODUCT_DETAILS_RESQUEST,PRODUCT_DETAILS_SUCCESS, CART_ADD_ITEM} from './type';
import axios from 'axios';

//GET PRODUCTS
export const getProducts = () => async (dispatch, getAction)=>{

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



//GET PRODUCTDETAILS
export const getProductDetails = (id) => async (dispatch)=>{

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


//Add TO CART
export const addCart = (id, qty)=> async (dispatch, getState)=>{
   
    const {data} = await axios.get(`/api/products/${id}`);

    dispatch({
        type: CART_ADD_ITEM,
        preload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

//SET LOADING TRUE  
export const setProductLoading = ()=>{
    return{
        type: SET_PRODUCT_LOADING
    }
}