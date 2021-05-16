import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Row, Col, ListGroup, Image, Form, Button, Cart} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import Message from '../Message';
import {addCart} from '../../actions/productAction';
const CartScreen = ({match, location, history}) => {
    const productId = match.params.id;

    const qty = location.search ? Number(location.search.split('=')[1]): 1;
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;

    useEffect(()=>{
        if(productId){
            dispatch(addCart(productId, qty))
        }
    },[dispatch, productId, qty]);

    return (
        <div>
            Cart
        </div>
    )
}

export default CartScreen;
