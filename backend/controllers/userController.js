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
export const deleteUser = asyncHandler(async (req, res)=>{

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

//@desc get user by id admin only
//@route Get/api/users/:id
//@access Private/Admin

export const getuserById = asyncHandler(async (req, res)=>{

    const user = await User.findById(req.params.id).select('-password');

    if(user){
        res.json(user);
    }else{
        res.status(404);
        throw new Error('User not found');
    }
});

//@desc update user by the admin
//@route Put/api/users/:id
//@access private

export const updateUser= asyncHandler( async(req, res)=>{

        const {name, email, isAdmin} = req.body;

        const user = await User.findById(req.params.id).select('-password')
    console.log(user)
        if(user){

            user.name = name || user.name;
            user.email = email || user.email,
            user.isAdmin = isAdmin 

        }
     
        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })

   
});
