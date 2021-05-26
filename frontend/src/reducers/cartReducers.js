import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS } from '../actions/type';

const cartsItemsFromStorage = localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')): [];

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')? JSON.parse(localStorage.getItem('shippingAddress')): {};

const initialState = {
    cartItems: cartsItemsFromStorage,
    shippingAddress: shippingAddressFromStorage
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
            
        case CART_REMOVE_ITEM:
            return{
                ...state,
                cartItems: state.cartItems.filter(cartItem=>cartItem.product !== preload)
            }

        case CART_SAVE_SHIPPING_ADDRESS:
            return{
                ...state,
               shippingAddress: preload
            }


        default: 
            return state;
    }
}