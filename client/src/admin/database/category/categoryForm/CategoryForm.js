import { FormControl, InputLabel, Typography, Input, FormControlLabel, Checkbox, FormHelperText, Button } from '@mui/material';
import React, { useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';

function gcd(a, b) {
    return (b === 0) ? a : gcd(b, a % b);
}

function CategoryForm(props) {

    const [name, setName] = useState({ value: '', error: false, helperText: '' });
    const [image, setImage] = useState({ picturePreview: '', imgURl: '', error: false });
    const [checkBoxes, setCheckBoxes] = useState({ active: false, comingSoon: false });
    
    const handleNameChange = (event) => {
        if (event.target.value.length > 0) {
            setName({ value: event.target.value, error: false, helperText: '' });
        } else {
            setName({ value: event.target.value, error: true, helperText: 'Name is required!' });
        }
    }

    const imageChange = event => {
        let reader = new FileReader();
        if (event.target.files && event.target.files[0]) {
            if (event.target.files[0].size / 1024 < 300) {
                reader.readAsDataURL(event.target.files[0]);
                const objectUrl = URL.createObjectURL(event.target.files[0]);
                reader.onload = ((theFile) => {
                    var image = new Image();
                    image.src = theFile.target.result;
                    image.onload = function () {
                        // access image size here 
                        // console.log(this.width, this.height);
                        // console.log(gcd(this.width, this.height));
                        const w = this.width;
                        const h = this.height;
                        const r = gcd(w, h);
                        if (w / r < h / r) {
                            setImage(prevState => ({ ...prevState, picturePreview: event.target.files[0], imgURl: objectUrl, error: false }));
                        }
                        else {
                            alert("Please upload a portrait image.");
                        }
                    };
                });
            } else {
                alert("Size too large. Must be below 300kb.");
            }
        }
    }
    
    const handleActiveChange = (event) => {
        setCheckBoxes({ ...checkBoxes, active: !checkBoxes.active });
    }

    const handleComingSoonChange = (event) => {
        setCheckBoxes({ ...checkBoxes, comingSoon: !checkBoxes.comingSoon });
    }

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
                        Category
                    </Typography>
                </Col>
            </Row>
            <Form>
                <input
                    type="password"
                    autoComplete="on"
                    value=""
                    style={{ display: 'none' }}
                    readOnly={true}
                />
                <Row>
                    <Col md={6}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel htmlFor="name">Name</InputLabel>
                            <Input id="name" />
                            <FormHelperText></FormHelperText>
                        </FormControl>
                    </Col>
                </Row>
                <div className="margin-global-top-1" />
                <Row>
                    <Col md={6}>
                        <FormControlLabel control={<Checkbox />} label="Coming Soon" />
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <FormControlLabel control={<Checkbox />} label="Active" />
                    </Col>
                </Row>
                <div className="margin-global-top-1" />
                <Row>
                    <Col md={6}>
                        <label htmlFor="image">
                            <Input hidden accept="image/*" id="image" type="file" />
                            <Button variant="contained" component="span">
                                Upload
                            </Button>
                        </label>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}

export default CategoryForm;