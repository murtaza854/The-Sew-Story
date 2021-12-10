const router = require('express').Router();
const productController = require('../controllers').product;
const orderController = require('../controllers').order;
const orderItemController = require('../controllers').orderItem;
const cityController = require('../controllers').city;
const stateController = require('../controllers').state;
const userController = require('../controllers').user;
const couponController = require('../controllers').coupon;
const orderCouponController = require('../controllers').orderCoupon;
const firebaseFile = require('../firebase');
const shipstationAPI = require('node-shipstation');
const firebaseAdmin = firebaseFile.admin;
var crypto = require("crypto");
const dotenv = require('dotenv');
dotenv.config();

const {
    DATABASE_USERNAME,
    DATABASE_PASSWORD,
    DATABASE_NAME,
    DATABASE_HOST,
    COOKIE_SECRET,
    API_URL1,
    API_URL2,
    API_URL3,
    PORT,
    STRIPE_SECRET_KEY,
    SHIPSTATION_API_KEY,
    SHIPSTATION_API_KEY_SECRET,
    STRIPE_SECRET_KEY_LIVE
} = process.env;

const shipstation = new shipstationAPI(
    SHIPSTATION_API_KEY,
    SHIPSTATION_API_KEY_SECRET);

// const stripe = require("stripe")(STRIPE_SECRET_KEY);
const stripe = require("stripe")(STRIPE_SECRET_KEY_LIVE);

router.post('/create', async (req, res) => {
    const {
        deliveryDetails,
        items
    } = req.body;
    const {
        firstName,
        lastName,
        email,
        contactNumber,
        city,
        addressLine1,
        addressLine2,
        zipCode,
        cartTotal,
    } = deliveryDetails;
    // console.log(req.body);
    const sessionCookie = req.cookies.session || null;
    // console.log(sessionCookie);
    const slugs = items.map(product => product.slug);
    const products = await productController.getProductsCartID(slugs);
    // console.log(products);
    const line_items = [];
    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        // const stripe_product = await stripe.products.retrieve(
        //     product.id.toString()
        // );
        if (product.quantity - items.find(item => item.slug === product.slug).quantity > 0) {
            const prices = await stripe.prices.list({
                product: product.id.toString(),
                active: true,
            });
            const price = prices.data[0];
            if (price) {
                line_items.push({
                    price: price.id,
                    quantity: items.find(item => item.slug === product.slug).quantity,
                    description: product.name,
                    // unit_amount: price.unit_amount,
                });
            }
        }
    }
    // console.log(await stripe.products.list({
    //   }));
    const state = await stateController.getStatebyId(city[0].state_id);
    if (!sessionCookie) {
        const customer = await stripe.customers.create({
            name: `${firstName} ${lastName}`,
            email,
            phone: contactNumber,
            address: {
                line1: addressLine1,
                line2: addressLine2,
                postal_code: zipCode,
                country: 'US',
                city: city[0].name,
                state: state.name,
            },
            shipping: {
                name: `${firstName} ${lastName}`,
                address: {
                    line1: addressLine1,
                    line2: addressLine2,
                    postal_code: zipCode,
                    country: 'US',
                    city: city[0].name,
                    state: state.name,
                },
                phone: contactNumber,
            },
        });
        const coupons = await couponController.getAll();
        let coupon = null;
        for (let i = 0; i < coupons.length; i++) {
            const couponFromArray = coupons[i].dataValues;
            if (couponFromArray.redeemBy && new Date(couponFromArray.redeemBy) >= new Date()) {
                coupon = couponFromArray;
                break;
            }
        }
        if (!coupon && coupons.length > 0 && !coupons[0].dataValues.redeemBy) coupon = coupons[0].dataValues;
        const params = {
            // currency: 'usd',
            payment_method_types: ['card'],
            customer: customer.id,
            line_items: line_items,
            mode: 'payment',
            success_url: `${API_URL1}/order/status?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${API_URL1}/order/status`,
            // automatic_tax: { enabled: true },
        };
        if (coupon) {
            params.discounts = [];
            params.discounts.push({
                coupon: coupon.id,
            });
        }
        const session = await stripe.checkout.sessions.create(params);
        res.json({ session: session, coupons });
    } else {
        const user = await firebaseAdmin.auth().verifySessionCookie(sessionCookie, true);
        const userData = await userController.findByUid({
            uid: user.uid,
        });
        const stripe_customer_id = userData.dataValues.stripe_id;
        await stripe.customers.update(stripe_customer_id, {
            name: `${firstName} ${lastName}`,
            phone: contactNumber,
            address: {
                line1: addressLine1,
                line2: addressLine2,
                postal_code: zipCode,
                country: 'US',
                city: city[0].name,
                state: state.name,
            },
            shipping: {
                name: `${firstName} ${lastName}`,
                address: {
                    line1: addressLine1,
                    line2: addressLine2,
                    postal_code: zipCode,
                    country: 'US',
                    city: city[0].name,
                    state: state.name,
                },
                phone: contactNumber,
            },
        });
        const coupons = await couponController.getAll();
        let coupon = null;
        for (let i = 0; i < coupons.length; i++) {
            const couponFromArray = coupons[i].dataValues;
            if (couponFromArray.redeemBy && new Date(couponFromArray.redeemBy) >= new Date()) {
                coupon = couponFromArray;
                break;
            }
        }
        if (!coupon && coupons.length > 0 && !coupons[0].dataValues.redeemBy) coupon = coupons[0].dataValues;
        const params = {
            // currency: 'usd',
            payment_method_types: ['card'],
            customer: customer.id,
            line_items: line_items,
            mode: 'payment',
            success_url: `${API_URL1}/order/status?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${API_URL1}/order/status`,
            // automatic_tax: { enabled: true },
        };
        if (coupon) {
            params.discounts = [];
            params.discounts.push({
                coupon: coupon.id,
            });
        }
        const session = await stripe.checkout.sessions.create(params);
        res.json({ session: session, coupons });
    }
});

