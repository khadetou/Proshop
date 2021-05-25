import {} from './types';
import {setAlert} from './alertAction';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { AUTH_ERROR, LOGIN_SUCCESS, LOG_OUT, REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED } from './type';
//LOAD USER
export const loadUser = ()=> async dispatch =>{

    if(localStorage.token){
        setAuthToken(localStorage.token)
    }

    try{
        const {data} = await axios.get('/api/user/profile');
        dispatch({
            type: USER_LOADED,
            preload: data
        })
    }catch(err){
        dispatch({
            type: AUTH_ERROR
        })
    }
}

//REGISTER 
export const register  = ({name, email, password})=> async dispatch =>{

    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({name, email, password});

    try{
        const {data} = await axios.post('/api/users', body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            preload: data
        })

        dispatch(loadUser());

    }catch(error){
        const errors = error.response.data.errors;
        if(errors){
            errors.forEach(error=> dispatch (setAlert(error.msg, 'danger', 600)));
        }

        dispatch({
            type: REGISTER_FAIL
        })
    }
}

    //LOGIN USER
    export const login = ({email, password})=> async dispatch =>{
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({email, password});

        try{
            const {data} = await axios.post('/api/user');
            dispatch({
                type: LOGIN_SUCCESS,
                preload: data
            })

            dispatch(loadUser());
        }catch(error){
            const errors = error.response.data.errors;
            if(errors){
                errors.forEach(error=> dispatch (setAlert(error.msg, 'danger', 600)));
            }
    
            dispatch({
                type: REGISTER_FAIL
            })
        }
    }

    //LOG OUT 
    export const logout = ()=> dispatch =>{
        dispatch({
            type: LOG_OUT
        })
    }