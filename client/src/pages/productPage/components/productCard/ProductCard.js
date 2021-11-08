import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Heading } from '../../../../components';
import { ImLocation } from 'react-icons/im';
import './ProductCard.scss';

function ProductCard(props) {
    const { product } = props;
    return (
        <>
            {
                product ? (
                    <Container className="product-card">
                        <Row>
                            <Col lg={4}>
                                <img src={product.image} alt={product.name} />
                            </Col>
                            <Col className="product-details margin-global-top-2" lg={7}>
                                <Heading
                                    text={product.name}
                                    className=""
                                />
                                {/* <h1>{product.name}</h1> */}
                                <h2 className="location"><ImLocation className="icon" /> {product.location}</h2>
                                <h2>Description:</h2>
                                <p className="product-description">{product.description}</p>
                                <p className="product-price">$ {product.price}</p>
                                <button className="btn product-button">Add to cart</button>
                            </Col>
                        </Row>
                        <Row className=" margin-global-top-3">
                            <Col lg={9}>
                                <Heading
                                    text="The Story"
                                    className=""
                                />
                                <p className="product-description">{product.story}</p>
                            </Col>
                        </Row>
                    </Container>
                ) : null
            }
        </>
    );
}

export default ProductCard;