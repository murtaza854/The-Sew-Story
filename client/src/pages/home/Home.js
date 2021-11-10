import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import api from '../../api';
import { Heading, ProductsRow } from '../../components';
import { Intro, SomeText, EmailForm } from './components';
import './Home.scss';

function Home(props) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
            setProducts([
                {
                    id: 1,
                    name: 'Product 1',
                    slug: 'product-1',
                    price: '100',
                    image: '/Products/Product 2.jpeg',
                    category: {
                        id: 1,
                        name: 'Kitchen Towels',
                        slug: 'category-1',
                    },
                },
                {
                    id: 2,
                    name: 'Product 2',
                    slug: 'product-2',
                    price: '200',
                    image: '/Products/Product 1.jpeg',
                    category: {
                        id: 1,
                        name: 'Kitchen Towels',
                        slug: 'category-1',
                    },
                },
                {
                    id: 3,
                    name: 'Product 3',
                    slug: 'product-3',
                    price: '300',
                    image: '/Products/Product 3.jpeg',
                    category: {
                        id: 1,
                        name: 'Kitchen Towels',
                        slug: 'category-1',
                    },
                },
            ]);
            // }
        };
        fetchProducts();
    }, [])

    return (
        <div className="home">
            <div className="intro-back">
                <Intro />
            </div>
            <Heading
                text="Our Products"
                className="text-center margin-global-top-3"
            />
            <div className="our-products-back">
                <ProductsRow
                    products={products}
                />
                <div className="center-relative-horizontal-fit-content">
                    <Link className="collection-link" to="/products">View Collection</Link>
                </div>
                <Container>
                    <div className="bottom-line center-relative-horizontal" />
                </Container>
            </div>
            <SomeText
                className="text-center"
                text1="Sewing today for a better tomorow"
                text2="join our mission"
            />
            <EmailForm />
        </div>
    );
}

export default Home;