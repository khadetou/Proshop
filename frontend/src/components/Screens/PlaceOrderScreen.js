import React from 'react';
import {Button, Row, Col, ListGroup, Card, Image} from 'react-bootstrap';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import Message from '../Message';
import CheckoutSteps from '../CheckoutSteps';

const PlaceOrderScreen = () => {
    const cart = useSelector(state=>state.cart);
    const {shippingAddress:{address, city, postalCode, country}, paymentMethod, cartItems}= cart;
    const {Item} = ListGroup;
    const submit = ()=>{
        console.log('order');
    }

    //Calculate the item prices
    const addDecimal=(num)=>{
        return (Math.round(num * 100)/100).toFixed(2)
    }

    cart.itemsPrice = addDecimal(cartItems.reduce((acc, item)=> acc +item.price * item.qty, 0));
    cart.shippingPrice = addDecimal(cart.itemsPrice > 100 ? 0: 100);
    cart.taxPrice = addDecimal(Number((0.15* cart.itemsPrice).toFixed(2)))

    cart.totalPrice = Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice);

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4/>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                       <Item>
                        <h2>Shipping</h2>
                            <p>
                                <strong>Address: </strong>
                                {address}, {city}, {postalCode}, {country}
                            </p>
                       </Item>
                       <Item>
                            <h2>Payment Method</h2>
                            <strong>Method: </strong>
                            {paymentMethod}
                       </Item>
                    </ListGroup>
                    <ListGroup>
                        <h2>Order Items</h2>
                        {cartItems.length === 0?
                        <Message>Your cart is empty</Message>: 
                        (<ListGroup variant='flush'>
                            {cartItems.map((item, idx)=>(
                                <Item key={idx}>
                                    <Row>
                                        <Col md ={1}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col>
                                            <Link to={`/product/${item.product}`}>       {item.name}</Link>
                                     
                                        </Col>
                                        <Col md={4}>
                                            {item.qty} x {item.price} = ${item.qty*item.price}
                                        </Col>
                                    </Row>
                                </Item>
                            ))}
                        </ListGroup>)
                        }
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant= 'flush'>
                            <Item>
                                <h2>Order Summury</h2>
                            </Item>
                            <Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </Item>
                            <Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </Item>
                            <Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </Item>
                            <Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </Item>
                            <Item>
                                <Button type='button' className='btn-block w-100' disabled={cartItems === 0} onClick={submit}>Place Order</Button>
                            </Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreen;
