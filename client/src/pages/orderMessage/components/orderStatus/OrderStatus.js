import { useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Heading } from '../../../../components';
import api from '../../../../api';

function OrderStatus(props) {
    const stripe = useStripe();

    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (!stripe) {
            return;
        }
        const cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
        console.log(cartProducts);
        const confirmOrder = async () => {
            const response = await fetch(`${api}/cart/confirmOrder`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cartProducts }),
            });
            const data = await response.json();
            console.log(data);
        };
        confirmOrder();
        console.log(123);
        const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");
        if (!clientSecret) {
            return;
        }
        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            console.log(paymentIntent);
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe]);

    return (
        <Row className="margin-global-top-2">
            <Heading
                text="Order Status"
                className="text-center margin-global-top-3"
            />
            <p className="text-center">{message}</p>
            <p className="text-uppercase text-center">Please click <Link to="/">here</Link> to go back to Home page.</p>
        </Row>
    );
}

export default OrderStatus;