import React from 'react';
import {Container} from 'react-bootstrap';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import {Route} from 'react-router-dom';
import CartScreen from './Screens/CartScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import ProfileScreen from './Screens/ProfileScreen';
import ProfileEdit from './Screens/ProfileEdit';
import Shipping from './Screens/Shipping';
import PaymentScreen from './Screens/PaymentScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import OrderScreen from './Screens/OrderScreen';
import UserListScreen from './Screens/UserListScreen';
import ListProductScreen from './Screens/ListProductScreen';
import CreateProductScreen from './Screens/CreateProductScreen';
import EditProductScreen from './Screens/EditProductScreen';
import UserEditScreen from './Screens/UserEditScreen'
import PrivateRoute from './routing/PrivateRoute';

const Main = () => {
    return (
        <main className="py-3">
            <Container>
               <Route exact path='/' component={HomeScreen}/>
               <Route exact path='/login' component={LoginScreen}/>
               <Route exact path='/register' component={RegisterScreen}/>
               <PrivateRoute exact path='/profile' component={ProfileScreen}/>
               <PrivateRoute exact path='/profile-edit' component={ProfileEdit}/>
               <PrivateRoute exact path='/shipping' component={Shipping}/>
               <PrivateRoute exact path='/payment' component={PaymentScreen}/>
               <PrivateRoute exact path='/placeorder' component={PlaceOrderScreen}/>
               <PrivateRoute exact path='/admin/userlist' component={UserListScreen}/>
               <PrivateRoute exact path='/admin/productlist' component={ListProductScreen}/>
               <PrivateRoute exact path='/admin/createproduct' component={CreateProductScreen}/>
               <PrivateRoute exact path='/admin/product/:id/edit' component={EditProductScreen}/>
               <PrivateRoute exact path='/admin/user/:id/edit' component={UserEditScreen}/>
               <PrivateRoute exact path='/order/:id' component={OrderScreen}/>
               <Route exact path='/product/:id' component={ProductScreen}/>
               <Route exact path='/cart/:id?' component={CartScreen}/>
            </Container>
        </main>
    )
}

export default Main;
