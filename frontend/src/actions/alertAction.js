import { REMOVE_ALERT, SET_ALERT } from './type';
import uuid from 'uuid';
export const setAlert = (msg, alertType)=> dispatch=>{

    const id = uuid.v4(); 

    dispatch({
        type: SET_ALERT,
        preload: {msg, alertType, id}
    })

    setTimeout(()=>{
        dispatch({
            type: REMOVE_ALERT,
            preload: id
        })
    }, 5000)
}