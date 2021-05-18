import express from 'express';
import {check,validationResult} from 'express-validator';
import User from '../models/userModel.js';
import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';

const router = express.Router();



//@desc Auth user & get token
//@route Post /api/users
//@access public
router.post('/',[check('name','Name is required'),check('email', 'Enter a valid email').isEmail(), check('password', 'Enter a password with 6 or more characters').isLength({min: 6})], async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {name, email, password, isAdmin} = req.body;
    
    try {
        let user = await User.findOne({ email })

    if(user){
       res.status(400).json({errors: [{msg: 'User already exists'}]});
    }

    user = new User({
        name,
        email,
        password,
        isAdmin
    })

    //Encrypt Password
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);
    await user.save();

    //Return jsonwebtoken
    const payload ={
        user:{
            id: user.id
        }
    }

    jsonwebtoken.sign(payload, process.env.JWTS, {expiresIn: '3d'}, (err, token)=>{
        if(err) throw err;
        res.json({token})
    })
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

export default router;