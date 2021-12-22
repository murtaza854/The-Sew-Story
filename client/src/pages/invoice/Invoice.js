import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
// import { Col, Container, Form, Row, Button } from 'react-bootstrap';
import api from '../../api';
import { FormText, Heading } from '../../components';

function Invoice(props) {
    const params = new URLSearchParams(window.location.search);
    const deliveryDetails = JSON.parse(params.get('array'));
    // const {
    //     firstName,
    //     lastName,
        // email,
    //     contactNumber,
    //     city,
    //     addressLine1,
    //     addressLine2,
    //     zipCode,
    //     cartTotal
    // } = deliveryDetails;

    // const [amount_subtotal, setAmount_subtotal] = useState(0);
    // const [value, setValue] = useState(null);
    // const [amount_total, setAmount_total] = useState(0);
    // const [payment_url, setPayment_url] = useState('');
    // const [disable, setDisable] = useState(false);
    const [message, setMessage] = useState('You will be redirected to the payment page in a few seconds.');

    useEffect(() => {
        const generateInvoice = async () => {
            // setDisable(true);
            const cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
            const coupons = JSON.parse(localStorage.getItem('coupons'));
            const response = await fetch(`${api}/payment/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                withCredentials: true,
                body: JSON.stringify({ items: cartProducts, deliveryDetails, coupons })
                // body: JSON.stringify({ items: cartProducts })
            });
            const data = await response.json();
            // const coupons = data.coupons;
            // let coupon = null;
            // for (let i = 0; i < coupons.length; i++) {
            //     const couponFromArray = coupons[i];
            //     if (couponFromArray.redeemBy && new Date(couponFromArray.redeemBy) >= new Date()) {
            //         coupon = couponFromArray;
            //         break;
            //     }
            // }
            // if (!coupon && coupons.length > 0 && !coupons[0].redeemBy) coupon = coupons[0];
            // let value = null;
            // if (coupon) {
            //     let flag = true;
            //     localStorage.setItem('coupon', JSON.stringify(coupon.id));
            //     if (coupon.redeemBy && new Date(coupon.redeemBy) < new Date()) flag = false;
            //     if (flag) {
            //         if (coupon.type === 'Fixed Amount Discount') {
            //             value = `$${coupon.amountOff}`;
            //         } else {
            //             value = `${coupon.percentOff}%`;
            //         }
            //     }
            // }
            // setValue(value);
            // setAmount_total(data.session.amount_total / 100);
            // setAmount_subtotal(data.session.amount_subtotal / 100);
            // setPayment_url(data.session.url);
            if (data.session) {
                setTimeout(() => {
                    window.location.href = data.session.url;
                }, 2000);
            } else {
                setMessage("Something went wrong. Please contact support.");
            }
            // setDisable(false);
        }
        generateInvoice();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container>
            <Row>
                <Col>
                    <Heading
                        text="Redirecting to checkout..."
                        className="text-center margin-global-top-3"
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormText
                        text={message}
                        link=""
                        to="/"
                        classes="text-center"
                    />
                </Col>
            </Row>
            {/* <Row>
                <Col>
                    <div className="text-center cart-total">
                        <b className="bold-500">Sub Total:</b> <b className="bold-300">$ {amount_subtotal.toFixed(2)}</b>
                    </div>
                    {
                        value && (
                            <div className="text-center cart-total">
                                <b className="bold-500">Discount:</b> <b className="bold-300">{value} off</b>
                            </div>
                        )
                    }
                    <div className="text-center cart-total">
                        <b className="bold-500">Total:</b> <b className="bold-300">$ {amount_total.toFixed(2)}</b>
                    </div>
                </Col>
            </Row> */}
            {/* <Row style={{ display: 'none' }}>
                <Form action={payment_url} className="form-style margin-global-top-2">
                    <Row className="justify-content-center">
                        <Button type="submit">
                            Checkout
                        </Button>
                    </Row>
                </Form>
            </Row> */}
        </Container>
    );
}

export default Invoice;