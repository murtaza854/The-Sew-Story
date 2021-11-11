import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { ProductBox } from '..';
import './ProductsRow.scss';

function ProductsRow(props) {
    return (
        <>
            <Container className={`products-row ${props.className}`} fluid>
                <Container>
                    <Row>
                        {
                            props.products ? (
                                <>
                                    {
                                        props.products.map((product, index) => {
                                            let hideClass = '';
                                            if (index === 2) hideClass = 'hide-992';
                                            else if (index === 1) hideClass = 'hide-768';
                                            return (
                                                <Col className={hideClass} key={index}>
                                                    <ProductBox
                                                        className=""
                                                        product={product}
                                                        category={null}
                                                    />
                                                </Col>
                                            );
                                        })
                                    }
                                </>
                            ) : (
                                <>
                                {
                                    props.categories.map((category, index) => {
                                        let hideClass = '';
                                        if (index === 2) hideClass = 'hide-992';
                                        else if (index === 1) hideClass = 'hide-768';
                                        return (
                                            <Col className={hideClass} key={index}>
                                                <ProductBox
                                                    className=""
                                                    product={null}
                                                    category={category}
                                                />
                                            </Col>
                                        );
                                    })
                                }
                                </>
                            )
                        }
                    </Row>
                </Container>
            </Container>
        </>
    );
}

export default ProductsRow;