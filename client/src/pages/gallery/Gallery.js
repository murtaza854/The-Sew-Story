import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Heading } from '../../components';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import api from '../../api'
import './Gallery.scss';

function Gallery(props) {
    const [itemData, setItemData] = React.useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Gallery | The Sew Story';
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${api}/gallery/getAll-client`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const body = await response.json();
            const data = body.data;
            const images = [];
            data.forEach(item => {
                const obj = 
                {
                    img: item.path,
                    title: item.fileName,
                }
                images.push(obj);
            });
            setItemData(images);
        };
        fetchData();
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