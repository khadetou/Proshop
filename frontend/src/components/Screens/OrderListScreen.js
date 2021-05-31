import React, {useEffect} from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {Table, Button,Row, Col} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import Message from '../Message';
import Loader from '../Loader';
import {getAllOrders} from '../../actions/productAction';

const OrderListScreen = ({history}) => {
    const dispatch = useDispatch();
    const {orders, loading, error} = useSelector(state=>state.orders);

    useEffect(()=>{
        if(orders === null){
            dispatch(getAllOrders())
        }
       
    },[dispatch,orders])

    const deleteHandler = (id)=>{
       console.log('hey')
    }

    
    const createHandeler = ()=>{
        history.push('/admin/createproduct')
    }
    return (
        <>
            <Row className="align-items-center">
                <Col>
                    <h1>ORDERS</h1>
                </Col>
                <Col className='text-right d-flex justify-content-end'>
                    <Button className='my-3' onClick={createHandeler}>
                       <i className="fas fa-plus"></i> Create Product
                    </Button>
                </Col>
            </Row>
            {loading ? <Loader/>: error ? <Message variant='danger'>{error}</Message>:
            (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>USER</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                        
                        {orders !==null && orders.map((order,idx)=>{
                            return  (
                            <tr key={idx}>
                                <td>{order._id}</td>
                                <td>{order.user && order.user.name}</td>
                                <td>{order.createdAt}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.isPaid? <i className='fas fa-check' style={{color:'green'}}></i>:<i className='fas fa-times' style={{color:'red'}}></i>}</td>
                                <td>{order.isDelivered?<i className='fas fa-check' style={{color:'green'}}></i>:<i className='fas fa-times' style={{color:'red'}}></i>}</td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button variant='light' className='btn-sm'>
                                           Details
                                        </Button>
                                    </LinkContainer>

                                    <Button variant='danger' className='btn-sm' onClick={()=>deleteHandler(order._id)}>
                                        <i className="fas fa-trash"></i>
                                    </Button>
                                </td>
                            </tr>
                        )})}
                    </tbody>
                </Table>
            )}
          
        </>
    )
}

export default OrderListScreen;
