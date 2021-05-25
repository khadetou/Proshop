import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {Form, Col, Row, Button} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import Message from '../Message';
import {register} from '../../actions/authActions';
import FormContainer from '../FormContainer';
import {setAlert} from '../../actions/alertAction';


const RegisterScreen = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name:'',
        email: '',
        password: '',
        password2: ''
    })

    const {isAuthenticated} = useSelector(state=>state.auth);
    const alert = useSelector (state=> state.alert);
    const {name, email, password, password2} = formData;
    const {Group,Control, Label} =Form;

    const onChange = (e)=>setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = (e) =>{
        e.preventDefault();
        if(password !== password2){
            dispatch(setAlert('Passwords dont match !!',  'danger'))
        }else{
            dispatch(register({name, email, password}));
        }
        
    }

   let alerts = alert.map((ale, idx)=>(
       <Message key={idx} variant={ale.alertType}>{ale.msg}</Message>
   ));

   if(isAuthenticated){
       return <Redirect to='/'/>
   }

    return (
        <FormContainer>
            <h1>Register </h1>
            {alerts}
            <Form onSubmit={(e)=>onSubmit(e)}>
            <Group controlId='name'>
                    <Label>Full name</Label>
                    <Control 
                    type='name' 
                    name= 'name'
                    placeholder='Enter your full name' 
                    value={name} 
                    required
                    onChange={(e)=>onChange(e)}>
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

                <Group controlId='password2'>
                    <Label>Password</Label>
                    <Control 
                    type='password' 
                    name= 'password2'
                    placeholder='Confirm password' 
                    value={password2} 
                    required
                    onChange={(e)=>onChange(e)}>
                    </Control>
                </Group>

                <Button type='submit' variant='primary' className='my-2'> Sign In</Button>
                <Row className='py-3'>
                    <Col>
                        Aleready have an account?{' '}
                        <Link to='/login'>Login</Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    )
}
//Redirect? `/register/redirect=${Redirect}`:
export default RegisterScreen
