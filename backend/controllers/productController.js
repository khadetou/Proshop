import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";

//@desc FETCH ALL PRODUCTS
//@route Get/api/products
//@access public
//Get All products

const getAllProducts = asyncHandler(async (req, res) => {
  //PAGINATION
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  //SEARCH BACKEND FUNCTIONALITY
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

//@desc FETCH ONE SINGLE PRODUCT
//@route Get/api/products
//@access public

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  //Check if product is there
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//@desc delete product
//@route delete/api/products/:id
//@access Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//@desc Create or update product
//@route Post/api/products
//@access private, admin

const createProducts = asyncHandler(async (req, res) => {
  //CHECK IF NAME IMAGE AND PRICE ARE PRESENT
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //CRATE AND UPDATE SECTION
  const {
    name,
    image,
    brand,
    category,
    description,
    reviews,
    rating,
    numReviews,
    price,
    countInStock,
  } = req.body;

  const productField = {};
  productField.user = req.user.id;

  if (name) productField.name = name;
  if (image) productField.image = image;
  if (brand) productField.brand = brand;
  if (category) productField.category = category;
  if (description) productField.description = description;
  if (rating) productField.rating = rating;
  if (numReviews) productField.numReviews = numReviews;
  if (price) productField.price = price;
  if (countInStock) productField.countInStock = countInStock;

  let product = await Product.findOne({ user: req.user.id });

  //CREATE
  product = new Product(productField);
  await product.save();
  res.json(product);
});

//@desc   update product
//@route put/api/products/:id
//@access private, admin

const updateProduct = asyncHandler(async (req, res) => {
  //CHECK IF NAME IMAGE AND PRICE ARE PRESENT
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //CRATE AND UPDATE SECTION
  const {
    name,
    image,
    brand,
    category,
    description,
    reviews,
    rating,
    numReviews,
    price,
    countInStock,
  } = req.body;
  let product = await Product.findById(req.params.id);

  if (product) {
    (product.name = name || product.name),
      (product.image = image || product.image),
      (product.brand = brand || product.brand),
      (product.category = category || product.category),
      (product.description = description || product.description),
      (product.rating = rating || product.rating),
      (product.numReviews = numReviews || product.numReviews),
      (product.price = price || product.price),
      (product.countInStock = countInStock || product.countInStock);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }

  const updatedProduct = await product.save();
  res.json(updatedProduct);
});

//@desc Create new review
//@route post/api/products/:id/reviews
//@access private

const createProductReview = asyncHandler(async (req, res) => {
  let product = await Product.findById(req.params.id);

  const { rating, comment } = req.body;

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user.id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user.id,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;
    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//@desc get top rated products
//@route Get/api/products/top
//@access private

const getTopProducts = asyncHandler(async (req, res) => {
  let products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});

export {
  getAllProducts,
  getProductById,
  createProducts,
  updateProduct,
  createProductReview,
  getTopProducts,
};
