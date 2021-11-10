import React from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { Heading } from '../../../../components';
import './ProductCard.scss';

function ProductCard(props) {
    const { product } = props;

    const addToCart = () => {
        props.addToCart(product);
    };

    const updateQuantity = num => {
        if (num <= 0) {
            return;
        }
        props.setQuantity(num);
    };

    return (
        <>
            {
                product ? (
                    <Container className="product-card">
                        <Row className="justify-content-center">
                            <Col lg={4}>
                                {/* <img src={product.image} alt={product.name} /> */}
                                <div className="slider1">
                                    <img className="sliding-img" src={product.image} alt="Test" />
                                    <img className="sliding-img" src="/Products/Product 1.jpeg" alt="Test" />
                                    <img className="sliding-img" src="/Products/Product 2.jpeg" alt="Test" />
                                </div>
                            </Col>
                            <Col className="product-details margin-global-top-2" lg={5}>
                                <Heading
                                    text={product.name}
                                    className=""
                                />
                                {/* <h1>{product.name}</h1> */}
                                <p className="product-description"><b className="bold-500">Product Code:</b> <b className="bold-300">{product.productCode}</b></p>
                                <p className="product-price">$ {product.price}</p>
                                <Row className="justify-content-center-992">
                                    <Col xs={6}>
                                        <button disabled={props.disable} onClick={addToCart} type="button" className="btn product-button">{props.buttonText}</button>
                                    </Col>
                                    <Col xs={3}>
                                        <Form className="form-style">
                                            <Form.Group className="quantity-input">
                                                <Form.Control readOnly value={props.quantity} type="text" />
                                            </Form.Group>
                                            <Row className="arrow-row">
                                                <Col xs={6}>
                                                    <div onClick={_ => updateQuantity(props.quantity - 1)} className="decrease-button">
                                                        <i className="fa fa-angle-left"></i>
                                                    </div>
                                                </Col>
                                                <Col xs={6}>
                                                    <div onClick={_ => updateQuantity(props.quantity + 1)} className="increase-button">
                                                        <i className="fa fa-angle-right"></i>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Col>
                                </Row>
                                {/* <div className="margin-global-bottom-1" /> */}
                                <h2>Description:</h2>
                                <p className="product-description margin-bottom-0"><b className="bold-300">{product.description1}</b></p>
                                <p className="product-description margin-bottom-0"><b className="bold-500">Colors:</b> <b className="bold-300">{product.description2}</b></p>
                                <p className="product-description margin-bottom-0"><b className="bold-500">Weight:</b> <b className="bold-300">{product.description4}</b></p>
                                <p className="product-description margin-bottom-0"><b className="bold-500">Size:</b> <b className="bold-300">{product.description5}</b></p>
                                <p className="product-description margin-bottom-0"><b className="bold-500"></b> <b className="bold-300">{product.description3}</b></p>
                                <p className="product-description"><b className="bold-300">{product.description6}</b></p>
                                <h2>Care Instructions:</h2>
                                <p className="product-description margin-bottom-0"><b className="bold-300">Machine wash cold with like colors</b></p>
                                <p className="product-description"><b className="bold-300">Non-­chlorine bleach if needed</b></p>
                            </Col>
                            <Col lg={2} className="product-details-2 margin-global-top-2">
                                {/* <Row className="justify-content-end">
                                    <p className="product-price">$ {product.price}</p>
                                </Row>
                                <Row className="justify-content-end">
                                    <Col>
                                            {
                                                props.message.display ? (
                                                    // <Row className="margin-global-top-1">
                                                    //     <Col>
                                                            <DescriptionText
                                                                text={props.message.text}
                                                                link=""
                                                                to="/"
                                                                classes="text-center bold-300"
                                                            />
                                                    //     </Col>
                                                    // </Row>
                                                ) : null
                                            }
                                        <div className="padding-inherit">
                                            <button disabled={props.disable} onClick={addToCart} type="button" className="btn product-button">Add to cart</button>
                                        </div>
                                    </Col>
                                </Row> */}
                            </Col>
                        </Row>
                        <Row className="justify-content-center margin-global-top-3">
                            <Col lg={9}>
                                <Heading
                                    text="Hand Embroidered by Kaneez Mai"
                                    className="padding-right"
                                />
                            </Col>
                            <Col lg={2}>
                            </Col>
                        </Row>
                        <Row className="justify-content-center">
                            <Col lg={9}>
                                <p className="product-description padding-right">{product.story}</p>
                            </Col>
                            <Col lg={2}>
                                <img className="story-image" src="/Products/Kaneez.png" alt="Test" />
                            </Col>
                        </Row>
                    </Container>
                ) : null
            }
        </>
    );
}

export default ProductCard;