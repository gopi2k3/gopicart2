import { AsyncError } from "../middleware/catchAsyncError.js";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const processPayment = AsyncError(async (req, res, next) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount:req.body.amount,
        currency:'usd',
        description: 'TEST Payment',
        metadata: { integration_check: 'accept_payment' },
        shipping: req.body.shipping
    });

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    });
});

export const sendStripeApi = AsyncError(async (req, res, next) => {
    res.status(200).json({
        stripeApikey: process.env.STRIPE_API_KEY
    });
});
