import React, { useEffect, useState } from 'react';
import { Heading } from '../../components';
import { Delivery, ProductList } from './components';

function Cart(props) {
    const [cartProducts, setCartProducts] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
        setCartProducts(cartProducts);
    }, []);

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
                />
            </div>
            <div className="margin-global-top-3" />
            <Delivery />
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
        </div>
    );
}

export default Cart;