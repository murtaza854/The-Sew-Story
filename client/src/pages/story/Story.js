import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Heading, ProductsRow, StoryInfo } from '../../components';
import './Story.scss';

function Story(props) {
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
                    price: '$200',
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
                    price: '$300',
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
        <div className="story">
            <Heading
                text="Our Story"
                className="text-center margin-global-top-5"
            />
            <div className="story-content">
                <StoryInfo
                    image="/Story/Story 1.jpg"
                    title="Lorem ipsum dolor sit amet"
                    description="The Sew Story was founded in 2021 with a clear vision to empower, elevate and endow the underprivileged and underrepresented female artisans of rural Pakistan. Flaunting traditional Pakistani motifs and patterning, our collections feature a wide range of unique one-of-a-kind home textiles tediously sewn and embroidered by hand. Our wide variety of home textile goods are exquisitely handcrafted works of art personally produced by impoverished women from the most destitute regions of Pakistan. Each piece is unique and highlights the story of the artisan who created it."
                    order="imageFirst"
                />
            </div>
            <div className="story-content margin-global-top-3">
                <StoryInfo
                    image="/Story/Story 2.jpg"
                    title="Lorem ipsum dolor sit amet"
                    description="Women constitute 49% of Pakistan’s population, however, they constitute only 24% of the total labor force. Moreover, Pakistan has the lowest rate of female entrepreneurship in the world, with only 1% of female entrepreneurs compared to 21% of male entrepreneurs. There are several structural, institutional, and socio-cultural reasons behind these statistical differences. We aim to lessen this gap and help liberate and emancipate these skilled Pakistani seamstresses who have long suffered from lack of opportunity, a scarcity of technology and a slew of other burdens, barriers and impediments."
                    order="imageSecond"
                />
            </div>
            <div className="story-content">
                <StoryInfo
                    image="/Story/Story 3.jpg"
                    title="Lorem ipsum dolor sit amet"
                    description="Our collaborative co-op platform showcases the stunningly beautiful sewn artwork of women artists who deserve a chance to exhibit their fine-tuned set of embroidery skills. Get your shop on for a worthy cause! The proceeds from every sale will be directly allotted to the designer so that she can make a fair living wage to emerge with confidence from the strife of poverty. A collaboration between talented needlewomen and a supportive advocate committed to the cause, The Sew Story has become a passion project founded to promote empowerment, financial literacy and educational freedom among women who live in a society that has historically been predominantly patriarchal. 
                    "
                    order="imageFirst"
                />
            </div>
            <Heading
                text="Shop & Support"
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

export default Story;