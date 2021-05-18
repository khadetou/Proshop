import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';


//@desc FETCH ALL PRODUCTS 
//@route Get/api/products
//@access public

//Get All products 
const getAllProducts = asyncHandler(async (req, res)=>{

    const products = await Product.find({})
    res.json(products);

});


//@desc FETCH ONE SINGLE PRODUCT
//@route Get/api/products
//@access public

const getProductById = asyncHandler( async(req, res)=>{

    const product = await Product.findById(req.params.id);

    //Check if product is there
    if(product){
        res.json(product);
    }else{
        res.status(404);
        throw new Error('Product not found');
    }
});

export {getAllProducts, getProductById} ;