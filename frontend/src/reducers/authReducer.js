import { AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, REGISTER_SUCCESS, USER_LOADED, LOG_OUT, REGISTER_FAIL } from '../actions/type';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: null,
    user: null
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action)=>{
    const {preload, type} = action;
    switch (type) {
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated: true,
                laoding: false,
                user: preload
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return{
                ...state,
                ...preload,
                isAuthenticated: true,
                loading: false
            }
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOG_OUT:
            localStorage.removeItem('token');
            return{
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }
            
        default:
            break;
    }
}