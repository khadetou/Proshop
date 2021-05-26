import React, {useState} from 'react';
import FormContainer from '../FormContainer';
import {useDispatch, useSelector} from 'react-redux';
import {saveShippingAddress} from '../../actions/productAction';
import {Form, Button} from 'react-bootstrap';
import CheckoutSteps from '../CheckoutSteps';

const Shipping = ({history}) => {

    const {shippingAddress} = useSelector(state=>state.cart);
    console.log(shippingAddress)
    const [address, setAddress]= useState(shippingAddress.address);
    const [city, setCity]= useState(shippingAddress.city);
    const [postalCode, setPostalCode]= useState(shippingAddress.postalCode);
    const [country, setCountry]= useState(shippingAddress.country);

    const dispatch = useDispatch();
    



    const submitHandler = (e)=>{
        e.preventDefault();

        const data={
            address,
            city,
            postalCode,
            country
        }
        console.log(data);

        dispatch(saveShippingAddress(data))
        history.push('/payment')
    }

    const {Group, Label, Control} = Form;

    return (
        <FormContainer>
            <CheckoutSteps step1 step2/>
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Group controlId="address">
                    <Label>Address</Label>
                    <Control
                    type ="text"
                    placeholder="Enter an address"
                    value={address}
                    onChange={e=>setAddress(e.target.value)}
                    required
                    >
                    </Control>
                </Group>

                <Group controlId="city">
                    <Label>City</Label>
                    <Control
                    type ="text"
                    placeholder="Enter an city"
                    value={city}
                    onChange={e=>setCity(e.target.value)}
                    required
                    >
                    </Control>
                </Group>

                
                <Group controlId="postalCode">
                    <Label>PostalCode</Label>
                    <Control
                    type ="text"
                    placeholder="Enter an postalCode"
                    value={postalCode}
                    onChange={e=>setPostalCode(e.target.value)}
                    required
                    >
                    </Control>
                </Group>

                <Group controlId="country">
                    <Label>Country</Label>
                    <Control
                    type ="text"
                    placeholder="Enter a country"
                    value={country}
                    onChange={e=>setCountry(e.target.value)}
                    required
                    >
                    </Control>
                </Group>

                <Button type='submit' variant='primary' className='my-3'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default Shipping;
