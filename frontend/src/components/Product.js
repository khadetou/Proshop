import React from 'react'
import { Card } from 'react-bootstrap';
import Rating from './SubComponents/Rating';
import {Link} from 'react-router-dom';
const Product = ({product}) => {

    const {_id, image, name, rating, numReviews, price}= product;
    const {Img, Body, Title, Text}= Card;

    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`product/${_id}`} className="text-decoration-none">
                <Img src={image} variant="top"></Img>
            </Link>

            <Body>
                <Link to={`product/${_id}`} className='text-decoration-none'>
                    <Title as="div">{name}</Title>
                </Link>
                
                

                <Text as='div'>
                    <Rating value={rating} text={`${numReviews} reviews`}/>
                </Text>

                <Text as="h3">${price}</Text>
            </Body>
        </Card>
    )
}

export default Product;
