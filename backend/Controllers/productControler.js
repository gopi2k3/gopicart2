import { AsyncError } from "../middleware/catchAsyncError.js";
import { ProductModels } from "../Models/productModel.js";
import { ApiFeatures } from "../Utils/apiFeatures.js";
import { ErrorHandler } from "../Utils/errorHandler.js";
import mongoose from "mongoose";

//Get Product Data

// Get Data with Search === http://localhost:8080/cart/products?keyword=one

//Get Filter Filter ====http://localhost:8080/cart/products?keyword=redmi&&category=Mobile Phones

// Get Price Filter =====http://localhost:8080/cart/products?price[lte]=200&price[gte]=199

// http://localhost:8080/cart/products?price[gte]=10   aBove 100 Data Show

export const getProduct = async (req, res, next) => {
  const resPerData = 4;

  // Build the base query with search and filter options
  let buildQury = new ApiFeatures(ProductModels.find(), req.query).search().filter();

  // Clone the query to use it separately for counting documents
  const countQuery = buildQury.query.clone();

  // Await the count of filtered products
  const filteredProductCount = await countQuery.countDocuments();

  // Get the total products count
  const totalProductsCount = await ProductModels.countDocuments();

  // Adjust products count based on the filtering
  const productsCount = filteredProductCount !== totalProductsCount ? filteredProductCount : totalProductsCount;

  // Execute the main query with pagination
  const products = await buildQury.paginate(resPerData).query;

  // Send the JSON response
  res.status(200).json({
    success: true,
    count: productsCount,
    resPerData,
    products,
  });
};

//Create Product /data -- cart/product/new

export const newProduct = AsyncError(async (req, res, next) => {
  let images=[];

  let BASE_URL=process.env.BACKEND_URL

  if(process.env.NODE_ENV==='production'){
    BASE_URL=`${req.protocol}://${req.get('host')}`

  }

  if(req.files.length >0){
    req.files.forEach((file)=>{
      let url=`${BASE_URL}/Uploads/Products/${file.originalname}`

      images.push({image:url})
    })
  }
  req.body.images=images
  req.body.user = req.user.id;
  const product = await ProductModels.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// Get Single Products --cart/product/:id

export const singleProduct = AsyncError(async (req, res, next) => {
  const { id } = req.params;
  const product = await ProductModels.findById(id).populate('reviews.user','name email');

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Update Product --cart/product/:id

export const updateProduct = AsyncError(async (req, res, next) => {

  
  let id = req.params.id;



  let product = await ProductModels.findById(id);

  let images=[];

  let BASE_URL=process.env.BACKEND_URL

  if(process.env.NODE_ENV==='production'){
    BASE_URL=`${req.protocol}://${req.get('host')}`

  }

  if(req.body.imagesCleared==='false'){
    images=product.images
  }

  if(req.files.length >0){
    req.files.forEach((file)=>{
      let url=`${BASE_URL}/Uploads/Products/${file.originalname}`

      images.push({image:url})
    })
  }

  req.body.images=images



  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  product = await ProductModels.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// Delete Product --cart/product/:id

export const deleteProduct = AsyncError(async (req, res, next) => {
  const id = req.params.id;

  let product = await ProductModels.findById(id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  await ProductModels.deleteOne({ _id: id });

  res.status(200).json({
    success: true,
    message: "Product Deleted",
  });
});



// create Review == /review


export const createReview = AsyncError(async (req, res, next) => {
  const { productId, rating, comment } = req.body;

  // Create the review object
  const review = {
    user: req.user.id,
    rating: Number(rating), // Ensure rating is a number
    comment,
  };

  // Find the product by ID
  const product = await ProductModels.findById(productId);

  // Check if the product exists
  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  // Find if the user has already reviewed the product
  const isReviewed = product.reviews.find((r) => r.user.toString() === req.user.id.toString());

  if (isReviewed) {
    // Update the existing review
    product.reviews.forEach((r) => {
      if (r.user.toString() === req.user.id.toString()) {
        r.comment = comment;
        r.rating = Number(rating); // Ensure rating is a number
      }
    });
  } else {
    // Add the new review
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  // Calculate the average product rating
  product.ratings = 
    product.reviews.reduce((acc, r) => r.rating + acc, 0) / product.reviews.length;

  // Save the product with the updated reviews and rating
  await product.save({ validateBeforeSave: false });

  // Send the response
  res.status(200).json({
    success: true,
  });
});


// Get Reviews --/reviewes?id={productId}



export const getReviews=AsyncError(async (req,res,next)=>{

  const product=await ProductModels.findById(req.query.id).populate('reviews.user','name email')

  res.status(200).json({
    success: true,
   reviews:product.reviews

  });

})


//Delete Review----------- review


export const deleteReview=AsyncError(async (req,res,next)=>{

  const product=await ProductModels.findById(req.query.productId)

  // filtering the use to Delet the reviews 

  const reviews=product.reviews.filter(r=>{
     return  r._id.toString()!=req.query.id.toString()
  })

  // update numOfReviews ==

  const numOfReviews=reviews.length

  // Calculate the average product rating
  let ratings = 
    reviews.reduce((acc, r) => r.rating + acc, 0) / reviews.length;

    ratings=isNaN(ratings)? 0 :ratings;


    // update the ProductModel 

    await ProductModels.findByIdAndUpdate(req.query.productId,{
      reviews,
      numOfReviews,
      ratings
    })



  res.status(200).json({
    success: true,

  });

})



// get admin Products   /cart/admin/products



export const getAdminProducts=AsyncError(async(req,res,next)=>{
  let products= await ProductModels.find()

  res.status(200).send({
    success:true,
    products

  })
})

