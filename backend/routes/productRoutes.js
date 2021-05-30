import express from 'express';
import {getAllProducts, getProductById, deleteProduct, createProducts} from '../controllers/productController.js';
import authMidleware ,{isAdmin} from '../middleware/authMiddleware.js';
import {check} from 'express-validator';


const router = express.Router();






router.post('/',[authMidleware, isAdmin, 
check('name', 'Name is required').not().isEmpty(),
check('image', 'Image is required').not().isEmpty(),
check('price','price is required').not().isEmpty()],createProducts)



//@desc FETCH ALL PRODUCTS 
//@route Get/api/products
//@access public

//Get all products 
router.route('/')
.get(getAllProducts);



//@desc FETCH ONE SINGLE PRODUCT
//@route Get/api/products
//@access public

//Get one product by id
router.route('/:id')
.get(getProductById)
.delete(authMidleware, isAdmin, deleteProduct)
export default router;