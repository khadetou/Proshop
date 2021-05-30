import React,{useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createProduct} from '../../actions/productAction';
import {Link} from 'react-router-dom';
import {Form, Button, Row, Col} from 'react-bootstrap';
import FormContainer from '../FormContainer';
import Loader from '../Loader';
import Message from '../Message';

const CreateProductScreen = ({history}) => {
    const dispatch = useDispatch();
    
    const [formData, setFormData] = useState({
        name:'',
        image:'',
        brand:'',
        category:'',
        description:'',
        rating: 0,
        numReviews: 0,
        price: 0,
        countInStock: 1
    })


    
    const {Group,Control, Label} =Form;

    const {name, image, brand, category, description, price, countInStock}=formData;


    const alert = useSelector(state=> state.alert);
    const {loading, error}= useSelector(state=>state.productDetail);


    const onChange = (e)=>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onSubmit = (e) =>{
        e.preventDefault();
        dispatch(createProduct(formData, history));
    }

    useEffect(()=>{

    },[])

    const alerts = alert.map((alert,idx)=>(
        <Message key={idx} variant={`${alert.alertType}`}>{alert.msg}</Message>
    ))

    return (
        <>
          <Link to='/admin/userlist' className='btn btn-ligth my-3'>
            Go Back
          </Link>
          <FormContainer>
            <h1>UPDATE USER </h1>
            {alerts}
            {loading? <Loader/> : error ? <Message variant='danger'>{error}</Message>:(
                <Form onSubmit={(e)=>onSubmit(e)}>
                <Group controlId='name'>
                        <Label>Product name</Label>
                        <Control 
                        type='text' 
                        name= 'name'
                        placeholder='Enter The product name' 
                        value={name} 
                        required
                        onChange={(e)=>onChange(e)}>
                        </Control>
                    </Group>
    
                    <Group controlId='image'>
                        <Label>Image</Label>
                        <Control 
                        type='text' 
                        name= 'image'
                        placeholder='Enter image url' 
                        value={image} 
                        required
                        onChange={(e)=>onChange(e)}>
                        </Control>
                    </Group>
    
                    <Group controlId='brand'>
                        <Label>Brand</Label>
                        <Control
                        type='text' 
                        name= 'brand'
                        placeholder='Put the brand of the product'
                        checked={brand}
                        onChange={(e)=>onChange(e)}>
                        </Control>
                    </Group>

                    <Group controlId='price'>
                        <Label>Price</Label>
                        <Control
                        type='number'
                        min='0'
                        step='.01' 
                        name= 'price'
                        placeholder='Put the price of the product'
                        checked={price}
                        onChange={(e)=>onChange(e)}>
                        </Control>
                    </Group>

                    <Group controlId='countInStock'>
                        <Label>Count In Stock</Label>
                        <Control
                        type='number'
                        min='0'
                        name= 'countInStock'
                        placeholder='Put the count In Stock of the product'
                        checked={countInStock}
                        onChange={(e)=>onChange(e)}>
                        </Control>
                    </Group>

                    <Group controlId='category'>
                        <Label>Category</Label>
                        <Control
                        type='text' 
                        name= 'category'
                        placeholder='Put the category of the product'
                        checked={category}
                        onChange={(e)=>onChange(e)}>
                        </Control>
                    </Group>

                    <Group controlId='description'>
                        <Label>Description</Label>
                        <Control
                        type='text' 
                        name= 'description'
                        placeholder='Put the description of the product'
                        checked={description}
                        onChange={(e)=>onChange(e)}>
                        </Control>
                    </Group>

                    <Row>
                        <Col>
                            <Button type='submit' variant='primary' className='my-2'> 
                            Submit
                            </Button>
                        </Col>
                        <Col className='d-flex justify-content-end'>
                            <Link to='/admin/productlist' className='btn btn-warning my-2'>
                            Go back
                            </Link>
                        </Col>
                    </Row>

                  
                </Form>
            ) }
            
        </FormContainer>
        </>
    )
}

export default CreateProductScreen;
