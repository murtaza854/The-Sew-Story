const router = require('express').Router();
const couponController = require('../controllers').coupon;
const productCouponController = require('../controllers').productCoupon;
const dotenv = require('dotenv');
dotenv.config();

const {
    STRIPE_SECRET_KEY,
    STRIPE_SECRET_KEY_LIVE
} = process.env;

const stripe = require("stripe")(STRIPE_SECRET_KEY);
// const stripe = require("stripe")(STRIPE_SECRET_KEY_LIVE);


router.get('/getAllOrders', async (req, res) => {
    try {
        const sessions = await stripe.checkout.sessions.list();
        const orders = [];
        for (let i = 0; i < sessions.data.length; i++) {
            const session = sessions.data[i];
            const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
            const order = {
                session: session,
                lineItems: lineItems.data
            };
            orders.push(order);
        }
        res.status(200).json({
            data: orders
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;