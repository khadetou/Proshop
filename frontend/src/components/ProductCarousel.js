import React,{useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getTopProducts} from '../actions/topproductAction';
import {Link} from 'react-router-dom';
import {Carousel, Image} from 'react-bootstrap';
import Message from './Message';
import Loader from './Loader';

const ProductCarousel = () => {
    const dispatch= useDispatch();
    const {products, loading, error} = useSelector(state=>state.top);
    const {Item, Caption} = Carousel;
    useEffect(()=>{
        if(products === null){
            dispatch(getTopProducts())
        }
    },[dispatch, products])

    return  loading ? <Loader/> : error? <Message>{error}</Message>:
        (
            <Carousel pause='hover' className='bg-dark'>
                {products.map((product, idx)=>(
                    <Item key={idx}>
                        <Link to={`/product/${product._id}`}>
                            <Image src={product.image} alt={product.image} fluid/>
                            <Caption className='carousel-caption'>
                                <h2>{product.name} (${product.price})</h2>
                            </Caption>
                        </Link>
                    </Item>
                ))}
            </Carousel>
        )
    
}

export default ProductCarousel;
