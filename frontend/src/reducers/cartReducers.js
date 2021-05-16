import { CART_ADD_ITEM } from '../actions/type';

const cartsItemsFromStorage = localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')): [];

const initialState = {
    cartItems: cartsItemsFromStorage,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action)=>{
    const {preload, type}= action;
    switch(type){
        case CART_ADD_ITEM:
            const item = preload;
            const existItem = state.cartItems.find(x=> x.product === item.product);
            if(existItem){
                return{
                    ...state,
                    cartItems: state.cartItems.map((x) => x.product === existItem.product ? item : x)
                }
            }else{
                return{
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        default: 
            return state;
    }
}