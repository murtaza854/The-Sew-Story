import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Heading, ProductsRow } from '../../components';
import { ProductCard } from './components';
import './ProductPage.scss';

function ProductPage(props) {
    const [product, setProduct] = useState(null)
    const { slug } = useParams();
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
                    price: '$100',
                    image: 'https://picsum.photos/200/300',
                },
                {
                    id: 2,
                    name: 'Product 2',
                    slug: 'product-2',
                    price: '$200',
                    image: 'https://picsum.photos/200/300',
                },
                {
                    id: 3,
                    name: 'Product 3',
                    slug: 'product-3',
                    price: '$300',
                    image: 'https://picsum.photos/200/300',
                },
            ]);
            // }
        };
        fetchProducts();
    }, [])

    useEffect(() => {
        const fetchProduct = async () => {
            //     const response = await fetch(`${api}/products/get-product?slug=${slug}`, {
            //         method: 'GET',
            //         headers: {
            //             'Content-Type': 'application/json',
            //             // 'Authorization': `Bearer ${localStorage.getItem('token')}`
            //         }
            //     }
            //     );
            //     const json = await response.json();
            // setProduct(json.data);
            try {
                setProduct({
                    id: 1,
                    name: 'Product 1',
                    slug: 'product-1',
                    price: '$100',
                    image: 'https://picsum.photos/200/300',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                    location: 'New York',
                    story: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                });
            } catch (error) {
                console.log(error);
            }
        };
        fetchProduct();
    }, [slug])
    return (
        <div className="product-page">
            <div className="product-back margin-global-top-5">
                <ProductCard product={product} />
            </div>
            <Heading
                text="More Products"
                className="text-center margin-global-top-8"
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
        </div>
    );
}

export default ProductPage;