const router = require('express').Router();
// const productController = require('../controllers').product;
// const orderController = require('../controllers').order;
// const orderItemController = require('../controllers').orderItem;
// const cityController = require('../controllers').city;
// const stateController = require('../controllers').state;
// var crypto = require("crypto");
const dotenv = require('dotenv');
dotenv.config();

const {
    STRIPE_SECRET_KEY,
} = process.env;

const stripe = require("stripe")(STRIPE_SECRET_KEY);

router.get('/getAllCoupons', async (req, res) => {
    res.json({ data: [] });
});

module.exports = router;