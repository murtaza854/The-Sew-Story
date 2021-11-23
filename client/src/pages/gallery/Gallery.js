import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Heading } from '../../components';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import './Gallery.scss';

function Gallery(props) {
    const itemData = [
        {
            img: 'Products/Product 1.jpeg',
            title: 'Bed',
        },
        {
            img: 'Products/Product 2.jpeg',
            title: 'Chair',
        },
        {
            img: 'Products/Product 3.jpeg',
            title: 'Table',
        },
        {
            img: 'Products/Product 4.jpeg',
            title: 'Sofa',
        },
        {
            img: 'Products/Product 5.jpeg',
            title: 'Cupboard',
        },
        {
            img: 'Products/Product 6.jpeg',
            title: 'Wardrobe',
        },
        {
            img: 'Products/Product 7.jpeg',
            title: 'Bed',
        },
        {
            img: 'Products/1.jpg',
            title: 'Bed',
        },
        {
            img: 'Products/2.jpg',
            title: 'Bed',
        },
        {
            img: 'Products/3.jpg',
            title: 'Bed',
        },
        {
            img: 'Products/4.jpg',
            title: 'Bed',
        },
        {
            img: 'Products/5.jpg',
            title: 'Bed',
        },
        {
            img: 'Products/Others 1.jpg',
            title: 'Bed',
        },
        {
            img: 'Products/Others 2.jpg',
            title: 'Bed',
        },
        {
            img: 'Story/Story 1.jpg',
            title: 'Chair',
        },
        {
            img: 'Story/Story 2.jpg',
            title: 'Table',
        },
        {
            img: 'Story/Story 3.jpg',
            title: 'Sofa',
        },
    ];

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Gallery | The Sew Story';
    }, []);

    return (
        <Container className="gallery">
            <Row>
                <Col>
                    <Heading
                        text="Gallery"
                        className="text-center margin-global-top-3"
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Box>
                        <ImageList variant="masonry" cols={5} gap={8}>
                            {itemData.map((item) => (
                                <ImageListItem key={item.img}>
                                    <img
                                        src={`${item.img}?w=248&fit=crop&auto=format`}
                                        srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                        alt={item.title}
                                        loading="lazy"
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </Box>
                </Col>
            </Row>
            <div className="margin-global-top-2" />
        </Container>
    );
}

export default Gallery;