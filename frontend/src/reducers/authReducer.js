import { AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, REGISTER_SUCCESS, USER_LOADED, LOG_OUT, REGISTER_FAIL, UPDATED_USER, UPDATE_FAIL } from '../actions/type';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action)=>{
    const {preload, type} = action;
    switch (type) {
        case USER_LOADED:
        case UPDATED_USER:
            return{
                ...state,
                user: preload,
                isAuthenticated: true,
                loading: false
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', preload.token)
            return{
                ...state,
                 ...preload,
                isAuthenticated: true,
                loading: false
            }

        case UPDATE_FAIL:
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
                loading: false,
                user: null
            }
        default:
            return state;
    }
}