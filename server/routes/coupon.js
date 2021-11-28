const router = require('express').Router();
const couponController = require('../controllers').coupon;
const dotenv = require('dotenv');
dotenv.config();

const {
    STRIPE_SECRET_KEY,
} = process.env;

const stripe = require("stripe")(STRIPE_SECRET_KEY);

router.get('/getAllCoupons', async (req, res) => {
    try {
        const coupons = await couponController.getAll();
        res.status(200).json({
            data: coupons,
        });
    } catch (error) {
        res.status(500).json({
            error
        });
    }
});

router.post('/add', async (req, res) => {
    const {
        name,
        type,
        value,
        usageLimit,
        redeemBy,
        appliedToProducts,
        products,
        promotionCodes
    } = req.body;
    const params = {
        name,
        currency: 'usd',
    };
    if (type === 'Percentage Discount') {
        params.percent_off = parseFloat(value);
    } else if (type === 'Fixed Amount Discount') {
        params.amount_off = parseInt(value) * 100;
    }
    if (redeemBy) {
        params.redeem_by = new Date(redeemBy);
    }
    if (usageLimit) {
        params.max_redemptions = parseInt(usageLimit);
    }
    if (appliedToProducts) {
        params.applies_to = {};
        params.applies_to.products = products.map(product => product.id);
    }
    const coupon = await stripe.coupons.create(params);
    const couponDb = await couponController.create({
        id: coupon.id,
        name: coupon.name,
        type: type,
        amountOff: type === 'Fixed Amount Discount' ? parseInt(value) : null,
        percentOff: type === 'Percentage Discount' ? parseFloat(value) : null,
        redeemBy: redeemBy ? new Date(redeemBy) : null,
        maxRedemptions: usageLimit ? parseInt(usageLimit) : null,
        appliedToProducts: appliedToProducts,
        hasPromotionCodes: promotionCodes,
    });
    res.json({ data: couponDb });
});

router.post('/getById', async (req, res) => {
    const { id } = req.body;
    const coupon = await couponController.getById(id);
    res.json({ data: coupon });
});

router.post('/update', async (req, res) => {
    const {
        name,
        usageLimit,
        redeemBy,
        appliedToProducts,
        products,
        promotionCodes
    } = req.body;
    const params = {
        name,
    };
    if (redeemBy) {
        params.redeem_by = new Date(redeemBy);
    }
    if (usageLimit) {
        params.max_redemptions = parseInt(usageLimit);
    }
    if (appliedToProducts) {
        params.applies_to = {};
        params.applies_to.products = products.map(product => product.id);
    }
    const coupon = await stripe.coupons.update(req.body.id, params);
    const couponDb = await couponController.update({
        id: coupon.id,
        name: coupon.name,
        redeemBy: redeemBy ? new Date(redeemBy) : null,
        maxRedemptions: usageLimit ? parseInt(usageLimit) : null,
        appliedToProducts: appliedToProducts,
        hasPromotionCodes: promotionCodes,
    });
    res.json({ data: couponDb });
});


module.exports = router;