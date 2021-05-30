import React, {useEffect} from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {Table, Button,Row, Col} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import Message from '../Message';
import Loader from '../Loader';
import {getProducts, deleteProduct} from '../../actions/productAction';

const ListProductScreen = ({history}) => {
    const dispatch = useDispatch();
    const {products,successdelete, loading, error} = useSelector(state=>state.product);
    useEffect(()=>{

        dispatch(getProducts())

    },[dispatch,successdelete])

    const deleteHandler = (id)=>{
       if(window.confirm('Are you sure? There will be no going back!')){
        dispatch(deleteProduct(id))
       }
    }

    
    const createHandeler = ()=>{
        console.log('create')
    }
    return (
        <>
            <Row className="align-items-center">
                <Col>
                    <h1>PRODUCTS</h1>
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
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                        {products !==null && products.map((product,idx)=>(
                            <tr key={idx}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>

                                    <Button variant='danger' className='btn-sm' onClick={()=>deleteHandler(product._id)}>
                                        <i className="fas fa-trash"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
          
        </>
    )
}

export default ListProductScreen;
