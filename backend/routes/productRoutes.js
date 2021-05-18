import express from 'express';
import {getAllProducts, getProductById} from '../controllers/productController.js';


const router = express.Router();


//@desc FETCH ALL PRODUCTS 
//@route Get/api/products
//@access public

//Get all products 
router.route('/').get(getAllProducts);



//@desc FETCH ONE SINGLE PRODUCT
//@route Get/api/products
//@access public

//Get one product by id
router.route('/:id').get(getProductById);

export default router;