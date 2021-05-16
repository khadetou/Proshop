import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import Message from '../Message';
import {addCart} from '../../actions/productAction';
import { BsTrash } from "react-icons/bs";
const CartScreen = ({match, location, history}) => {
    const productId = match.params.id;

    const qty = location.search ? Number(location.search.split('=')[1]): 1;
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;

    const {Item} = ListGroup;

    //Functions
    const removeFromCartHandler = ()=>{
        console.log('romve');
    }

    const checkoutHandler = () =>{
        history.push('/login?redirect=shipping');
    }


    useEffect(()=>{
        if(productId){
            dispatch(addCart(productId, qty))
        }
    },[dispatch, productId, qty]);

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Card</h1>
                {  cartItems.length === 0 ? <Message>Your cart is empty <Link to='/'>Go back</Link></Message> : (
                    <ListGroup variant='flush'>
                        {cartItems.map(item =>(
                            <Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded/>
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        ${item.price}
                                    </Col>
                                    <Col md={2}>
                                    <Form.Control as ='select' value={item.qty} onChange={(e)=>dispatch(addCart(item.product, Number(e.target.value)))} >
                                        {[...Array(item.countInStock).keys()].map((x)=>
                                        (<option key={x +1} value={x+1}>{x +1}</option>))}
                                    </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <Button type='button' variant='light' onClick={()=>removeFromCartHandler(item.product)}>
                                            <BsTrash/>
                                        </Button>
                                    </Col>
                                </Row>
                            </Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <Item>
                            <h2>Subtotal ({cartItems.reduce((acc, item)=> acc + item.qty, 0 )}) items</h2>
                            ${cartItems.reduce((acc, item)=> acc+item.qty * item.price, 0).toFixed(2)}
                        </Item>
                        <Item type='button'>
                            <Button type='buttnon' className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>
                                Proceed to checkout
                            </Button>
                        </Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen;
