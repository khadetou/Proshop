import { DELETE_USER_FAIL, DELETE_USER_SUCCESS, USER_BYID_FAIL, USER_BYID_SUCCESS, USER_LIST_FAIL, USER_LIST_SUCCESS, UPDATE_USER_BYID_SUCCESS, UPDATE_USER_BYID_FAIL } from './type';
import axios from 'axios';
import {setAlert} from './alertAction';

//GET All USERS AS ADMIN
export const getUsers = () => async (dispatch)=>{

    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }

    try {
        const {data} = await axios.get('/api/users',config)
        dispatch({
            type: USER_LIST_SUCCESS,
            preload: data
        })
    } catch (error) {
        dispatch({
            type:USER_LIST_FAIL,
            preload: error.response.data.message
        })
    }
} 


//GET USER BY ID 
export const getUserById = (id) => async (dispatch)=>{

    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }

    try {
        const {data} = await axios.get(`/api/users/${id}`,config)
        dispatch({
            type: USER_BYID_SUCCESS,
            preload: data
        })
    } catch (error) {
        dispatch({
            type:USER_BYID_FAIL,
            preload: error.response.data.message
        })
    }
} 


//UPDATE USER CREDENTIALS BY ADMIN
export const updateUser  = ({userId, name, email, isAdmin})=> async dispatch =>{
console.log(userId)
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({name, email, isAdmin});
    
    try{
        const {data} = await axios.put(`/api/users/${userId}`, body, config);

        dispatch({
            type: UPDATE_USER_BYID_SUCCESS,
            preload: data
        })

        dispatch(setAlert('UPDATED SUCCESSFULLY', 'success'));
    }catch(error){
        dispatch({
            type: UPDATE_USER_BYID_FAIL,
            preload:error.response.data.message
        })
    }
}
//DELETE USER
export const deletUser = (id)=> async dispatch=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    try {
        await axios.delete(`/api/users/${id}`,config);
        dispatch({
            type:DELETE_USER_SUCCESS,
            preload:id
        })
    } catch (error) {
        dispatch({
            type:DELETE_USER_FAIL,
            preload: error.response.data.message
        })
    }
}