import React from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import { FaShoppingCart} from "react-icons/fa";
import { FaUserAlt} from "react-icons/fa";
const Header = () => {
    const {Brand, Toggle, Collapse} = Navbar;
    const {Link} = Nav;
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Brand>ProShop</Brand>
                    </LinkContainer>
                    

                    <Toggle aria-controls="basic-navbar-nav" />

                    <Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <LinkContainer to='/cart'>
                                <Link className="d-flex justify-content-center align-items-center">
                                <FaShoppingCart className="me-1"/>
                                Cart
                                </Link>
                            </LinkContainer>

                            <LinkContainer to='/login'>
                                <Link className="d-flex justify-content-center align-items-center">
                                <FaUserAlt className="me-1"/>
                                Sign in
                                </Link>
                            </LinkContainer>
                          
                        </Nav>
                    </Collapse>
                </Container>
 

            </Navbar>
        </header>
    )
}

export default Header;
