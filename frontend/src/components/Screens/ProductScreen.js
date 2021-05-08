import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap';
import Rating from '../SubComponents/Rating';
import axios from 'axios';

const ProductScreen = ({match}) => {

const [product, setProduct] = useState([]);

const effectF = ()=>{
    const fetchProduct = async ()=>{
        const {data} = await axios.get(`/api/products/${match.params.id}`);
        console.log(data)
        setProduct(data);
    }

    fetchProduct();

}

useEffect(effectF, [match]);


 
    const {name, image, rating, numReviews, price, description, countInStock} = product
    const {Item} = ListGroup;

    return (
        <>
          <Link className="btn btn-dark py-3 rounded-pill mb-3" to='/'>Go back</Link>

          <Row>
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
          </Row>
          
        </>
    )
}

export default ProductScreen;
