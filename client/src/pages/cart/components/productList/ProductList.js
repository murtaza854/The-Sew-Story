import React, { useContext } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { Heading } from '../../../../components';
import CartCountContext from '../../../../contexts/cartCountContext';
import './ProductList.scss';

function ProductList(props) {
    const { products, setCartProducts, cartTotal, setCartTotal } = props;

    // const [cartProductList, setCartProductList] = useState([]);
    const cartCountFromContext = useContext(CartCountContext);

    // useEffect(() => {
    //     // setCartProductList(products);
    // }, [products]);

    const handleAddToCart = slug => {
        const cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
        const prods = [...products];
        const index = cartProducts.findIndex(prod => prod.slug === slug);
        const indexProducts = prods.findIndex(prod => prod.product.slug === slug);
        if (index !== -1) {
            if (cartProducts[index].quantity + 1 <= prods[indexProducts].product.quantity) {
                cartProducts[index].quantity += 1;
                prods[indexProducts].quantity += 1;
                setCartTotal(cartTotal + prods[indexProducts].product.price);
            }
        }
        localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
        setCartProducts(prods);
    };

    const handleRemoveFromCart = slug => {
        const cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
        const prods = [...products];
        const index = cartProducts.findIndex(prod => prod.slug === slug);
        const indexProducts = prods.findIndex(prod => prod.product.slug === slug);
        if (index !== -1) {
            cartProducts[index].quantity -= 1;
            prods[indexProducts].quantity -= 1;
            setCartTotal(cartTotal - prods[indexProducts].product.price);
            if (prods[index].quantity === 0) {
                prods.splice(index, 1);
                cartProducts.splice(index, 1);
                cartCountFromContext.setCartCount(cartCountFromContext.cartCount - 1);
            }
        }
        localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
        setCartProducts(prods);
    };

    return (
        <Container className="product-list">
            {
                products?.length > 0 ? (
                    <>
                        {
                            products.map((value, index) => {
                                return (
                                    <Row className="justify-content-center margin-global-bottom-2" key={index}>
                                        <Col md={3}>
                                            <img src={value.product.image} alt={value.product.name} />
                                        </Col>
                                        <Col className="product-details" md={4}>
                                            <Heading
                                                text={value.product.name}
                                                className=""
                                            />
                                            {/* <h1>{product.name}</h1> */}
                                            <h2>Description:</h2>
                                            {
                                                value.product.details.map((detail, index) => {
                                                    let classes = 'product-description margin-bottom-0';
                                                    if (index === value.product.details.length - 1) classes = 'product-description';
                                                    return (
                                                        <p className={classes} key={index}>
                                                            {
                                                                detail.label !== '' ? (
                                                                    <b className="bold-500">{detail.label}: </b>
                                                                ) : null
                                                            }
                                                            <b className="bold-300">{detail.text}</b>
                                                        </p>
                                                    );
                                                })
                                            }
                                            {/* <p className="product-description margin-bottom-0">{value.product.description1}</p>
                                            <p className="product-description margin-bottom-0">{value.product.description2}</p>
                                            <p className="product-description margin-bottom-0">{value.product.description3}</p>
                                            <p className="product-description margin-bottom-0">{value.product.description4}</p>
                                            <p className="product-description margin-bottom-0">{value.product.description5}</p>
                                            <p className="product-description">{value.product.description6}</p> */}
                                        </Col>
                                        <Col md={1}>
                                            <Form className="form-style center-relative-fit-content">
                                                <Form.Group className="quantity-input">
                                                    <Form.Control readOnly value={value.quantity} type="text" />
                                                </Form.Group>
                                                <Row className="arrow-row">
                                                    <Col xs={6}>
                                                        <div onClick={_ => handleRemoveFromCart(value.product.slug)} className="decrease-button">
                                                            <i className="fa fa-angle-left"></i>
                                                        </div>
                                                    </Col>
                                                    <Col xs={6}>
                                                        <div onClick={_ => handleAddToCart(value.product.slug)} className="increase-button">
                                                            <i className="fa fa-angle-right"></i>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Form>
                                        </Col>
                                        <Col md={2}>
                                            <p className="product-price center-relative-fit-content">
                                                {
                                                    value.product.discountedPrice ? (
                                                        <>
                                                            <span className="strike-through">${(value.product.price * value.quantity).toFixed(2)}</span>
                                                            <span> - </span>
                                                            <span className="red">${(value.product.discountedPrice * value.quantity).toFixed(2)}
                                                            </span>
                                                        </>
                                                    ) : <>${(value.product.price * value.quantity).toFixed(2)}</>
                                                }
                                            </p>
                                        </Col>
                                    </Row>
                                )
                            })
                        }
                    </>
                ) : (
                    <div className="empty-cart">
                        <h1>Your cart is empty</h1>
                    </div>
                )
            }
        </Container>
    );
}

export default ProductList;