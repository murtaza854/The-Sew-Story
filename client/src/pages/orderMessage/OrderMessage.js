// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
import React, { useContext, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import api from '../../api';
import { Heading } from '../../components';
import CartCountContext from '../../contexts/cartCountContext';
// import { OrderStatus } from './components';
import './OrderMessage.scss';

// const stripePromise = loadStripe("pk_test_51JPiNNLwoMdHyWvl7tJOrbTGR1JAvyVb12zAsQMmsKVCnMbl7wm33WMi08YCXKuR2OMluzVxks4zVk3wUlCWPPJn00nnGX8xe7");

function OrderMessage(props) {
    const location = useLocation();
    const [orderNumber, setOrderNumber] = React.useState('');
    const cartCountFromContext = useContext(CartCountContext);

    const [OrderSuccess, setOrderSuccess] = React.useState(null);

    useEffect(() => {
        const confirmOrder = async () => {
            const params = new URLSearchParams(location.search);
            const sessionID = params.get('session_id');
            const cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
            const coupon = JSON.parse(localStorage.getItem('coupon'));
            const order = {
                sessionID: sessionID,
                cartProducts: cartProducts,
                coupon
            };
            const response = await fetch(`${api}/payment/create-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                withCreditentials: true,
                body: JSON.stringify(order)
            });
            const data = await response.json();
            if (data.success) {
                setOrderNumber(data.orderNumber);
                localStorage.removeItem('cartProducts');
                cartCountFromContext.setCartCount(0);
                setOrderSuccess(true);
            } else {
                setOrderNumber(data.orderNumber);
                localStorage.removeItem('cartProducts');
                cartCountFromContext.setCartCount(0);
                setOrderSuccess(false);
            }
        }
        confirmOrder();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container className="order-message">
            {
                OrderSuccess ? (
                    <>
                        <Row>
                            <Col>
                                <Heading
                                    text="Thank you!"
                                    className="text-center margin-global-top-5"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p className="text-center margin-bottom-0">
                                    Your order has been placed successfully.
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p className="text-center">
                                    Your order number is: <span className="order-number bold-500">{orderNumber}</span>
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p className="text-center margin-bottom-0">
                                    You will receive an email confirmation shortly.
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p className="text-center">
                                    Thank you for shopping with us.
                                </p>
                            </Col>
                        </Row>
                    </>
                ) : null
            }
            {
                OrderSuccess === false ? (
                    <>
                        <Row>
                            <Col>
                                <Heading
                                    text="Sorry!"
                                    className="text-center margin-global-top-5"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p className="text-center margin-bottom-0">
                                    Your order has been cancelled.
                                </p>
                            </Col>
                        </Row>
                    </>
                ) : null
            }
            <Row>
                <Col>
                    <p className="text-center margin-bottom-0">
                        Please click <Link className="bold-500" style={{ textDecoration: 'none', color: 'black' }} to="/">here</Link> to return to the home page.
                    </p>
                </Col>
            </Row>
            <div className="margin-global-top-5" />
            {/* <Elements stripe={stripePromise}>
                    <OrderStatus />
                </Elements> */}
            {/* )} */}
        </Container>
    );
}

export default OrderMessage;