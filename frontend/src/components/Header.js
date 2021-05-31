import React from 'react';
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import { FaShoppingCart} from "react-icons/fa";
import { FaUserAlt} from "react-icons/fa";
import {useSelector, useDispatch} from 'react-redux';
import {logout} from '../actions/authActions';
import SearchBox from './SearchBox';

const Header = () => {
    const {Brand, Toggle, Collapse} = Navbar;
    const {Link} = Nav;
    const {isAuthenticated, user} = useSelector(state=>state.auth);
    const dispatch = useDispatch();
    const {Item} = NavDropdown;


    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Brand>ProShop</Brand>
                       
                    </LinkContainer>
                    

                    <Toggle aria-controls="basic-navbar-nav" />
               
                    <Collapse id="basic-navbar-nav">
                    <SearchBox/>
                    
                        <Nav className="ms-auto">
                            
                            <LinkContainer  to='/cart'>
                                <Link className="d-flex justify-content-center align-items-center">
                                <FaShoppingCart className="me-1"/>
                                Cart
                                </Link>
                            </LinkContainer>
                            
                            {user !== null &&  isAuthenticated?
                                
                                (<NavDropdown title={user.isAdmin?user.name : user.name.trim().split(' ')[0]}  id='username' className='m-0'>
                                <LinkContainer to='/profile'>
                                <Item>Profile</Item>
                                </LinkContainer>
                                <Link to='/'>
                                    <Item onClick={()=>dispatch(logout())}>
                                        Log out
                                    </Item>
                                </Link>
                                </NavDropdown>)
                            :

                            (
                            <LinkContainer to='/login'>
                            <Link className="d-flex justify-content-center align-items-center">
                            <FaUserAlt className="me-1"/>
                                Sign in
                            </Link>
                            </LinkContainer>)
                            
                        }

                        {user && user.isAdmin &&
                            <NavDropdown title='Admin'  id='adminMenu'>
                                <LinkContainer to='/admin/userlist'>
                                    <Item>Users</Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/productlist'>
                                    <Item>Products</Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/orderlist'>
                                    <Item>Orders</Item>
                                </LinkContainer>
                            </NavDropdown>
                        }
                        </Nav>
                    </Collapse>
                </Container>
 

            </Navbar>
        </header>
    )
}

export default Header;
