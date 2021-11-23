const router = require('express').Router();
const productController = require('../controllers').product;
const orderController = require('../controllers').order;
const orderItemController = require('../controllers').orderItem;
const cityController = require('../controllers').city;
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
} = process.env;

const stripe = require("stripe")(STRIPE_SECRET_KEY);

router.post("/cartProducts", async (req, res) => {
    const { cartProducts } = req.body;
    // convert array of objects to array of slugs
    const slugs = cartProducts.map(product => product.slug);
    try {
        const products = await productController.getProducts(slugs);
        res.json({ data: products });
    } catch (error) {
        res.json({ data: [], error: error });
    }
});

router.post("/payment", async (req, res) => {
    const { product } = req.body;
    console.log(123);
    console.log(product);
    // const session = await stripe.checkout.sessions.create({
    //     payment_method_types: ["card"],
    //     line_items: [
    //         {
    //             price_data: {
    //                 currency: "inr",
    //                 product_data: {
    //                     name: product.name,
    //                     images: [product.image],
    //                 },
    //                 unit_amount: product.amount * 100,
    //             },
    //             quantity: product.quantity,
    //         },
    //     ],
    //     mode: "payment",
    //     success_url: `${API_URL1}/success.html`,
    //     cancel_url: `${API_URL1}/cancel.html`,
    // });
    res.json({ id: session.id });
});

router.post('/confirmOrder', async (req, res) => {
    const {
        cartProducts,
        deliveryDetails
    } = req.body;
    let orderNumber = 0;
    while (true) {
        orderNumber = generateOrderNumber();
        const existingOrder = await orderController.checkOrderNumber({
            orderNumber,
        });
        if (!existingOrder) {
            break;
        }
    }
    console.log(deliveryDetails);
    const slugs = cartProducts.map(product => product.slug);
    const products = await productController.getProductsCartID(slugs);
    const cartTotal = await calculateOrderAmount(cartProducts, products);
    const city = await cityController.getIdbySlug(deliveryDetails.city);
    const order = await orderController.create({
        orderNumber,
        orderStatus: 'Payment Confirmed',
        orderDate: new Date(),
        orderTotal: cartTotal,
        user_id: null,
        firstName: deliveryDetails.firstName,
        lastName: deliveryDetails.lastName,
        email: deliveryDetails.email,
        contactNumber: deliveryDetails.contactNumber,
        addressLine1: deliveryDetails.addressLine1,
        addressLine2: deliveryDetails.addressLine2,
        city_id: city.id,
        zipCode: deliveryDetails.zipCode,
    });
    if (order) {
        for (let index = 0; index < cartProducts.length; index++) {
            const element = cartProducts[index];
            const product = products.find(product => product.slug === element.slug);
            console.log(product);
            await productController.updateQuantity(product.id, product.quantity - element.quantity);
            await orderItemController.create({
                order_id: orderNumber,
                product_id: product.id,
                quantity: element.quantity,
                price_per_unit: product['prices.amount'],
            });
        }
        res.json({ data: order });
    } else {
        res.json({ data: null });
    }
});

const generateOrderNumber = () => {
    return crypto.randomBytes(8).toString('hex');
};

const calculateOrderAmount = async (items, products) => {
    try {
        let amount = 0;
        for (let index = 0; index < items.length; index++) {
            const item = items[index];
            const product = products.find(product => product.slug === item.slug);
            if (product.active === 0) {
                throw new Error('Product is not available. Please update your cart.');
            };
            if (product.quantity > item.quantity) {
                throw new Error('Product is out of stock. Please update your cart.');
            };
            amount = amount + product['prices.amount'] * item.quantity;
        }
        return amount;
    } catch (error) {
        return error;
    }
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
};

router.post("/create-payment-intent", async (req, res) => {
    const { items, email } = req.body;
    // Create a PaymentIntent with the order amount and currency
    let errorMessage = '';
    try {
        const slugs = items.map(product => product.slug);
        const products = await productController.getProductsCart(slugs);
        const amount = await calculateOrderAmount(items, products);
        errorMessage = amount;
        console.log(email);
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: "usd",
            payment_method_types: [
                "card",
            ],
            receipt_email: email,
        });
        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.log(errorMessage);
        res.json({ error: errorMessage.message });
    }
});

module.exports = router;