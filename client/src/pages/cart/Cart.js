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

    const [couponButton, setCouponButton] = useState({ text: 'Apply Coupon', disabled: false });
    const [coupon, setCoupon] = useState({ value: '', error: false, errortext: '', readOnly: false });

    const [generalCoupon, setGeneralCoupon] = useState(null);

    const [billCoupon, setBillCoupon] = useState(null);
    const [productCoupon, setProductCoupon] = useState(null);

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
                // setGeneralCoupon(coupons.find(coupon => coupon.hasPromotionCodes));
                let billCoupon = null;
                let productCoupon = null;
                for (let i = 0; i < coupons.length; i++) {
                    const couponFromArray = coupons[i];
                    let flag = true;
                    if (!couponFromArray.appliedToProducts) {
                        if (couponFromArray.maxRedemptions && couponFromArray.maxRedemptions <= couponFromArray.timesRedeeemed) flag = false;
                        if (flag && couponFromArray.redeemBy && new Date(couponFromArray.redeemBy) >= new Date()) {
                            billCoupon = couponFromArray;
                        } else if (flag && !couponFromArray.redeemBy) {
                            billCoupon = couponFromArray;
                        }
                    } else {
                        if (couponFromArray.maxRedemptions && couponFromArray.maxRedemptions <= couponFromArray.timesRedeeemed) flag = false;
                        if (flag && couponFromArray.redeemBy && new Date(couponFromArray.redeemBy) >= new Date()) {
                            productCoupon = couponFromArray;
                        } else if (flag && !couponFromArray.redeemBy) {
                            productCoupon = couponFromArray;
                        }
                    }
                }
                // if (!coupon && coupons.length > 0 && !coupons[0].redeemBy) 
                let productCouponSlugs = [];
                if (productCoupon && productCoupon.productCoupons.length > 0) productCouponSlugs = productCoupon.productCoupons.map((productCoupon) => productCoupon.product.slug);
                let totalPrice = 0;
                setCartProducts([].map.call(data, (product) => {
                    const prodQuantity = (cartProducts.find(cartProduct => cartProduct.slug === product.slug)).quantity;
                    let discountedPrice = null;
                    let value = null;
                    if (productCoupon) {
                        console.log(productCoupon, productCouponSlugs);
                        let flag = true;
                        if (coupon.redeemBy && new Date(coupon.redeemBy) < new Date()) flag = false;
                        if (coupon.maxRedemptions && coupon.maxRedemptions <= coupon.timesRedeeemed) flag = false;
                        console.log(flag && !productCoupon.hasPromotionCodes);
                        if (flag && !productCoupon.hasPromotionCodes) {
                            if (productCoupon.appliedToProducts && productCouponSlugs.includes(product.slug)) {
                                if (productCoupon.type === 'Fixed Amount Discount') {
                                    discountedPrice = (product.prices[0].amount - productCoupon.amountOff);
                                    value = `$${productCoupon.amountOff}`;
                                } else {
                                    discountedPrice = (product.prices[0].amount - (product.prices[0].amount * (productCoupon.percentOff / 100)));
                                    value = `${productCoupon.percentOff}%`;
                                }
                            }
                        }
                    }
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
                        if (discountedPrice) totalPrice += discountedPrice * prodQuantity;
                        else totalPrice += product.prices[0].amount * prodQuantity;
                        // totalPrice += product.prices[0].amount * prodQuantity;
                        return {
                            product: {
                                name: product.name,
                                slug: product.slug,
                                price: product.prices[0].amount,
                                discountedPrice,
                                value,
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

                if (billCoupon) {
                    if (billCoupon.type === 'Fixed Amount Discount') {
                        setDiscountedPrice(totalPrice - billCoupon.amountOff);
                        setValue(`$${billCoupon.amountOff}`);
                    } else {
                        setDiscountedPrice(totalPrice - (totalPrice * (billCoupon.percentOff / 100)));
                        setValue(`${billCoupon.percentOff}%`);
                    }
                }
                setBillCoupon(billCoupon);
                setProductCoupon(productCoupon);
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
        if (billCoupon && cartTotal && cartProducts.length > 0) {
            // console.log(billCoupon, cartProducts);
            if (billCoupon.type === 'Fixed Amount Discount') {
                setDiscountedPrice(cartTotal - billCoupon.amountOff);
                setValue(`$${billCoupon.amountOff}`);
            } else {
                setDiscountedPrice(cartTotal - (cartTotal * (billCoupon.percentOff / 100)));
                setValue(`${billCoupon.percentOff}%`);
            }
            // setCartProducts([].map.call(cartProducts, (product) => {
            //     let discountedPrice = null;
            //     let value = null;
            //     let flag = true;
            //     if (billCoupon.redeemBy && new Date(billCoupon.redeemBy) < new Date()) flag = false;
            //     if (billCoupon.maxRedemptions && billCoupon.maxRedemptions <= billCoupon.timesRedeeemed) flag = false;
            //     if (flag && !billCoupon.hasPromotionCodes) {

            //         // if (billCoupon.appliedToProducts && billCoupon.productCoupons.find(productCoupon => productCoupon.product.slug === product.product.slug)) {
            //         //     if (billCoupon.type === 'Fixed Amount Discount') {
            //         //         discountedPrice = (product.product.price - billCoupon.amountOff);
            //         //         value = `$${billCoupon.amountOff}`;
            //         //     } else {
            //         //         discountedPrice = (product.product.price - (product.product.price * (billCoupon.percentOff / 100)));
            //         //         value = `${billCoupon.percentOff}%`;
            //         //     }
            //         // }
            //     }
            //     console.log(discountedPrice, value, flag);
            //     return {
            //         product: {
            //             name: product.product.name,
            //             slug: product.product.slug,
            //             price: product.product.price,
            //             discountedPrice: discountedPrice,
            //             value: value,
            //             quantity: product.product.quantity,
            //             image: product.product.image,
            //             details: product.product.details,
            //         },
            //         quantity: product.quantity,
            //     }
            //     // if (discountedPrice) {
            //     //     return {
            //     //         product: {
            //     //             name: product.name,
            //     //             slug: product.slug,
            //     //             price: discountedPrice,
            //     //             quantity: product.quantity,
            //     //             image: product.image,
            //     //             details: product.details,
            //     //         },
            //     //         quantity: product.quantity,
            //     //     };
            //     // } else {
            //     //     return {
            //     //         product: {
            //     //             name: product.name,
            //     //             slug: product.slug,
            //     //             price: product.price,
            //     //             quantity: product.product.quantity,
            //     //             image: product.product.image,
            //     //             details: product.product.details,
            //     //         },
            //     //         quantity: product.quantity,
            //     //     };
            //     // }
            // }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartTotal]);

    // useEffect(() => {
    //     if (cartTotal) {
    //         let discountedPrice = null;
    //         let value = null;
    //         // const totalPrice = parseFloat(cartTotal);
    //         if (generalCoupon) {
    //             let flag = true;
    //             if (generalCoupon.redeemBy && new Date(generalCoupon.redeemBy) < new Date()) flag = false;
    //             if (generalCoupon.maxRedemptions && generalCoupon.maxRedemptions <= generalCoupon.timesRedeeemed) flag = false;
    //             if (flag) {
    //                 if (generalCoupon.type === 'Fixed Amount Discount') {
    //                     discountedPrice = (cartTotal - generalCoupon.amountOff);
    //                     value = `$${generalCoupon.amountOff}`;
    //                 } else {
    //                     discountedPrice = (cartTotal - (cartTotal * (generalCoupon.percentOff / 100))).toFixed(2);
    //                     value = `${generalCoupon.percentOff}%`;
    //                 }
    //                 setDiscountedPrice(discountedPrice);
    //                 setValue(value);
    //                 // setCartTotal(totalPrice.toFixed(2));
    //             }
    //         }
    //         // const totalPrice = parseFloat(cartTotal);
    //         // if (value.includes('%')) {
    //         //     setDiscountedPrice((totalPrice - (totalPrice * (value.replace('%', '') / 100))).toFixed(2));
    //         // } else if (value.includes('$')) {
    //         //     setDiscountedPrice((totalPrice - value.replace('$', '')).toFixed(2));
    //         // }
    //     }
    // }, [cartTotal, value, generalCoupon]);

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

    const applyCoupon = async (e) => {
        e.preventDefault();
        setCouponButton({ text: 'Loading', disabled: true });
        try {
            const response = await fetch(`${api}/promotionCode/check`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    promotionCode: coupon.value
                })
            });
            const data = await response.json();
            if (data.data) {
                console.log(data.data);
                setCouponButton({ text: 'Coupon Applied', disabled: true });
                setTimeout(() => {
                    setCouponButton({ text: 'Apply Coupon', disabled: false });
                }, 3000);
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            setCouponButton({ text: 'Invalid', disabled: true });
            alert(error.message);
            setTimeout(() => {
                setCouponButton({ text: 'Apply Coupon', disabled: false });
            }, 3000);
        }
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
                <Form onSubmit={applyCoupon} className="form-style cart-form margin-global-top-1" style={{ overflowX: 'hidden' }}>
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
                                    value={coupon.value}
                                    onChange={(e) => setCoupon({ value: e.target.value, error: false })}
                                />
                            </Form.Group>
                        </Col>
                        <div className="fit-content">
                            <Form.Group className="form-group-rght">
                                <Form.Label></Form.Label>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    disabled={couponButton.disabled}
                                >
                                    {couponButton.text}
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