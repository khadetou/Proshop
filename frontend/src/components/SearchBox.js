import React,{useRef} from 'react'
import {Form, Button} from 'react-bootstrap';
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom';
import {getProducts} from '../actions/productAction'

const SearchBox = () => {

    const history = useHistory();
    const keyword = useRef('');
    const dispatch = useDispatch()
    
    const submitHandler = (e)=>{
        e.preventDefault();
        if(keyword.current.value.trim()){
            history.push(`/search/${keyword.current.value}`)
        }else{
            history.push('/')
            localStorage.removeItem('keyw')
        }
    }
   
    const onchangeHandler = (e)=>{
        dispatch(getProducts(keyword.current.value))
        localStorage.setItem('keyw', keyword.current.value);
    }
    const {Control} = Form;
    return (
        <Form  className='d-flex' onSubmit={submitHandler}>
            <Control 
            ref={keyword}
            type='text'
            name='keyword'
            placeholder='Search product...'
            className='me-sm-2 ms-sm-5'
            onChange={onchangeHandler}
            >
            </Control> 
            
            <Button type='submit' variant='outline-success' className='p-2'>
                    Search
            </Button>
        </Form>
        
    )
}

export default SearchBox;
