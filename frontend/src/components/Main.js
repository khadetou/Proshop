import React from 'react';
import {Container} from 'react-bootstrap';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import {Route} from 'react-router-dom';
import CartScreen from './Screens/CartScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import ProfileScreen from './Screens/ProfileScreen';
import PrivateRoute from './routing/PrivateRoute';

const Main = () => {
    return (
        <main className="py-3">
            <Container>
               <Route exact path='/' component={HomeScreen}/>
               <Route exact path='/login' component={LoginScreen}/>
               <Route exact path='/register' component={RegisterScreen}/>
               <PrivateRoute exact path='/profile' component={ProfileScreen}/>
               <Route exact path='/product/:id' component={ProductScreen}/>
               <Route exact path='/cart/:id?' component={CartScreen}/>
            </Container>
        </main>
    )
}

export default Main;
