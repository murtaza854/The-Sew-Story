import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Heading, ProductBox } from '../../components';
import { Pagination } from './components';
import './Products.scss';

function Products(props) {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            // try {
            //     console.log('fetching products');
            //     const response = await fetch(`${api}/products/get-three`, {
            //         method: 'GET',
            //         headers: {
            //             'Content-Type': 'application/json',
            //         },
            //     });
            //     const json = await response.json();
            //     setProducts(json.data);
            // } catch (error) {
            //     console.log(error);
            const json = [
                {
                    id: 1,
                    name: 'Product 1',
                    slug: 'product-1',
                    price: '$100',
                    image: '/Products/Product 1.jpeg',
                },
                {
                    id: 2,
                    name: 'Product 2',
                    slug: 'product-2',
                    price: '$200',
                    image: '/Products/Product 2.jpeg',
                },
                {
                    id: 3,
                    name: 'Product 3',
                    slug: 'product-3',
                    price: '$300',
                    image: '/Products/Product 3.jpeg',
                },
                {
                    id: 4,
                    name: 'Product 4',
                    slug: 'product-4',
                    price: '$400',
                    image: '/Products/Product 4.jpeg',
                },
                {
                    id: 5,
                    name: 'Product 5',
                    slug: 'product-5',
                    price: '$500',
                    image: '/Products/Product 5.jpeg',
                },
                {
                    id: 6,
                    name: 'Product 6',
                    slug: 'product-6',
                    price: '$600',
                    image: '/Products/Product 6.jpeg',
                },
                {
                    id: 7,
                    name: 'Product 7',
                    slug: 'product-7',
                    price: '$700',
                    image: '/Products/Product 7.jpeg',
                },
                {
                    id: 8,
                    name: 'Product 8',
                    slug: 'product-8',
                    price: '$800',
                    image: '/Products/Product 1.jpeg',
                },
                {
                    id: 9,
                    name: 'Product 9',
                    slug: 'product-9',
                    price: '$900',
                    image: '/Products/Product 2.jpeg',
                },
                {
                    id: 10,
                    name: 'Product 10',
                    slug: 'product-10',
                    price: '$1000',
                    image: '/Products/Product 3.jpeg',
                },
                {
                    id: 11,
                    name: 'Product 11',
                    slug: 'product-11',
                    price: '$1100',
                    image: '/Products/Product 4.jpeg',
                },
                {
                    id: 12,
                    name: 'Product 12',
                    slug: 'product-12',
                    price: '$1200',
                    image: '/Products/Product 5.jpeg',
                },
                {
                    id: 13,
                    name: 'Product 13',
                    slug: 'product-13',
                    price: '$1300',
                    image: '/Products/Product 6.jpeg',
                },
                {
                    id: 14,
                    name: 'Product 14',
                    slug: 'product-14',
                    price: '$1400',
                    image: '/Products/Product 7.jpeg',
                },
            ];
            var i, j, temporary, chunk = 9;
            const chunks = [];
            for (i = 0, j = json.length; i < j; i += chunk) {
                temporary = json.slice(i, i + chunk);
                chunks.push(temporary);
            }
            setProducts(chunks);
            setTotalPages(chunks.length);
            // }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page]);

    return (
        <div className="products">
            <Heading
                text="Our Collection"
                className="text-center margin-global-top-3"
            />
            <Container className="margin-global-top-3">
                <Row>
                    {
                        products[page]?.map((product, index) => {
                            return (
                                <Col md={4} key={index}>
                                    <ProductBox
                                        className="margin-global-bottom-4"
                                        product={product}
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
            </Container>
            <div className="margin-global-top-5" />
        </div>
    );
}

export default Products;