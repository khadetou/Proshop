import React, {useEffect, useState} from 'react';
import { Row, Col, ListGroup, Card, Image} from 'react-bootstrap';
import {PayPalButton} from 'react-paypal-button-v2';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import Message from '../Message';
import Loader from '../Loader';
import {getOrderItems, updatePaid} from '../../actions/productAction';
import axios from 'axios';

const OrderScreen = ({match}) => {
 

    const dispatch = useDispatch()
    const orderId = match.params.id;

    const [sdk, setSdk]= useState(false);
    const payment = useSelector(state=>state.payment);
    const {success:paymentSucceeded, loading:paymentLoading}= payment;


    const {Item} = ListGroup;

    const orders= useSelector(state => state.orders)
    const {orderd, error, loading} = orders;

    useEffect(()=>{
        const addPayPalScript = async ()=>{
            const {data:clientId}= await axios.get('/api/config/paypal');
            const script = document.createElement('script');

            script.type = 'text/javascript';
            script.src= `https://www.paypal.com/sdk/js?client-id=${clientId}`;
            script.async = true;

            script.onload =()=>{
                setSdk(true);
            }
            document.body.appendChild(script);
        }

        

        if(paymentSucceeded || !orderd){
            dispatch(getOrderItems(orderId))
        }else if(!orderd.isPaid){
            if(!window.paypal){
                addPayPalScript();
            }else{
                setSdk(true)
            }
        }

    },[dispatch, orderId, orderd ,paymentSucceeded])

   const paymentSuccessHandler = (paymentResult) =>{

    console.log(paymentResult);
    dispatch(updatePaid(orderId,paymentResult));
   }

    return (
       loading ? <Loader/> :
        error? <Message variant ='danger'>{error}</Message>:
       <>
       {orders.orderd!==null &&
        <>
             <h1>Order: {orderd._id}</h1>
             <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                    <Item>
                        <h2>Shipping</h2>
                            <p>
                                <strong>Name: </strong>
                                {orderd.user.name}
                            </p>
                            <p>
                                <strong>Email: </strong>
                                {orderd.user.email}
                            </p>
                            <p>
                                <strong>Address: </strong>
                                {orderd.shippingAddress.address}, {orderd.shippingAddress.city}, {orderd.shippingAddress.postalCode}, {orderd.shippingAddress.country}
                            </p>
                            {orderd.isDelivered? <Message variant='success'>Product Delivered</Message>:<Message variant='danger'>Product Not Delivered</Message>}
                    </Item>
                    <Item>
                            <h2>Payment Method</h2>
                            <strong>Method: </strong>
                            {orderd.paymentMethod}
                            {orderd.isPaid? <Message variant='success'>Product Paid</Message>:<Message variant='danger'>Product Not Paid</Message>}
                    </Item>
                    </ListGroup>
                    <ListGroup>
                        <h2>Order Items</h2>
                        {orderd.orderItems.length === 0?
                        <Message>Your cart is empty</Message>: 
                        (<ListGroup variant='flush'>
                            {orderd.orderItems.map((item, idx)=>(
                                <Item key={idx}>
                                    <Row>
                                        <Col md ={1}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                     
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
                                    <Col>${orderd.itemsPrice}</Col>
                                </Row>
                            </Item>
                            <Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${orderd.shippingPrice}</Col>
                                </Row>
                            </Item>
                            <Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${orderd.taxPrice}</Col>
                                </Row>
                            </Item>
                            <Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${orderd.totalPrice}</Col>
                                </Row>
                            </Item>
                            {!orderd.isPaid &&
                            (
                                <Item>
                                    {paymentLoading && <Loader/>}
                                    {!sdk ? <Loader/>: 
                                        (
                                            <PayPalButton amount ={orderd.totalPrice} onSuccess={paymentSuccessHandler}/>
                                        )
                                    }
                                </Item>
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
       }
       </>
    )
}

export default OrderScreen;
