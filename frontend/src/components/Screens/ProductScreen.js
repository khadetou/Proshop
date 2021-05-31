import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import {getProductDetails} from '../../actions/productAction';
import Message from '../Message';
import Loader from '../Loader';
import {Row, Col, Image, ListGroup, Card, Button,Form} from 'react-bootstrap';
import Rating from '../SubComponents/Rating';
import {creatReview} from '../../actions/userAction';
import {PRODUCT_CREATE_REVIEW_RESET} from '../../actions/type';


const ProductScreen = ({history, match}) => {
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const dispatch = useDispatch()
    const productDetail = useSelector(state => state.productDetail);
    const {productsD, error, loading}= productDetail;
    
    const {isAuthenticated} = useSelector(state => state.auth);
    
    const productReview = useSelector(state => state.review);
    const {success, error:reviewError}= productReview;

    useEffect(()=>{
        if(success){
            alert('Review submitted');
            setRating(0);
            setComment('');
            dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
        }
        dispatch(getProductDetails(match.params.id))
    },[dispatch, match,success]);

    const submitHandler = (e)=>{
        e.preventDefault();
        const data={
            rating,
            comment
        }
        dispatch(creatReview(match.params.id, data))
       
    }
    
    const {Item} = ListGroup;
    const {Group,Label, Control}= Form;

    const addToCartHandler = ()=>{
    
        history.push(`/cart/${match.params.id}?qty=${qty}`);
        
    }

    return (
        <>
          <Link className="btn btn-dark py-3 rounded-pill mb-3" to='/'>Go back</Link>

          {loading?
           <Loader/> : error ?
           <Message variant={'danger'}>{error}</Message>:

          productsD !== null && (
        <>
          <Row>
          <Col md={6}>
              <Image src={productsD.image} alt={productsD.name} fluid/>
          </Col>
          <Col md={3}>
              <ListGroup variant='flush'>
                <Item>
                    <h3>{productsD.name}</h3>
                </Item>
                <Item>
                    <Rating value={productsD.rating} text={`${productsD.numReviews} reviews`} />
                </Item>

                <Item>
                    Price: ${productsD.price}
                </Item>

                <Item>
                    Description: {productsD.description}
                </Item>
              </ListGroup>
          </Col>

          <Col md={3}>
                <Card>
                    <ListGroup variant='flash'>
                        <Item>
                            <Row>
                                <Col>Price: </Col>
                                <Col><strong>${productsD.price}</strong></Col>
                            </Row>
                        </Item>
                        <Item>
                            <Row>
                                <Col>Status: </Col>
                                <Col>{productsD.countInStock > 0 ? 'In Stock': 'Out of Stock' }</Col>
                            </Row>
                        </Item>
                        {productsD.countInStock >0  && (
                        <Item>
                            <Row>
                                <Col>Qty</Col>
                                <Col>
                                    <Form.Control as ='select' value={qty} onChange={(e)=>setQty(e.target.value)} >
                                        {[...Array(productsD.countInStock).keys()].map((x)=>
                                        (<option key={x +1} value={x+1}>{x +1}</option>))}
                                    </Form.Control>
                                </Col>
                            </Row>
                        </Item>) }
                        <Item>
                            <Button className='btn-block' type='button' disabled={productsD.countInStock === 0} onClick={addToCartHandler}>
                                Add to Cart
                            </Button>
                        </Item>
                    </ListGroup>
                </Card>
          </Col>
          </Row>
          <Row>
              <Col md ={6}>
                 <h1>Reviews</h1>
                 {productsD.reviews.length === 0 &&<Message>No Reviews</Message>}
                 <ListGroup variant='flush'>
                    {productsD.reviews.map((review,idx)=>(
                        <Item key={idx}>
                            <strong>{review.name}</strong>
                            <Rating value={review.rating}/>
                            <p>{review.createdAt.substring(0,10)}</p>
                            <p>{review.comment}</p>
                        </Item>
                    ))}
                    <Item>
                        <h2>Write a customer review</h2>
                        {reviewError && <Message variant='danger'>{reviewError}</Message>}
                        {isAuthenticated? 
                        (
                        <Form onSubmit={submitHandler}>
                        
                        <Group controlId='rating'>
                                <Label>Rating</Label>
                                <Control as='select' value={rating} onChange={(e)=>setRating(e.target.value)}>
                                    <option value="">Select...</option>
                                    <option value="1">1 -Poor</option>
                                    <option value="2">2 -Fair</option>
                                    <option value="3">3 -Good</option>
                                    <option value="4">4 -Very good</option>
                                    <option value="5">5 -Excellent</option>
                                </Control>
                            </Group>
                            <Group controlId='comment'>
                                <Control 
                                    as='textarea'
                                    row='3'
                                    value={comment}
                                    onChange={(e)=>setComment(e.target.value)}
                                    >
                                     Comment
                                </Control>
                            </Group>
                            <Button type='submit' variant='primary' className='my-2'>SUBMIT</Button>
                         </Form>): 
                        (<Message>Please <Link to='/login'>Sign in</Link> to write a review {' '}</Message>)}
                    </Item>
                   
                 </ListGroup>
              </Col>
          </Row>
          </>)}
          
        </>
    )
}

export default ProductScreen;
