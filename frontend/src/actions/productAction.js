import {PRODUCT_LIST_FAIL, SET_PRODUCT_LOADING, PRODUCT_LIST_RESQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_DETAILS_FAIL,PRODUCT_DETAILS_RESQUEST,PRODUCT_DETAILS_SUCCESS, CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, ORDER_ITEMS_SUCCESS, ORDER_ITEMS_FAIL, PAID_FAIL, PAID_SUCCESS, GET_ORDERLIST_SUCCESS, GET_ORDERLIST_FAIL, PRODUCT_DELETE_SUCCESS, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL} from './type';
import axios from 'axios';
import {setAlert} from './alertAction';
//GET PRODUCTS
export const getProducts = () => async (dispatch)=>{

    try {
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
            preload: data
        })
        
    } catch (error) {
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            preload: error.response.data.message
        })
    }

} 



//DELETE PRODUCTS
export const deleteProduct = (id)=> async dispatch=>{
    const config ={
        headers:{
            'Content-Type':'application/json'
        }
    }
    try {
        await axios.delete(`/api/products/${id}`,config);
        dispatch({
            type:PRODUCT_DELETE_SUCCESS,
            preload: id
        })
    } catch (error) {
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            preload: error.response.data.message
        })
    }
}

//CREATE PRODUCT
export const createProduct = (formData, history)=>async dispatch=>{
    try{
        const config= {
            headers:{
                'Content-Type':'application/json'
            }
        }

        const {data} = await axios.post('/api/products',formData, config);
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            preload: data
        })
        dispatch(setAlert('PRODUCT CREATED', 'success'));
       
            history.push('/admin/productlist');
      
    }catch(error){
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            preload:error.response.data.message
        })
    }
}


// UPDATE PRODUCT
export const updateProduct = (formData, id)=>async dispatch=>{
    try{
        const config= {
            headers:{
                'Content-Type':'application/json'
            }
        }

        const {data} = await axios.put(`/api/products/${id}`,formData, config);
        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            preload: data
        })
            dispatch(setAlert('PRODUCT UPDATED', 'success'));
    }catch(error){
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            preload:error.response.data.message
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

//SAVE SHIPPING CART ADDRESS LOCCALLY
export const saveShippingAddress = (data)=> async dispatch =>{
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        preload: data
    })
    //Allow us to save it in our local storage event if we reload the page it stays there
    localStorage.setItem('shippingAddress', JSON.stringify(data))
}
//SAVE PAYMENT CART LOCCALLY
export const savePaymentMethod = (data)=> async dispatch =>{
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        preload: data
    })
      //Allow us to save it in our local storage event if we reload the page it stays there
      localStorage.setItem('paymentMethod', JSON.stringify(data))
}

//DELETE TO CART
export const removeToCart = (id) => async (dispatch, getState) =>{

   dispatch({
       type: CART_REMOVE_ITEM,
       preload: id
   })
   localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}

//CREATE ORDER
export const createOrder  = (order)=> async dispatch =>{
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify(order);


    try{
        const {data} = await axios.post('/api/order', body, config);
        
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            preload: data
        })

    }catch(error){
        dispatch({
            type: ORDER_CREATE_FAIL,
            preload: error
        })
    }
}


//GET ORDER ITEMS BY ID
export const getOrderItems = (id) => async (dispatch)=>{
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }

    try {

        const {data} = await axios.get(`/api/order/${id}`, config)
        dispatch({
            type: ORDER_ITEMS_SUCCESS,
            preload: data
        })
       
    } catch (error) {
        dispatch({
            type: ORDER_ITEMS_FAIL,
            error: error
        })
    }

} 


//UPDATE INTO PAID
export const updatePaid = (id, paymenteResult)=> async dispatch=>{
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify(paymenteResult);
    
    try {
        
        const {data}= await axios.put(`/api/order/${id}/paid`,body, config);

        dispatch({
            type: PAID_SUCCESS,
            preload: data
        })
 
    } catch (error) {
        dispatch({
            type: PAID_FAIL,
            preload: error
        })
    }
}

//GET MY ORDERS
export const getMyOrders = () => async (dispatch)=>{

    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }

    try {
       
        const {data} = await axios.get('/api/order/myorders',config)
        dispatch({
            type: GET_ORDERLIST_SUCCESS,
            preload: data
        })
    } catch (error) {

        dispatch({
            type:GET_ORDERLIST_FAIL,
            preload: error
        })
    }

} 


//SET LOADING TRUE  
export const setProductLoading = ()=>{
    return{
        type: SET_PRODUCT_LOADING
    }
}