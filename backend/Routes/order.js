import express from "express";
import { getSingleOrder, myOrder, newOrder, orderDelete, orders, updateOrder } from "../Controllers/orderController.js";
import { authorizeRoles, isAuthenticateUser } from "../middleware/authenticate.js";


const router=express.Router()



router.post('/order/new',isAuthenticateUser,newOrder)


router.get('/order/:id',isAuthenticateUser,getSingleOrder)


router.get('/myorders',isAuthenticateUser,myOrder)



// Admin routes  ==


router.get('/admin/orders',isAuthenticateUser,authorizeRoles('admin'),orders)

router.put('/admin/order/:id',isAuthenticateUser,authorizeRoles('admin'),updateOrder)
router.delete('/admin/order/:id',isAuthenticateUser,authorizeRoles('admin'),orderDelete)






export {router as OrderRouter}