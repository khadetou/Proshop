import React, {useState} from 'react';
import FormContainer from '../FormContainer';
import {useDispatch, useSelector} from 'react-redux';
import {savePaymentMethod} from '../../actions/productAction';
import {Form, Button, Col} from 'react-bootstrap';
import CheckoutSteps from '../CheckoutSteps';

const PaymentScreen = ({history}) => {

    const {shippingAddress} = useSelector(state=>state.cart);
   
    const [paymentMethod, setPaymentMethod]= useState('PayPal');
    

    const dispatch = useDispatch();
    
    if(!shippingAddress){
        history.push('/shipping')
    }

    const submitHandler = (e)=>{
        e.preventDefault();


        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    const {Group, Label, Check} = Form;

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Group controlId="address">
                    <Label as='legend'>Select Method</Label>
                    <Col>
                        <Check
                        type='radio'
                        label='Paypal or Credit Card' 
                        id='PayPal' 
                        name='paymentMethod' 
                        value='PayPal' 
                        checked 
                        onChange={e=>setPaymentMethod(e.target.value)}>
                        </Check>
                        {/* <Check
                        type='radio'
                        label='Stripe or Credit Card' 
                        id='Stripe' 
                        name='paymentMethod' 
                        value='Stripe' 
                        checked 
                        onChange={e=>setPaymentMethod(e.target.value)}>
                        </Check> */}
                    </Col>
                </Group>

                <Button type='submit' variant='primary' className='my-3'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen;
