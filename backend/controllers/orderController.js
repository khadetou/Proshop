import Order from '../models/orderModel.js';
import asyncHandler from 'express-async-handler';


//@desc create new posts
//@route Post/api/orders
//@access private
//Get All products 
export const addOrderItems = asyncHandler(async (req, res)=>{

    const {
        orderItems, 
        shippingAddress, 
        paymentMethod, 
        itemsPrice, 
        taxPrice, 
        shippingPrice, 
        totalPrice
    } = req.body;

    if(orderItems && orderItems ===0){
        res.send(400)
        throw new Error('No order items')
        return
    }else{

        const order = new Order({
            orderItems, 
            user: req.user.id,
            shippingAddress, 
            paymentMethod, 
            itemsPrice, 
            taxPrice, 
            shippingPrice, 
            totalPrice
        })

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }

});


//@desc Get order by id
//@route Get/api/orders/:id
//@access private
//Get All products 
export const getOrderById = asyncHandler(async (req, res)=>{

    const order  = await Order.findById(req.params.id).populate('user', 'name email');


    if(order){
        res.json(order)
    }else{
        res.status(404);
        throw new Error('Order not found')
    }

});