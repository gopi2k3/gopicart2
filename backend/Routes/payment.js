import express from 'express'
import { isAuthenticateUser } from '../middleware/authenticate.js'
import { processPayment, sendStripeApi } from '../Controllers/PaymentController.js'


const router=express.Router()


router.post('/payment/process',isAuthenticateUser,processPayment)


router.get('/stripeapi',isAuthenticateUser,sendStripeApi)




export  {router as Paymentrouter}