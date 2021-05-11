import React, { useEffect} from 'react';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import {getProductDetails} from '../../actions/productAction';
import Message from '../Message';
import Loader from '../Loader';
import {Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap';
import Rating from '../SubComponents/Rating';

const ProductScreen = ({match}) => {

    const dispatch = useDispatch()
    const productDetail = useSelector(state => state.productDetail);
    const {productsD, error, loading}= productDetail;

    useEffect(()=>{
        dispatch(getProductDetails(match.params.id))

    },[dispatch, match]);

    const {name, image, rating, numReviews, price, description, countInStock} = productsD
    const {Item} = ListGroup;


    return (
        <>
          <Link className="btn btn-dark py-3 rounded-pill mb-3" to='/'>Go back</Link>

          {loading?
           <Loader/> : error ?
           <Message variant={'danger'}>{error}</Message>:

          productsD !== null && (<Row>
          <Col md={6}>
              <Image src={image} alt={name} fluid/>
          </Col>
          <Col md={3}>
              <ListGroup variant='flush'>
                <Item>
                    <h3>{name}</h3>
                </Item>
                <Item>
                    <Rating value={rating} text={`${numReviews} reviews`} />
                </Item>

                <Item>
                    Price: ${price}
                </Item>

                <Item>
                    Description: {description}
                </Item>
              </ListGroup>
          </Col>

          <Col md={3}>
                <Card>
                    <ListGroup variant='flash'>
                        <Item>
                            <Row>
                                <Col>Price: </Col>
                                <Col><strong>${price}</strong></Col>
                            </Row>
                        </Item>
                        <Item>
                            <Row>
                                <Col>Status: </Col>
                                <Col>{countInStock > 0 ? 'In Stock': 'Out of Stock' }</Col>
                            </Row>
                        </Item>
                        <Item>
                            <Button className='btn-block' type='button' disabled={countInStock === 0}>
                                Add to Cart
                            </Button>
                        </Item>
                    </ListGroup>
                </Card>
          </Col>
          </Row>)}
          
        </>
    )
}

export default ProductScreen;
