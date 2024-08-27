import express from "express";
import multer from 'multer'

import path from 'path'

import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const upload=multer({storage:multer.diskStorage({
    destination :function (req,file,cb){
        cb(null,path.join(__dirname,'..','Uploads/User'))

    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})})


import { changePassword, deleteUser, forgotPassword, getAllUser, getUser, getUserProfile, loginUser, logoutUser, registerUser, resetPassword, updateProfile, updateUser } from "../Controllers/authController.js";
import { authorizeRoles, isAuthenticateUser } from "../middleware/authenticate.js";

const router = express.Router();

router.post("/register",upload.single('avatar'), registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);


router.post('/password/forgot',forgotPassword)


router.post('/password/reset/:token',resetPassword)



router.get('/myprofile',isAuthenticateUser,getUserProfile)

router.put('/password/change',isAuthenticateUser,changePassword)

router.put('/update',isAuthenticateUser,upload.single('avatar'),updateProfile)


// Admin Router


router.get('/admin/users',isAuthenticateUser,authorizeRoles('admin'),getAllUser)
router.get('/admin/user/:id',isAuthenticateUser,authorizeRoles('admin'),getUser)
router.put('/admin/user/:id',isAuthenticateUser,authorizeRoles('admin'),updateUser)
router.delete('/admin/user/:id',isAuthenticateUser,authorizeRoles('admin'),deleteUser)



export { router as Auth };
