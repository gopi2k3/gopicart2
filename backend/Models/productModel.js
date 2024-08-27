import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Product Name"],
    trim: true,
    maxLength: [100, "Product Name Cannot Exceed 100 Chatacters"],
  },
  price: {
    type: Number,
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, "Please Enter Product Description"],
  },
  ratings: {
    type: String,
    default: 0,
  },
  images: [
    {
      image: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please Enter Product Category"],
    enum: {
      values: [
        "Electronics",
        "Mobile Phones",
        "Laptops",
        "Accessories",
        "Headphones",
        "Food",
        "Books",
        "Cloths/Shoes",
        "Beauty/Health",
        "Sports",
        "Outdoor",
        "Home",
      ],
      message: "Please Select correct Category",
    },
  },
  seller: {
    type: String,
    required: [true, "Please Enter Seller"],
  },
  stock: {
    type: Number,
    required: [true, "Please Enter Product Stock"],
    maxLength: [20, "Product Stock Cannot exceed 20"],
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
        user:{
          type:mongoose.Schema.Types.ObjectId,
          ref:'userData'
        },
        rating: {
          type: String,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      
    },
  ],

  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const ProductModel = mongoose.model("ProductData", productSchema);

export { ProductModel as ProductModels };
