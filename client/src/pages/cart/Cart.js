import React, { useContext, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { CheckoutForm } from '..';
import api from '../../api';
import { Heading } from '../../components';
import CartCountContext from '../../contexts/cartCountContext';
import { Delivery, ProductList } from './components';

function Cart(props) {
    const cartCountContext = useContext(CartCountContext);
    const [cartProducts, setCartProducts] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);

    const [disable, setDisable] = useState(true);

    const [firstName, setFirstName] = useState({ name: '', error: false, errorText: '' });
    const [lastName, setLastName] = useState({ name: '', error: false, errorText: '' });
    const [email, setEmail] = useState({ name: '', error: false, errorText: '' });
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
    }, []);

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
                const { data } = json;
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

    return (
        <div>
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
                <Heading
                    text="Total Amount"
                    className="text-center margin-global-top-1"
                />
                <div className="text-center cart-total">
                    <h3>$ {cartTotal.toFixed(2)}</h3>
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
                        {/* <Payment /> */}
                        <CheckoutForm disable={disable} />
                        <Form className="form-style ">
                            {/* <Row className="justify-content-center"> */}
                            {/* <Col>
                                <Button className="center-relative-horizontal-fit-content" disabled={disable} type="submit">
                                    Submit
                                </Button>
                            </Col> */}
                            {/* </Row> */}
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