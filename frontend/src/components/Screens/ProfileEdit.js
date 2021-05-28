import React, {useState, Fragment} from 'react';
import {Form,  Button} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import Message from '../Message';
import {updateUser} from '../../actions/authActions';
import FormContainer from '../FormContainer';
import {setAlert} from '../../actions/alertAction';


const ProfileEdit = () => {
    const dispatch = useDispatch();




    const [formData, setFormData] = useState({
        id: '',
        name:'',
        email: '',
        password: '',
        password2: ''
    })

    const alert = useSelector (state=> state.alert);
    const {id,name, email, password, password2} = formData;
    
    const {Group,Control, Label} =Form;
    const {user} = useSelector(state=>state.auth)
    console.log()
    const onChange = (e)=>setFormData({...formData, [e.target.name]: e.target.value, id: user._id});




    const onSubmit = (e) =>{
        e.preventDefault();
        if(password !== password2){
            dispatch(setAlert('Passwords dont match !!',  'danger'))
        }else{
            dispatch(updateUser({id, name, email, password}));
        }
        
    }

   let alerts = alert.map((ale, idx)=>(
       <Message key={idx} variant={ale.alertType}>{ale.msg}</Message>
   ));

  
    return (
        <FormContainer>
        {user !== null &&
        <Fragment>
           <h1>UPDATE USER PROFILE </h1>

             {alerts}
             <Form onSubmit={(e)=>onSubmit(e)}>
           <Group controlId='name'>
                    <Label>Full name</Label>
                   <Control 
                  type='name' 
                    name= 'name'
                     placeholder='Enter your full name' 
                    value={user.name} 
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
                     value={user.email} 
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

                 <Button type='submit' variant='primary' className='my-2'>UPDATE</Button>
                 
                 <Link to='/profile' className='btn btn-warning m-5'>
                    Back 
                 </Link>
            </Form> 
        </Fragment>}
       </FormContainer>
    )
}
// //Redirect? `/register/redirect=${Redirect}`:
export default ProfileEdit;
