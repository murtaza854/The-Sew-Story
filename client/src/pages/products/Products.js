import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import api from '../../api';
import { Heading, ProductBox } from '../../components';
import { Pagination } from './components';
import './Products.scss';

function Products(props) {
    const [products, setProducts] = useState([]);
    const { productSlug } = useParams();
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [headingProd, setHeadingProd] = useState('');

    useEffect(() => {
        const fetchCategoyName = async () => {
            const response = await fetch(`${api}/category/getBySlug-client?slug=${productSlug}`, {
                method: 'GET',
            });
            const json = await response.json();
            const { name } = json.data;
            document.title = `${name} | The Sew Story`;
            setHeadingProd(name);
        };
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${api}/category/getAll-client`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const json = await response.json();
                const data = json.data;
                data.sort(function (a, b) { return a.comingSoon - b.comingSoon });
                setProducts([].map.call(data, (category) => {
                    return {
                        name: category.name,
                        slug: category.slug,
                        comingSoon: category.comingSoon,
                        image: category.imagePath,
                    };
                }));
            } catch (error) {
            }
        };
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${api}/product/getAll-client?categorySlug=${productSlug}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const json = await response.json();
                const coupons = json.coupons;
                let coupon = null;
                for (let i = 0; i < coupons.length; i++) {
                    const couponFromArray = coupons[i];
                    if (couponFromArray.redeemBy && new Date(couponFromArray.redeemBy) >= new Date()) {
                        coupon = couponFromArray;
                        break;
                    }
                }
                if (!coupon && coupons.length > 0) coupon = coupons[0];
                let productCouponSlugs = [];
                if (coupon && coupon.productCoupons.length > 0) productCouponSlugs = coupon.productCoupons.map((productCoupon) => productCoupon.product.slug);
                const data = [].map.call(json.data, (product) => {
                    let discountedPrice = null;
                    let value = null;
                    if (coupon) {
                        let flag = true;
                        if (coupon.redeemBy && new Date(coupon.redeemBy) < new Date()) flag = false;
                        if (coupon.maxRedemptions <= coupon.timesRedeeemed) flag = false;
                        if (flag && !coupon.hasPromotionCodes) {
                            if (coupon.appliedToProducts && productCouponSlugs.includes(product.slug)) {
                                if (coupon.type === 'Fixed Amount Discount') {
                                    discountedPrice = (product.prices[0].amount - coupon.amountOff);
                                    value = `$${coupon.amountOff}`;
                                } else {
                                    discountedPrice = (product.prices[0].amount - (product.prices[0].amount * (coupon.percentOff / 100))).toFixed(2);
                                    value = `${coupon.percentOff}%`;
                                }
                            }
                        }
                    }
                    console.log(product);
                    return {
                        name: product.name,
                        slug: product.slug,
                        shortDescription: product.shortDescription,
                        price: `$ ${product.prices[0].amount}`,
                        discountedPrice: discountedPrice ? `$ ${discountedPrice}` : null,
                        value: value,
                        quantity: product.quantity,
                        image: product.image,
                        category: {
                            slug: productSlug,
                        },
                    };
                })
                // const json = [
                //     {
                //         id: 1,
                //         name: 'Product 1',
                //         slug: 'product-1',
                //         price: '$100',
                //         image: '/Products/Product 1.jpeg',
                //         category: {
                //             id: 1,
                //             name: 'Kitchen Towels',
                //             slug: 'category-1',
                //         },
                //     },
                //     {
                //         id: 2,
                //         name: 'Product 2',
                //         slug: 'product-2',
                //         price: '$200',
                //         image: '/Products/Product 2.jpeg',
                //         category: {
                //             id: 1,
                //             name: 'Kitchen Towels',
                //             slug: 'category-1',
                //         },
                //     },
                //     {
                //         id: 3,
                //         name: 'Product 3',
                //         slug: 'product-3',
                //         price: '$300',
                //         image: '/Products/Product 3.jpeg',
                //         category: {
                //             id: 1,
                //             name: 'Kitchen Towels',
                //             slug: 'category-1',
                //         },
                //     },
                // ];
                var i, j, temporary, chunk = 9;
                const chunks = [];
                for (i = 0, j = data.length; i < j; i += chunk) {
                    temporary = data.slice(i, i + chunk);
                    chunks.push(temporary);
                }
                setProducts(chunks);
                setTotalPages(chunks.length);
            } catch (error) {
                console.log(error);
            }
            // }
        };
        if (productSlug === 'shop') {
            document.title = `Shop | The Sew Story`;
            fetchCategories();
        } else {
            fetchCategoyName();
            fetchProducts();
        }
    }, [productSlug]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page]);

    return (
        <div className="products">
            {
                productSlug === 'shop' ?
                    <Heading
                        text="View our Hand-Embroidered Collection"
                        className="text-center margin-global-top-3"
                    /> :
                    <Heading
                        text={headingProd}
                        className="text-center margin-global-top-3"
                    />
            }
            <Container className="margin-global-top-3">
                {
                    productSlug === 'shop' ?
                        <Row>
                            {
                                products?.map((product, index) => {
                                    return (
                                        <Col md={4} key={index}>
                                            <ProductBox
                                                className="margin-global-bottom-4"
                                                product={null}
                                                category={product}
                                            />
                                        </Col>
                                    );
                                })
                            }
                        </Row>
                        :
                        <>
                            <Row>
                                {
                                    products[page]?.map((product, index) => {
                                        return (
                                            <Col md={4} key={index}>
                                                <ProductBox
                                                    className="margin-global-bottom-4"
                                                    product={product}
                                                    category={null}
                                                />
                                            </Col>
                                        );
                                    })
                                }
                            </Row>
                            <Row>
                                <Pagination
                                    page={page}
                                    setPage={setPage}
                                    totalPages={totalPages}
                                />
                            </Row>
                        </>
                }
            </Container>
            <div className="margin-global-top-5" />
        </div>
    );
}

export default Products;