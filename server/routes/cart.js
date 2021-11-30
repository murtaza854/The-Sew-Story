const router = require('express').Router();
const productController = require('../controllers').product;
const orderController = require('../controllers').order;
const orderItemController = require('../controllers').orderItem;
const cityController = require('../controllers').city;
const stateController = require('../controllers').state;
const couponController = require('../controllers').coupon;
var crypto = require("crypto");
const dotenv = require('dotenv');
dotenv.config();

const {
    STRIPE_SECRET_KEY,
} = process.env;

const stripe = require("stripe")(STRIPE_SECRET_KEY);

router.post("/cartProducts", async (req, res) => {
    const { cartProducts } = req.body;
    // convert array of objects to array of slugs
    console.log(cartProducts);
    const slugs = cartProducts.map(product => product.slug);
    try {
        const products = await productController.getProducts(slugs);
        const coupons = await couponController.getAllClient();
        res.json({ data: products, coupons });
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
    const slugs = cartProducts.map(product => product.slug);
    const products = await productController.getProductsCartID(slugs);
    const cartTotal = await calculateOrderAmount(cartProducts, products);
    const city = await cityController.getIdbySlug(deliveryDetails.city);
    const state = await stateController.getStatebyId(city.state_id);
    const user_id = null;
    const order = await orderController.create({
        orderNumber,
        orderStatus: 'Payment Confirmed',
        orderDate: new Date(),
        orderTotal: cartTotal,
        user_id: user_id,
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
        if (!user_id) {
            // const newCustomer = await createNewStrpCustomer(deliveryDetails, city, state);
            // const invoice = await stripe.invoices.create({
            //     customer: newCustomer.id,
            //     auto_advance: true,
            //     collection_method: 'send_invoice',
            //     days_until_due: 0,
            //     statement_descriptor: 'The Sew Story',
            // });
            for (let index = 0; index < cartProducts.length; index++) {
                const element = cartProducts[index];
                const product = products.find(product => product.slug === element.slug);
                await productController.updateQuantity(product.id, product.quantity - element.quantity);
                await orderItemController.create({
                    order_id: orderNumber,
                    product_id: product.id,
                    quantity: element.quantity,
                    price_per_unit: product['prices.amount'],
                });
                // const stripeProduct = await stripe.products.retrieve(product.id);
                // console.log(stripeProduct);
                // const prices = await stripe.prices.list({
                //     product: product.id,
                //     active: true,
                // });
                // console.log(prices);
                // const price = prices.data[0];
                // await stripe.invoiceItems.create({
                //     customer: newCustomer.id,
                //     amount: price.unit_amount * element.quantity,
                //     currency: 'USD',
                //     description: product.name,
                //     quantity: element.quantity,
                //     unit_amount: price.unit_amount,
                //     invoice: invoice.id,
                // });
            }
            // await stripe.invoices.sendInvoice(invoice.id);
        }
        res.json({ data: order });
    } else {
        res.json({ data: null });
    }
});
    

const createNewStrpCustomer = async (deliveryDetails, city, state) => {
    const customer = await stripe.customers.create({
        email: deliveryDetails.email,
        name: deliveryDetails.firstName + ' ' + deliveryDetails.lastName,
        phone: deliveryDetails.contactNumber,
        address: {
            line1: deliveryDetails.addressLine1,
            line2: deliveryDetails.addressLine2,
            city: city.name,
            state: state.name,
            postal_code: deliveryDetails.zipCode,
            country: 'US',
        },
        shipping: {
            name: deliveryDetails.firstName + ' ' + deliveryDetails.lastName,
            phone: deliveryDetails.contactNumber,
            address: {
                line1: deliveryDetails.addressLine1,
                line2: deliveryDetails.addressLine2,
                city: city.name,
                state: state.name,
                postal_code: deliveryDetails.zipCode,
                country: 'US',
            },
        },
    });
    return customer;
}

const generateOrderNumber = () => {
    return crypto.randomBytes(8).toString('hex');
};

const calculateOrderAmount = async (items, products) => {
    try {
        let amount = 0;
        for (let index = 0; index < items.length; index++) {
            const item = items[index];
            const product = products.find(product => product.slug === item.slug);
            console.log(product);
            console.log(item);
            if (product.active === 0) {
                throw new Error('Product is not available. Please update your cart.');
            };
            if (product.quantity < item.quantity) {
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