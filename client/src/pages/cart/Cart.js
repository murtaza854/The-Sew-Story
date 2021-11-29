import React, { useContext, useEffect, useState } from 'react';
import { Col, Form, Button, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';
// import { CheckoutForm } from '..';
import api from '../../api';
import { Heading } from '../../components';
import CartCountContext from '../../contexts/cartCountContext';
import UserContext from '../../contexts/userContext';
import { Delivery, ProductList } from './components';
import './Cart.scss';

function Cart(props) {
    let history = useHistory();
    const cartCountContext = useContext(CartCountContext);
    const userContext = useContext(UserContext);
    const [cartProducts, setCartProducts] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [discountedPrice, setDiscountedPrice] = useState(null);
    const [value, setValue] = useState(null);

    const [disable, setDisable] = useState(true);

    const [firstName, setFirstName] = useState({ name: '', error: false, errorText: '', readOnly: false });
    const [lastName, setLastName] = useState({ name: '', error: false, errorText: '', readOnly: false });
    const [email, setEmail] = useState({ name: '', error: false, errorText: '', readOnly: false });
    const [contactNumber, setContactNumber] = useState({ name: '', error: false, errorText: '' });

    const [state, setState] = useState({ value: [], error: false, errortext: '', readOnly: false });
    const [stateList, setStateList] = useState([]);
    const [stateLoading, setStateLoading] = useState(false);

    const [city, setCity] = useState({ value: [], error: false, errortext: '', readOnly: true });
    const [cityList, setCityList] = useState([]);
    const [cityLoading, setCityLoading] = useState(false);

    const [addressLine1, setAddressLine1] = useState({ text: '', error: false, errorText: '' });
    const [addressLine2, setAddressLine2] = useState({ text: '' });
    const [landmark, setLandmark] = useState({ text: '' });
    const [zipCode, setZipCode] = useState({ text: '', error: false, errorText: '' });

    // const [radios, setRadios] = useState({ debitCreditCard: true });

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Cart | The Sew Story';
        if (userContext.userState) {
            const getUserInfo = async () => {
                const response = await fetch(`${api}/user/get-logged-in?email=${userContext.userState.email}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const content = await response.json();
                const {
                    firstName,
                    lastName,
                    email,
                } = content.data;
                setFirstName({ name: firstName, error: false, errorText: '', readOnly: true });
                setLastName({ name: lastName, error: false, errorText: '', readOnly: true });
                setEmail({ name: email, error: false, errorText: '', readOnly: true });
            }
            getUserInfo();
        }
    }, [userContext.userState]);

    useEffect(() => {
        const cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
        if (cartProducts) {
            const fetchedCartProducts = async _ => {
                const response = await fetch(`${api}/cart/cartProducts`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ cartProducts }),
                });
                const json = await response.json();
                const { data, coupons } = json;
                let coupon = null;
                for (let i = 0; i < coupons.length; i++) {
                    const couponFromArray = coupons[i];
                    if (couponFromArray.redeemBy && new Date(couponFromArray.redeemBy) >= new Date()) {
                        coupon = couponFromArray;
                        break;
                    }
                }
                if (!coupon && coupons.length > 0 && !coupons[0].redeemBy) coupon = coupons[0];
                // console.log('cartProducts', [].map.call(data, (product) => {
                //     const prodQuantity = (cartProducts.find(cartProduct => cartProduct.slug === product.slug)).quantity;
                //     return {
                //         product: {
                //             name: product.name,
                //             slug: product.slug,
                //             price: product.prices[0].amount,
                //             quantity: product.quantity,
                //             image: product.images[0].path,
                //             details: product.details,
                //         },
                //         quantity: prodQuantity,
                //     };
                // }));
                let totalPrice = 0;
                setCartProducts([].map.call(data, (product) => {
                    const prodQuantity = (cartProducts.find(cartProduct => cartProduct.slug === product.slug)).quantity;
                    if (!product.active) {
                        localStorage.setItem('cartProducts', JSON.stringify(cartProducts.filter(cartProduct => cartProduct.slug !== product.slug)));
                        return {
                            product: {
                                name: product.name,
                                slug: product.slug,
                                price: 0,
                                quantity: product.quantity,
                                image: product.images[0].path,
                                details: [{
                                    label: 'Unavailable',
                                    text: 'Will be removed from cart automatically'
                                }],
                            },
                            quantity: product.quantity,
                        };
                    }
                    else if (prodQuantity <= product.quantity) {
                        totalPrice += product.prices[0].amount * prodQuantity;
                        return {
                            product: {
                                name: product.name,
                                slug: product.slug,
                                price: product.prices[0].amount,
                                quantity: product.quantity,
                                image: product.images[0].path,
                                details: product.details,
                            },
                            quantity: prodQuantity,
                        };
                    } else {
                        localStorage.setItem('cartProducts', JSON.stringify(cartProducts.filter(cartProduct => cartProduct.slug !== product.slug)));
                        return {
                            product: {
                                name: product.name,
                                slug: product.slug,
                                price: 0,
                                quantity: product.quantity,
                                image: product.images[0].path,
                                details: [{
                                    label: 'Out of Stock',
                                    text: 'Will be removed from cart automatically'
                                }],
                            },
                            quantity: product.quantity,
                        };
                    }
                }));
                let discountedPrice = null;
                let value = null;
                if (coupon) {
                    let flag = true;
                    if (coupon.redeemBy && new Date(coupon.redeemBy) < new Date()) flag = false;
                    if (flag) {
                        if (coupon.type === 'Fixed Amount Discount') {
                            discountedPrice = (totalPrice - coupon.amountOff);
                            value = `$${coupon.amountOff}`;
                        } else {
                            discountedPrice = (totalPrice - (totalPrice * (coupon.percentOff / 100))).toFixed(2);
                            value = `${coupon.percentOff}%`;
                        }
                    }
                }
                setDiscountedPrice(discountedPrice);
                setValue(value);
                setCartTotal(totalPrice);
                // setCartProducts(data);
            }
            fetchedCartProducts();
        } else {
            setCartProducts([]);
        }
        // setCartProducts(cartProducts);
    }, []);

    useEffect(() => {
        if (value) {
            if (value.includes('%')) {
                setDiscountedPrice(cartTotal - (cartTotal * (value.replace('%', '') / 100)));
            } else if (value.includes('$')) {
                setDiscountedPrice(cartTotal - value.replace('$', ''));
            }
        }
    }, [cartTotal, value]);

    useEffect(() => {
        let flag = true;
        if (firstName.name.length === 0) flag = true;
        else if (firstName.error === true) flag = true;
        else if (lastName.name.length === 0) flag = true;
        else if (lastName.error === true) flag = true;
        else if (contactNumber.name.length === 0) flag = true;
        else if (contactNumber.error === true) flag = true;
        else if (email.name.length === 0) flag = true;
        else if (email.error === true) flag = true;
        else if (state.error === true) flag = true;
        else if (state.value.length === 0) flag = true;
        else if (city.error === true) flag = true;
        else if (city.value.length === 0) flag = true;
        else if (addressLine1.error === true) flag = true;
        else if (addressLine1.text.length === 0) flag = true;
        else if (zipCode.error === true) flag = true;
        else if (zipCode.text.length === 0) flag = true;
        else flag = false;
        setDisable(flag);
    }, [state, city, addressLine1, zipCode, firstName, lastName, contactNumber, email]);

    const onSubmit = async (e) => {
        e.preventDefault();
        history.push(`/payment?array=${JSON.stringify({
            firstName: firstName.name,
            lastName: lastName.name,
            email: email.name,
            contactNumber: contactNumber.name,
            city: city.value,
            addressLine1: addressLine1.text,
            addressLine2: addressLine2.text,
            zipCode: zipCode.text,
            cartTotal
        })}`);
    }

    return (
        <div className="shopping-cart">
            <Heading
                text="Shopping Cart"
                className="text-center margin-global-top-3"
            />
            <div>
                <ProductList
                    products={cartProducts}
                    setCartProducts={setCartProducts}
                    cartTotal={cartTotal}
                    setCartTotal={setCartTotal}
                />
                <Form className="form-style cart-form margin-global-top-1" style={{ overflowX: 'hidden' }}>
                    <input
                        type="password"
                        autoComplete="on"
                        value=""
                        style={{ display: 'none' }}
                        readOnly={true}
                    />
                    <Row className="justify-content-center">
                        <Col md={3}>
                            <Form.Group className="form-group-rght" controlId="promotionCode">
                                <Form.Label>Promotion Code</Form.Label>
                                <Form.Control
                                    type="text"
                                // readOnly={firstName.readOnly}
                                // onChange={changeFirstName}
                                // onBlur={changeFirstName}
                                // value={firstName.name}
                                />
                            </Form.Group>
                        </Col>
                        <div className="fit-content">
                            <Form.Group className="form-group-rght">
                                <Form.Label></Form.Label>
                                <Button
                                    variant="primary"
                                    type="submit"
                                // className="btn-block"
                                // disabled={disable}
                                // onClick={onSubmit}
                                >
                                    Apply
                                </Button>
                            </Form.Group>
                        </div>
                    </Row>
                </Form>
                <Heading
                    text="Total Amount"
                    className="text-center margin-global-top-1"
                />
                <div className="text-center cart-total">
                    <h3>
                        {
                            discountedPrice ? (
                                <>
                                    <span className="text-cut">$ {cartTotal.toFixed(2)}</span>
                                    <br />
                                    <span className="text-red">{value} off - $ {discountedPrice.toFixed(2)}</span>
                                </>
                            ) : (
                                <>$ {cartTotal.toFixed(2)}</>
                            )
                        }
                    </h3>
                </div>
            </div>
            {
                cartCountContext.cartCount > 0 ? (
                    <>
                        <div className="margin-global-top-3" />
                        <Delivery
                            firstName={firstName}
                            setFirstName={setFirstName}
                            lastName={lastName}
                            setLastName={setLastName}
                            email={email}
                            setEmail={setEmail}
                            contactNumber={contactNumber}
                            setContactNumber={setContactNumber}
                            state={state}
                            setState={setState}
                            stateList={stateList}
                            setStateList={setStateList}
                            stateLoading={stateLoading}
                            setStateLoading={setStateLoading}
                            city={city}
                            setCity={setCity}
                            cityList={cityList}
                            setCityList={setCityList}
                            cityLoading={cityLoading}
                            setCityLoading={setCityLoading}
                            addressLine1={addressLine1}
                            setAddressLine1={setAddressLine1}
                            addressLine2={addressLine2}
                            setAddressLine2={setAddressLine2}
                            landmark={landmark}
                            setLandmark={setLandmark}
                            zipCode={zipCode}
                            setZipCode={setZipCode}
                        />
                        <Form onSubmit={onSubmit} className="form-style ">
                            <div className="justify-content-center">
                                <Col>
                                    <Button className="center-relative-horizontal-fit-content" disabled={disable} type="submit">
                                        Submit
                                    </Button>
                                </Col>
                            </div>
                        </Form>
                        {/* {
                cartProducts?.length > 0 ? (
                    <>
                        <LinkButton
                            text="Proceed"
                            to="/delivery"
                            className="btn center-relative-horizontal"
                        />
                        <div className="margin-global-top-3" />
                    </>
                ) : (
                    null
                )
            } */}
                    </>
                ) : (
                    <>
                        <div className="margin-global-top-3" />
                    </>
                )
            }
        </div>
    );
}

export default Cart;