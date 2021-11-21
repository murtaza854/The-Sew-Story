const router = require('express').Router();
const productController = require('../controllers').product;
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

const calculateOrderAmount = async items => {
    console.log('items', items);
    const slugs = items.map(product => product.slug);
    try {
        const products = await productController.getProductsCart(slugs);
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
        return amount * 100;
    } catch (error) {
        return error;
    }
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
};

router.post("/create-payment-intent", async (req, res) => {
    const { items } = req.body;
    // Create a PaymentIntent with the order amount and currency
    let errorMessage = '';
    try {
        const amount = await calculateOrderAmount(items);
        errorMessage = amount;
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "usd",
            payment_method_types: [
                "card",
            ],
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