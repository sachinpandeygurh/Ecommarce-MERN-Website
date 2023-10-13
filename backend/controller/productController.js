const Product = require("../model/prodectModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const apiFeatures = require("../utils/apifeatures");

// Create Product
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  let prod = req.body;

  if (!prod) {
    return next(new ErrorHander("Product data not found", 404));
  }

  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// Get all Products

exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const features = new apiFeatures(Product.find(), req.query).search();
  const products = await features.query;
  res.status(200).json({
    success: true,
    products,
  });
});


// Get one product details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Update Product - admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    message: "Product updated successfully",
    success: true,
    product,
  });
});

// Delete product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  await product.deleteOne();

  res.status(200).json({
    message: `${product.name} deleted successfully`,
    success: true,
  });
});
