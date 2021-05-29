import express from 'express';
import {check,validationResult} from 'express-validator';
import User from '../models/userModel.js';
import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import authMiddleware, {isAdmin} from '../middleware/authMiddleware.js';
import {getAllusers,deletUser} from '../controllers/userController.js';

const router = express.Router();



//@desc Auth user & get token
//@route Post /api/users
//@route Registering
//@access public
router.post('/',[check('name','Name is required').not().isEmpty(),check('email', 'Enter a valid email').isEmail(), check('password', 'Enter a password with 6 or more characters').isLength({min: 6})], async (req, res)=>{

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




//GET ALL USERS AS THE ADMIN
router.route('/').get(authMiddleware,isAdmin, getAllusers);


//@desc Update User credentials most of all his password
//@route Put api/users/profile
//@access Private
router.put('/profile-edit',[authMiddleware, 
            check('password', 'Enter a password with 6 or more characters')
            .isLength({min: 6})], async(req, res)=>{

                const errors = validationResult(req);
                if(!errors.isEmpty()){
                    return res.status(400).json({errors: errors.array()});
                }

                const {name, email, password} = req.body;

                try{
                    const user = await User.findById(req.user.id)
                    if(user){
                        user.name = name || user.name;
                        user.email = email || user.email
                    }
                    if(password){
                        //Encrypt Password
                        const salt = await bcryptjs.genSalt(10);
                        user.password = await bcryptjs.hash(password, salt)
                    }
                    const updatedUser = await user.save()

                    res.json({
                        _id: updatedUser._id,
                        name: updatedUser.name,
                        email: updatedUser.email,
                        isAdmin: updatedUser.isAdmin
                    })

                }catch(error){
                    console.error(error.message);
                    res.status(500).send('Server error');
                }
            })


router.route('/:id').delete(authMiddleware, isAdmin, deletUser);


export default router;