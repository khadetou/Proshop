import axios from 'axios';
import React,{useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {updateProduct, getProductDetails} from '../../actions/productAction';
import {Link} from 'react-router-dom';
import {Form, Button, Row, Col} from 'react-bootstrap';
import FormContainer from '../FormContainer';
import Loader from '../Loader';
import Message from '../Message';

const EditProductScreen = ({history, match}) => {
    const dispatch = useDispatch();
    
    const [formDatas, setFormData] = useState({
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
    const[ uploading, setUploading] = useState(false)

    const productId  = match.params.id;
    const {Group,Control, Label, File} =Form;

    const {name, image, brand, category, description, price, countInStock}=formDatas;


    const alert = useSelector(state=> state.alert);
    const {loading, error, productsD}= useSelector(state=>state.productDetail);


    const uploadFileHandler = async (e)=>{
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image',file);
        setUploading(true);

        try {
            const config = {
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            }

            const {data} = await axios.post('/api/upload', formData, config);
           
           setFormData({...formDatas,image: data})
           setUploading(false)

        } catch (error) {
            console.log(error.response.data);
            setUploading(false)
        }
    }


    useEffect(()=>{
        if(productsD === null || productsD._id !== productId){
            dispatch(getProductDetails(productId))
        }else{
            setFormData({
                name:   productsD.name,
                image: productsD.image,
                brand:  productsD.brand,
                category: productsD.category,
                description: productsD.description,
                price: productsD.price,
                countInStock: productsD.countInStock,
            })
        
        }
        
    },[productId, dispatch, productsD, loading])
    const onChange = (e)=>{
        setFormData({...formDatas, [e.target.name]: e.target.value})
    }

    const onSubmit = (e) =>{
        e.preventDefault();
        dispatch(updateProduct(formDatas, productId));
    }

  

    const alerts = alert.map((alert,idx)=>(
        <Message key={idx} variant={`${alert.alertType}`}>{alert.msg}</Message>
    ))

    return (
        <>
          <FormContainer>
            <h1>UPDATE PRODUCTS </h1>
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
                        <File
                        id='image-file'
                        label='Choose file'
                        custom
                        onChange={uploadFileHandler}
                        >
                        </File>
                        {uploading && <Loader/>}
                    </Group>
    
                    <Group controlId='brand'>
                        <Label>Brand</Label>
                        <Control
                        type='text' 
                        name= 'brand'
                        placeholder='Put the brand of the product'
                        value={brand}
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
                        value={price}
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
                        value={countInStock}
                        onChange={(e)=>onChange(e)}>
                        </Control>
                    </Group>

                    <Group controlId='category'>
                        <Label>Category</Label>
                        <Control
                        type='text' 
                        name= 'category'
                        placeholder='Put the category of the product'
                        value={category}
                        onChange={(e)=>onChange(e)}>
                        </Control>
                    </Group>

                    <Group controlId='description'>
                        <Label>Description</Label>
                        <Control
                        type='text' 
                        name= 'description'
                        placeholder='Put the description of the product'
                        value={description}
                        onChange={(e)=>onChange(e)}>
                        </Control>
                    </Group>

                    <Row>
                        <Col>
                            <Button type='submit' variant='primary' className='my-2'> 
                            UPDATE
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

export default EditProductScreen;
