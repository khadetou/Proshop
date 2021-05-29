import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

//@desc get users admin only
//@route Get/api/users
//@access Private/Admin

export const getAllusers = asyncHandler(async (req, res)=>{

    const users = await User.find({})
    res.json(users);

});


//@desc delete user
//@route delete/api/users/:id
//@access Private/Admin
export const deletUser = asyncHandler(async (req, res)=>{

    const user = await User.findById(req.params.id);
    const [userOrder ]= await Order.find({user: req.params.id})

    if(user && userOrder){
        userOrder.remove()
        user.remove();
        res.json({message:'User removed'});
    }else if(user){
        user.remove();
        res.json({message:'User removed'});
    }else{
        res.status(404);
        throw new Error('User not found');
    }

});

