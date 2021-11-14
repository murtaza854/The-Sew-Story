import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import api from "../../api";
import { CardForm } from "./components";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with a fake API key.
const stripePromise = loadStripe("pk_test_51JPiNNLwoMdHyWvl7tJOrbTGR1JAvyVb12zAsQMmsKVCnMbl7wm33WMi08YCXKuR2OMluzVxks4zVk3wUlCWPPJn00nnGX8xe7");

function CheckoutForm(props) {

    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        const cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
        fetch(`${api}/cart/create-payment-intent`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: cartProducts }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, []);

    // const appearance = {
    //     theme: 'stripe',
    // };

    const options = {
        clientSecret,
        // appearance,
    };

    return (
        <div className="checkout-form">
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CardForm />
                </Elements>
            )}
        </div>
    );
}

export default CheckoutForm;