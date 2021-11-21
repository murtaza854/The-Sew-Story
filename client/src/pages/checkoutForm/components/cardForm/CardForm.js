import React, { useState } from 'react';
import { useElements, useStripe, PaymentElement } from '@stripe/react-stripe-js';
import { Col, Container, Form, Row, Button } from 'react-bootstrap';
import { Heading } from '../../../../components';
import url from '../../../../url';

function CardForm(props) {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // const [disable, setDisable] = useState(true);

    const handleSubmit = async e => {
        e.preventDefault();
        // if (!stripe || !elements) {
        //     // Stripe.js has not yet loaded.
        //     // Make sure to disable form submission until Stripe.js has loaded.
        //     return;
        // }
        // setIsLoading(true);
        // const { error } = await stripe.confirmPayment({
        //     elements,
        //     confirmParams: {
        //         // Make sure to change this to your payment completion page
        //         return_url: `${url}order/530/status`,
        //     },
        // });
        // // This point will only be reached if there is an immediate error when
        // // confirming the payment. Otherwise, your customer will be redirected to
        // // your `return_url`. For some payment methods like iDEAL, your customer will
        // // be redirected to an intermediate site first to authorize the payment, then
        // // redirected to the `return_url`.
        // if (error.type === "card_error" || error.type === "validation_error") {
        //     setMessage(error.message);
        // } else {
        //     setMessage("An unexpected error occured.");
        // }
        // setIsLoading(false);
    };

    return (
        <Container>
            <Row>
                <Col>
                    <Heading
                        text="Checkout"
                        className="text-center margin-global-top-3"
                    />
                </Col>
            </Row>
            <Row>
                <Form className="form-style margin-global-top-1" id="payment-form" onSubmit={handleSubmit}>
                    <PaymentElement id="payment-element" />
                    <div className="margin-global-top-2" />
                    <Row className="justify-content-center">
                        <Button disabled={props.disable} type="submit">
                            Pay Now
                        </Button>
                    </Row>
                    {/* <button disabled={isLoading || !stripe || !elements} id="submit">
                        <span id="button-text">
                            {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                        </span>
                    </button> */}
                    {/* Show any error or success messages */}
                    <div className="margin-global-top-2" />
                    {message && <div className="text-center" id="payment-message">{message}</div>}
                </Form>
            </Row>
        </Container>
    );
}

export default CardForm;