import { DELETE_USER_FAIL, DELETE_USER_SUCCESS, USER_LIST_FAIL, USER_LIST_SUCCESS } from './type';
import axios from 'axios';


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