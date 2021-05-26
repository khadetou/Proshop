import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Form, Col, Row, Button} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import Message from '../Message';
import {login} from '../../actions/authActions';
import FormContainer from '../FormContainer';

const LoginScreen = ({history}) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const {user} = useSelector(state=>state.auth);
    const alert = useSelector (state=> state.alert);
    const {email, password} = formData;
    const {Group,Control, Label} =Form;

    const onChange = (e)=>setFormData({...formData, [e.target.name]: e.target.value});
   
    const {location} = history;
    let redirect = location.search ? location.search.split('=')[1]: '/';
    

    useEffect(()=>{
        if(user){
            history.push(redirect);
        }
    },[history, redirect, user])


    const onSubmit = (e) =>{
        e.preventDefault();
        dispatch(login({email, password}));
    }

   let alerts = alert.map((ale, idx)=>(
       <Message key={idx} variant={ale.alertType}>{ale.msg}</Message>
   ));


    return (
        <FormContainer>
            <h1>Sign in</h1>
            {alerts}
            <Form onSubmit={(e)=>onSubmit(e)}>
                <Group controlId='email'>
                    <Label>Email Address</Label>
                    <Control 
                    type='email' 
                    name= 'email'
                    placeholder='Enter email' 
                    value={email} 
                    required
                    onChange={(e)=>onChange(e)}>
                    </Control>
                </Group>

                <Group controlId='password'>
                    <Label>Password</Label>
                    <Control 
                    type='password' 
                    name= 'password'
                    placeholder='Enter password' 
                    value={password} 
                    required
                    onChange={(e)=>onChange(e)}>
                    </Control>
                </Group>

                <Button type='submit' variant='primary' className='my-2'> Sign In</Button>
                <Row className='py-3'>
                    <Col>
                        New Customer?{' '}
                        <Link to={redirect? `/register?redirect=${redirect}`:'/register'}>Register</Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    )
}
//Redirect? `/register/redirect=${Redirect}`:
export default LoginScreen
