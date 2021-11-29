const router = require('express').Router();
const promotionCodeController = require('../controllers').promotionCode;
const dotenv = require('dotenv');
dotenv.config();

const {
    STRIPE_SECRET_KEY,
} = process.env;

const stripe = require("stripe")(STRIPE_SECRET_KEY);

router.get('/getAllPromotionCodes', async (req, res) => {
    try {
        const promotionCodes = await promotionCodeController.getAllInclude();
        res.status(200).json({
            data: promotionCodes,
        });
    } catch (error) {
        res.status(500).json({
            error
        });
    }
});

router.post('/check', async (req, res) => {
    const {
        promotionCode
    } = req.body;
    const promotionCodeDb = await promotionCodeController.getByPromotionCode(promotionCode);
    if (promotionCodeDb) {
        res.status(200).json({
            data: promotionCodeDb,
        });
    } else {
        res.status(404).json({
            message: 'Promotion code not found'
        });
    }
});

router.post('/add', async (req, res) => {
    const {
        code,
        coupon,
        minValue,
        user,
        expiresAt,
        usageLimit,
        firstTime
    } = req.body;
    const params = {
        coupon: coupon.value,
    };
    if (code) {
        params.code = code;
    }
    if (minValue) {
        params.restrictions = {};
        params.restrictions.minimum_amount = parseInt(minValue) * 100;
        params.restrictions.minimum_amount_currency = 'usd';
    }
    if (user) {
        console.log(user);
    }
    if (expiresAt) {
        params.expires_at = new Date(expiresAt);
    }
    if (usageLimit) {
        params.max_redemptions = parseInt(usageLimit);
    }
    if (firstTime) {
        if (params.restrictions) {
            params.restrictions.first_time_transaction = firstTime;
        } else {
            params.restrictions = {
                first_time_transaction: firstTime
            };
        }
    }
    const promotionCode = await stripe.promotionCodes.create(params);
    const promotionCodeDb = await promotionCodeController.create({
        id: promotionCode.id,
        code: promotionCode.code,
        coupon_id: coupon.value,
        user_id: null,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        maxRedemptions: usageLimit ? parseInt(usageLimit) : null,
        firstTimeTransaction: firstTime,
        minAmount: minValue ? parseInt(minValue) : null
    });
    res.status(200).json({
        data: promotionCodeDb
    });
});

module.exports = router;