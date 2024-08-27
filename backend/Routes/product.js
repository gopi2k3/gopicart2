import express from "express";
import {
  createReview,
  deleteProduct,
  deleteReview,
  getAdminProducts,
  getProduct,
  getReviews,
  newProduct,
  singleProduct,
  updateProduct,
} from "../Controllers/productControler.js";
import {
  authorizeRoles,
  isAuthenticateUser,
} from "../middleware/authenticate.js";

import multer from 'multer'

import path from 'path'

import { fileURLToPath } from 'url';
import { dirname } from 'path';







const router = express.Router();


// using Multer for Uplodaing Products image 


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const upload=multer({storage:multer.diskStorage({
    destination :function (req,file,cb){
        cb(null,path.join(__dirname,'..','Uploads/Products'))

    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})})




// Route to get all products, only authenticated users can access
router.get("/products", getProduct);

// Route to get a single product by ID
router.get("/product/:id", singleProduct);

// Admin--------------------------------------

// Route to update a product by ID, only authenticated users with admin role can access
router.put(
  "/admin/product/:id",
  isAuthenticateUser,
  authorizeRoles("admin"),
  upload.array('images'),
  updateProduct
);

// Route to delete a product by ID, only authenticated users with admin role can access
router.delete(
  "/product/:id",
  isAuthenticateUser,
  authorizeRoles("admin"),
  deleteProduct
);

// Route to create a new product, only authenticated users with admin role can access
router.post(
  "/admin/product/new",
  isAuthenticateUser,
  authorizeRoles("admin"),
  upload.array('images'),
  newProduct
);


router.get(
  "/admin/products",
  isAuthenticateUser,
  authorizeRoles("admin"),
  getAdminProducts
);


router.put('/review',isAuthenticateUser,createReview)

router.get('/admin/reviews',isAuthenticateUser,getReviews)
router.delete('/admin/review',isAuthenticateUser,deleteReview)

export default router;
