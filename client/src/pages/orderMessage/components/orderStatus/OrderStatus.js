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
        const confirmOrder = async () => {
            const cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
            const params = new URLSearchParams(window.location.search);
            const deliveryDetails = JSON.parse(params.get('array'));
            await fetch(`${api}/cart/confirmOrder`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cartProducts, deliveryDetails }),
            });
            localStorage.removeItem('cartProducts');
        };
        const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");
        if (!clientSecret) {
            return;
        }
        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    confirmOrder();
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

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Payment | The Sew Story';
    }, []);

    return (
        <Row className="margin-global-top-2">
            <Heading
                text="Order Status"
                className="text-center margin-global-top-3"
            />
            <div className="text-center">
                {message && <p>{message}</p>}
                {message && <p>Your invoice has been emailed to you!</p>}
            </div>
            <p className="text-uppercase text-center">Please click <Link to="/">here</Link> to go back to Home page.</p>
        </Row>
    );
}

export default OrderStatus;