router.post('/create-order', async (req, res) => {
    const {
        sessionID,
        cartProducts,
        coupon
    } = req.body;
    if (cartProducts) {
        const session = await stripe.checkout.sessions.retrieve(sessionID);
        const {
            customer,
            amount_subtotal,
            amount_total
        } = session;
        const stripe_customer = await stripe.customers.retrieve(customer);
        const {
            name,
            email,
            phone,
            address
        } = stripe_customer;
        const states = await stateController.getAllStatesByName(address.state);
        const stateIDs = states.map(state => state.id);
        const city = await cityController.getCityByNameAndStateIds(address.city, stateIDs);
        const orderNumber = await generateOrderNumber();
        const userID = await userController.getUserIDByStripeID(stripe_customer.id);
        await orderController.create({
            orderNumber: orderNumber,
            orderStatus: 'Processing',
            orderDate: new Date(),
            firstName: name.split(' ')[0],
            lastName: name.split(' ')[1],
            email,
            contactNumber: phone,
            addressLine1: address.line1,
            addressLine2: address.line2,
            city_id: city.id,
            zipCode: address.postal_code,
            amountSubtotal: amount_subtotal,
            orderTotal: amount_total,
            user_id: userID ? userID.id : null,
            stripe_sessionID: sessionID,
            coupon_id: coupon ? coupon : null,
        });
        if (coupon) {
            await orderCouponController.create({
                order_id: orderNumber,
                coupon_id: coupon,
            });
        }
        const slugs = cartProducts.map(product => product.slug);
        const products = await productController.getProductsCartID(slugs);
        products.forEach(async product => {
            await orderItemController.create({
                order_id: orderNumber,
                product_id: product.id,
                price_per_unit: product['prices.amount'],
                quantity: cartProducts.find(cartProduct => cartProduct.slug === product.slug).quantity,
            });
            await productController.updateQuantity(product.id, product.quantity - cartProducts.find(cartProduct => cartProduct.slug === product.slug).quantity);
        });
        res.json({ success: true, orderNumber });
    } else {
        console.log('no products');
        res.json({ success: false });
    }
    // console.log(session);
    // console.log(cartProducts);
    // console.log(stripe_customer);
});


const generateOrderNumber = async () => {
    let orderNumber = '';
    while (true) {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();
        const milisecond = date.getMilliseconds();
        orderNumber = `${year}${month}${day}${hour}${minute}${second}${milisecond}`;
        console.log(orderNumber);
        const order = await orderController.checkOrderNumber({ orderNumber: orderNumber });
        if (!order) {
            break;
        }
    }
    return orderNumber;
};


module.exports = router;