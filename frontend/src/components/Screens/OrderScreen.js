import React, {useEffect} from 'react';
import { Row, Col, ListGroup, Card, Image} from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import Message from '../Message';
import Loader from '../Loader';
import {getOrderItems} from '../../actions/productAction';

const OrderScreen = ({match}) => {
 

    const dispatch = useDispatch()
    const orderId = match.params.id;
   
    const {Item} = ListGroup;

    useEffect(()=>{

        dispatch(getOrderItems(orderId))

    },[dispatch, orderId])

    const orders= useSelector(state => state.orders)
    const {orderd, error, loading} = orders;

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
