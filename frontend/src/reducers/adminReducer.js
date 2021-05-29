import { DELETE_USER_FAIL, DELETE_USER_SUCCESS, LOG_OUT, UPDATE_USER_BYID_FAIL, UPDATE_USER_BYID_SUCCESS, USER_BYID_FAIL, USER_BYID_SUCCESS, USER_LIST_FAIL, USER_LIST_SUCCESS } from '../actions/type';

const initialState = {
    users: null,
    user: null,
    loading: true,
    error: null
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state= initialState, action)=>{

    const {preload, type} = action;

    switch (type) {
        case USER_LIST_SUCCESS:
            return{
                ...state,
                loading:false,
                users: preload
            }
        case DELETE_USER_SUCCESS:
            return{
                ...state,
                users: state.users.filter(user=>user._id !== preload),
                loading: false
            }
        case USER_BYID_SUCCESS:
        case UPDATE_USER_BYID_SUCCESS:
            return{
                ...state,
                loading: false,
                user: preload
            }

        

        case UPDATE_USER_BYID_FAIL:
        case USER_BYID_FAIL:
        case DELETE_USER_FAIL:
        case USER_LIST_FAIL:
            return{
                ...state,
                loading:false,
                error: preload
            }
        
        case LOG_OUT:
            return{
                ...state,
                users: [],
                user: {},
                loading: false
            }
        default:
            return state;
    }
}