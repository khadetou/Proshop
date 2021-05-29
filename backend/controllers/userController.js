import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';


//@desc get users admin only
//@route Get/api/users
//@access Private/Admin

export const getAllusers = asyncHandler(async (req, res)=>{

    const users = await User.find({})
    res.json(users);

});