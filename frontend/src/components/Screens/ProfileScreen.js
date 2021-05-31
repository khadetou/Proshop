import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap'
import {Row, Col, Table, Button} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {getMyOrders} from '../../actions/productAction';
import Loader from '../Loader';
import Message from '../Message';

const ProfileScreen = () => {
    const dispatch = useDispatch();
    const {orders:myOrders, loading:myOrderloading, error:myOrderError} = useSelector(state=>state.myorders);
    const {user} = useSelector(state=>state.auth);



    useEffect(()=>{
        if(user){
            dispatch(getMyOrders())
        }
        
    },[dispatch,user ])

    return (
        <Row>
            <Col md ={12}>
                <Row>
                    <Col md={12}>
                         <Link to='/profile-edit' className='btn btn-dark'>Edit profile</Link>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <h2 className="my-5">My Orders</h2>
                        {myOrderloading? <Loader/>: myOrderError? 
                        <Message variant='danger'>{myOrderError}</Message>:
                        (
                            <Table striped bordered hover responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>DATE</th>
                                        <th>TOTAL</th>
                                        <th>PAID</th>
                                        <th>DELIVERD</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {myOrders.map((order,idx)=>(
                                    <tr key={idx}>
                                        <td>{order._id}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>{order.totalPrice}</td>
                                        <td>{order.isPaid?order.createdAt.substring(0, 10): <i className="fas fa-times" style={{color:'red'}}></i> }</td>
                                        <td>{order.isDelivered? order.createdAt.substring(0, 10): <i className="fas fa-times" style={{color:'red'}}></i> }</td>
                                        <td>
                                            <LinkContainer to={`/order/${order._id}`}>
                                                <Button variant='light' className='btn-sm'>Details</Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        )}
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default ProfileScreen;
