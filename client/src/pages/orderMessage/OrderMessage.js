import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { Container } from 'react-bootstrap';
import { OrderStatus } from './components';
import './OrderMessage.scss';

const stripePromise = loadStripe("pk_test_51JPiNNLwoMdHyWvl7tJOrbTGR1JAvyVb12zAsQMmsKVCnMbl7wm33WMi08YCXKuR2OMluzVxks4zVk3wUlCWPPJn00nnGX8xe7");

function OrderMessage(props) {
    return (
        <Container className="order-message">
                <Elements stripe={stripePromise}>
                    <OrderStatus />
                </Elements>
            {/* )} */}
        </Container>
    );
}

export default OrderMessage;