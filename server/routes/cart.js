const router = require('express').Router();
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

const calculateOrderAmount = (items) => {
    console.log(items);
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1400;
};

router.post("/create-payment-intent", async (req, res) => {
    const { items } = req.body;
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: "usd",
        payment_method_types: [
            "card",
        ],
    });
    res.send({
        clientSecret: paymentIntent.client_secret,
    });
});

module.exports = router;