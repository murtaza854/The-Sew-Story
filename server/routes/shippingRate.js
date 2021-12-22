const router = require('express').Router();
const ShippingRate = require('../controllers').shippingRate;
const dotenv = require('dotenv');
dotenv.config();

const {
    STRIPE_SECRET_KEY,
    STRIPE_SECRET_KEY_LIVE
} = process.env;

const stripe = require("stripe")(STRIPE_SECRET_KEY);
// const stripe = require("stripe")(STRIPE_SECRET_KEY_LIVE);

router.get('/getAllShippingRates', async (req, res) => {
    try {
        const shippingRates = await ShippingRate.getAll();
        res.status(200).json({
            data: shippingRates,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
});

router.post('/add', async (req, res) => {
    const data = req.body;
    try {
        const shippingRate = await stripe.shippingRates.create({
            fixed_amount: {
                amount: parseInt(data.price) * 100,
                currency: 'usd'
            },
            display_name: data.name,
            type: "fixed_amount",
            tax_behavior: data.taxBehavior,
            delivery_estimate: {
                maximum: {
                    unit: data.deliveryEstimateMaxUnit,
                    value: data.deliveryEstimateMax
                },
                minimum: {
                    unit: data.deliveryEstimateMinUnit,
                    value: data.deliveryEstimateMin
                }
            }
        });
        const shippingRateDB = await ShippingRate.create({
            id: shippingRate.id,
            name: data.name,
            price: data.price,
            taxBehavior: data.taxBehavior,
            deliveryEstimateMaxUnit: data.deliveryEstimateMaxUnit,
            deliveryEstimateMax: data.deliveryEstimateMax,
            deliveryEstimateMinUnit: data.deliveryEstimateMinUnit,
            deliveryEstimateMin: data.deliveryEstimateMin,
            active: data.active
        });
        res.status(200).json({
            data: shippingRateDB,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
});

module.exports = router;