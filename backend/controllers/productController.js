import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';
import {validationResult} from 'express-validator'

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

//@desc delete product 
//@route delete/api/products/:id
//@access Private/Admin
export const deleteProduct = asyncHandler(async (req, res)=>{

    const product = await Product.findById(req.params.id);
    

    if(product){
        await product.remove();
        res.json({message:'Product removed'});
    }else{
        res.status(404);
        throw new Error('Product not found');
    }

});


//@desc Create or update product
//@route Post/api/products
//@access private, admin

const createProducts = asyncHandler(async (req, res)=>{
    //CHECK IF NAME IMAGE AND PRICE ARE PRESENT
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    //CRATE AND UPDATE SECTION
    const {name, image, brand, category, description, reviews, rating, numReviews, price, countInStock, } = req.body;


    const productField = {};
    productField.user = req.user.id;
    
    if(name) productField.name = name;
    if(image) productField.image = image;
    if(brand) productField.brand = brand;
    if(category) productField.category = category;
    if(description) productField.description= description;
    if(rating) productField.rating = rating;
    if(numReviews) productField.numReviews = numReviews;
    if(price) productField.price = price;
    if(countInStock) productField.countInStock = countInStock;

    let product = await Product.findOne({user: req.user.id});
    if(product){
        //UPDATE
        product = await Product.findOneAndUpdate(
            {user: req.user.id},
            {$set: productField},
            {new: true}
        )
        return res.json(product)
    }

    //CREATE 
    product = new Product(productField);
    await product.save();
    res.json(product);
})

export {getAllProducts, getProductById, createProducts} ;