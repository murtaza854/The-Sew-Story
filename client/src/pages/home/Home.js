import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../../api';
import { Heading, ProductsRow } from '../../components';
import { Intro, SomeText, EmailForm } from './components';
import './Home.scss';

function Home(props) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = `The Sew Story`; 
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${api}/category/getAll-client?page=homePage`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const json = await response.json();
                const data = json.data;
                data.sort(function (a, b) { return a.comingSoon - b.comingSoon });
                setCategories([].map.call(data, (category) => {
                    return {
                        name: category.name,
                        slug: category.slug,
                        comingSoon: category.comingSoon,
                        image: category.imagePath,
                    };
                }));
                // setCategories(json.data);
            } catch (error) {
            }
            // setCategories([
            //     {
            //         id: 1,
            //         name: 'Kitchen Towels',
            //         slug: 'category-1',
            //         image: '/Products/Product 2.jpeg',
            //         comingSoon: false,
            //     },
            //     {
            //         id: 2,
            //         name: 'Cushions',
            //         slug: 'category-2',
            //         image: '/Products/Product 1.jpeg',
            //         comingSoon: true,
            //     },
            //     {
            //         id: 3,
            //         name: 'Aprons',
            //         slug: 'category-3',
            //         image: '/Products/Product 3.jpeg',
            //         comingSoon: true,
            //     },
            // ]);
            // }
        };
        fetchCategories();
    }, [])

    return (
        <div className="home">
            <div className="intro-back">
                <Intro />
            </div>
            <Heading
                text="View our Hand-Embroidered Collections"
                className="text-center margin-global-top-3"
            />
            <div className="our-products-back">
                <ProductsRow
                    products={null}
                    categories={categories}
                />
                <div className="center-relative-horizontal-fit-content">
                    <Link className="collection-link" to="/shop">View Collection</Link>
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