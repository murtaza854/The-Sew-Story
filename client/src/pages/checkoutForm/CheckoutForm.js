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
    const params = new URLSearchParams(window.location.search);
    const deliveryDetails = JSON.parse(params.get('array'));
    const {
        firstName,
        lastName,
        email,
        contactNumber,
        city,
        addressLine1,
        addressLine2,
        zipCode,
        cartTotal
    } = deliveryDetails;

    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        const cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
        fetch(`${api}/cart/create-payment-intent`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: cartProducts, email }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.error) {
                    alert(data.error);
                    return;
                }
                setClientSecret(data.clientSecret)
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const appearance = {
        theme: 'flat',
    };

    const options = {
        clientSecret,
        appearance
    };

    return (
        <div className="checkout-form">
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CardForm
                        firstName={firstName}
                        lastName={lastName}
                        email={email}
                        contactNumber={contactNumber}
                        city={city}
                        addressLine1={addressLine1}
                        addressLine2={addressLine2}
                        zipCode={zipCode}
                        cartTotal={cartTotal}
                    />
                </Elements>
            )}
        </div>
    );
}

export default CheckoutForm;