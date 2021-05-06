import React from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import { FaShoppingCart} from "react-icons/fa";
import { FaUserAlt} from "react-icons/fa";
const Header = () => {
    const {Brand, Toggle, Collapse} = Navbar;
    const {Link} = Nav;
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <Brand href="/">ProShop</Brand>

                    <Toggle aria-controls="basic-navbar-nav" />

                    <Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Link href="/cart" className="d-flex justify-content-center align-items-center">
                                <FaShoppingCart className="me-1"/>
                                Cart
                            </Link>
                            <Link href="/login" className="d-flex justify-content-center align-items-center">
                                <FaUserAlt className="me-1"/>
                                Sign in
                            </Link>
                        </Nav>
                    </Collapse>
                </Container>
 

            </Navbar>
        </header>
    )
}

export default Header;
