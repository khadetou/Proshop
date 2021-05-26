import React from 'react';
import {Link} from 'react-router-dom';
import {Row, Col} from 'react-bootstrap';

const ProfileScreen = () => {
    return (
        <Row>
            <Col md ={12}>
                <Row>
                    <Col md={12}>
                         <Link to='/profile-edit' className='btn btn-dark'>Edit profile</Link>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <h2 className="my-5">My Orders</h2>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default ProfileScreen;
