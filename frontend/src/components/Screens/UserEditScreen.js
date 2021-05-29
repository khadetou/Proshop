import React,{useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getUserById, updateUser} from '../../actions/adminAction';
import {Link} from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import FormContainer from '../FormContainer';
import Loader from '../Loader';
import Message from '../Message';

const UserEditScreen = ({match}) => {
    const dispatch = useDispatch();
    
    const [name, setName ] = useState('');
    const [email, setEmail ] = useState('');
    const [isAdmin, setIsAdmin ] = useState(false);
    const {user, loading, error} = useSelector(state => state.admin);
    const alert = useSelector(state=> state.alert);
    const {Group,Control, Label, Check} =Form;

const userId = match.params.id;

 const onSubmit = (e) =>{
        e.preventDefault();
        dispatch(updateUser({userId, name, email, isAdmin}));
    }

    useEffect(()=>{
       
        if(user===null ||user._id !== userId  ){
            dispatch(getUserById(userId))
        }else{
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
    
    },[dispatch,user, userId])

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
                        <Label>Full name</Label>
                        <Control 
                        type='name' 
                        name= 'name'
                        placeholder='Enter your full name' 
                        value={name} 
                        required
                        onChange={(e)=>setName(e.target.value)}>
                        </Control>
                    </Group>
    
                    <Group controlId='email'>
                        <Label>Email Address</Label>
                        <Control 
                        type='email' 
                        name= 'email'
                        placeholder='Enter email' 
                        value={email} 
                        required
                        onChange={(e)=>setEmail(e.target.value)}>
                        </Control>
                    </Group>
    
                    <Group controlId='isAdmin'>
                        <Check 
                        type='checkbox' 
                        name= 'isAdmin'
                        label='Is Admin'
                        checked={isAdmin}
                        onChange={(e)=>setIsAdmin(e.target.checked)}>
                        </Check>
                    </Group>
                    <Button type='submit' variant='primary' className='my-2'> 
                        Submit
                    </Button>
                </Form>
            ) }
            
        </FormContainer>
        </>
    )
}

export default UserEditScreen;
