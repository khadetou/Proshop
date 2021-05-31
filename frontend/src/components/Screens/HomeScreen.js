import React, {useEffect} from 'react';
import {Row, Col} from 'react-bootstrap';
import Product from '../Product';
import {useDispatch, useSelector} from 'react-redux';
import {getProducts} from '../../actions/productAction';
import Message from '../Message';
import Loader from '../Loader';

const HomeScreen = ({match}) => {
const dispatch = useDispatch();
const product = useSelector(state=> state.product);
const {products, loading, error} = product;
const keyword = match.params.keyword;

useEffect(()=>{
   dispatch(getProducts(keyword))

},[dispatch, keyword]);

    return (
        <>
            <h1>Latest Products</h1>
            {loading ?
            (<Loader/>): 
            error ? 
            <Message variant='danger'>{error}</Message>: 
            <Row>
                {products !== null && products.map((product,idx)=>(
                <Col key={idx} sm={12} md={6} lg={4} xl={3}>
                        <Product product ={product}/>
                    </Col>
                ))}
            </Row>
            }
            
        </>
    )
}



export default HomeScreen;
