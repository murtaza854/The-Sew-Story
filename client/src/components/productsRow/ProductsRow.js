import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { ProductBox } from '..';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
import SwiperCore, {
    Navigation
  } from 'swiper';
import './ProductsRow.scss';

SwiperCore.use([Navigation]);

function ProductsRow(props) {
    return (
        <>
            <Container className={`products-row ${props.className}`} fluid>
                <Container>
                    <Row>
                        <Swiper
                            spaceBetween={30}
                            slidesPerView={1}
                            navigation={true}
                            breakpoints={{
                                768: {
                                    slidesPerView: 2,
                                    centeredSlides: true
                                },
                                992: {
                                    slidesPerView: 3,
                                    centeredSlides: false
                                }
                            }}
                        >
                        {
                            props.products ? (
                                <>
                                    {
                                        props.products.map((product, index) => {
                                            // let hideClass = '';
                                            // if (index === 2) hideClass = 'hide-992';
                                            // else if (index === 1) hideClass = 'hide-768';
                                            return (
                                                <SwiperSlide key={index}>
                                                    <ProductBox
                                                        className=""
                                                        product={product}
                                                        category={null}
                                                    />
                                                </SwiperSlide>
                                            );
                                        })
                                    }
                                </>
                            ) : (
                                <>
                                {
                                    props.categories.map((category, index) => {
                                        // let hideClass = '';
                                        // if (index === 2) hideClass = 'hide-992';
                                        // else if (index === 1) hideClass = 'hide-768';
                                        return (
                                            <SwiperSlide key={index}>
                                                <ProductBox
                                                    className=""
                                                    product={null}
                                                    category={category}
                                                />
                                            </SwiperSlide>
                                        );
                                    })
                                }
                                </>
                            )
                        }
                        </Swiper>
                    </Row>
                </Container>
            </Container>
        </>
    );
}

export default ProductsRow;