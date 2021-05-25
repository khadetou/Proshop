import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import User from '../models/userModel.js';
import {check, validationResult} from 'express-validator';
import jsonwebtoken from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';


//INITIALIZING OUR ROUTER
const router = express.Router();

//@route   GET /api/user/profile
//@desc    get user info
//@access  Private

router.get('/profile', authMiddleware, async(req, res)=>{
    try {
        const user = await User.findById(req.user.id).select('-password');

        res.json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
});


//@route   Post /api/user
//@desc    Login as user
//@access  Public

router.post('/', [
    check('email', 'Enter a valid email').isEmail(),
    check('password', 'Password is required').exists()
], async(req, res)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;
    try {
        //CHECK IF THE USER EXIST
         let user = await User.findOne({email});

         if(!user){
             res.status(400).json({errors: [{msg: 'Invalid Credentials'}]})
         }

         //CHECK IF THE PASSWORD EXIST
         const isMatch = await bcryptjs.compare(password, user.password);

         if(!isMatch){
             res.status(400).json({errors: [{msg: 'Invalid Crendentials'}]})
         }

         //Return jsonwebtoken
         const payload ={
             user:{
                 id: user.id
             }
         }

         jsonwebtoken.sign(payload, process.env.JWTS, {expiresIn: '3d'}, (err, token) =>{

            if(err) throw err;
            res.json({token});
         })

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }


});

export default router;