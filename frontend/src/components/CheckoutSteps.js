import React from 'react';
import {Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

const CheckOutSteps = ({step1,step2,step3,step4}) => {
const {Item, Link} = Nav;


    return (
        <Nav className='justify-content-center mb-4'>
            <Item>
                { step1?
                (<LinkContainer to='/login'>
                    <Link>Sign In</Link>
                </LinkContainer>):
                (<LinkContainer to='/login'>
                    <Link disabled >Sign In</Link>
                </LinkContainer>)
                }
            </Item>
            <Item>
                { step2?
                (<LinkContainer to='/shipping'>
                    <Link>Shipping</Link>
                </LinkContainer>):
                (<LinkContainer to='/shipping'>
                    <Link disabled >Shipping</Link>
                </LinkContainer>)
                }
            </Item>
            <Item>
                { step3?
                (<LinkContainer to='/payment'>
                    <Link>Payment</Link>
                </LinkContainer>):
                (<LinkContainer to='/payment'>
                    <Link disabled >Payment</Link>
                </LinkContainer>)
                }
            </Item>
            <Item>
                { step4?
                (<LinkContainer to='/placeorder'>
                    <Link>Place Order</Link>
                </LinkContainer>):
                (<LinkContainer to='/placeorder'>
                    <Link disabled >Place Order</Link>
                </LinkContainer>)
                }
            </Item>
        </Nav>
    )
}

export default CheckOutSteps;
