import { Typography, Tooltip, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../../../../api';

function GalleryForm(props) {
    const [images, setImages] = useState([]);

    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        let flag = true;
        if (images.length === 0) flag = true;
        else flag = false;
        setDisabled(flag);
    }, [images]);

    const imagesChange = event => {
        const files = event.target.files;
        Array.prototype.forEach.call(files, (file, index) => {
            if (file.size / 1024 < 300) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                const objectUrl = URL.createObjectURL(file);
                setImages(prevState => [...prevState, { picturePreview: file, imgURl: objectUrl, error: false }]);
            } else {
                alert("Size too large. Must be below 300kb.");
            }
        });
    }

    const handleRemoveImage = async (imgURL, index) => {
        setImages(prevState => prevState.filter((image, i) => i !== index));
    }

    const handleSubmitAdd = async event => {
        event.preventDefault();
        const formData = new FormData();
        for (let index = 0; index < images.length; index++) {
            const element = images[index];
            formData.append('images', element.picturePreview);
        }
        const response = await fetch(`${api}/gallery/add`, {
            method: 'POST',
            headers: {
                'Accept': 'multipart/form-data',
                'Cache-Control': 'no-store'
            },
            body: formData,
        });
        const content = await response.json();
        if (content.data) {
            window.location.href = window.location.href.split('/admin')[0] + '/admin/gallery';
        } else {
            alert("Something went wrong.");
        }
    }

    let onSubmit = handleSubmitAdd;

    return (
        <Container fluid>
            <Row>
                <Col>
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        Gallery
                    </Typography>
                </Col>
            </Row>
            <Form onSubmit={onSubmit}>
                <input
                    type="password"
                    autoComplete="on"
                    value=""
                    style={{ display: 'none' }}
                    readOnly={true}
                />
                <div className="margin-global-top-1" />
                <Row>
                    <Col md={6}>
                        <Row>
                            <label htmlFor="images">
                                <input name="images" onChange={imagesChange} hidden accept="image/*" id="images" multiple type="file" />
                                <Button type="button" variant="contained" component="span">
                                    Upload Images
                                </Button>
                            </label>
                        </Row>
                    </Col>
                </Row>
                {
                    images.length > 0 ? (
                        <>
                            <div className="margin-global-top-1" />
                            <Row>
                                <ImageList sx={{ height: 450 }} cols={6}>
                                    {images.map((item, index) => (
                                        <ImageListItem key={item.imgURl}>
                                            <img
                                                src={item.imgURl}
                                                srcSet={item.imgURl}
                                                alt="Preview"
                                                loading="lazy"
                                            />
                                            <Tooltip className="admin-delete-image" title="Remove Image">
                                                <Button style={{ borderRadius: '100px', padding: '10px', minWidth: '0' }} variant="contained" onClick={() => handleRemoveImage(item.imgURl, index)}>
                                                    <DeleteIcon />
                                                </Button>
                                            </Tooltip>
                                        </ImageListItem>
                                    ))}
                                </ImageList>
                            </Row>
                        </>
                    ) : null
                }
                <div className="margin-global-top-1" />
                <Row>
                    <Col className="flex-display">
                        <Button disabled={disabled} type="submit" variant="contained" color="secondary">
                            Save
                        </Button>
                        <div className="margin-global-05" />
                        <Button disabled={disabled} type="button" variant="contained" color="secondary">
                            Save and Add Another
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}

export default GalleryForm;