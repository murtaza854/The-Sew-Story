import { FormControl, InputLabel, Typography, Input, FormHelperText, Button, Select, MenuItem } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import api from '../../../../api';

function CouponForm(props) {
    const id = parseInt(useParams().id) || null;

    const [name, setName] = useState({ value: '', error: false, helperText: 'Enter a name Ex. First Purchase Discount' });
    const [type, setType] = useState({ value: '', error: false, helperText: 'Select a type Ex. Fixed amount' });
    const [value, setValue] = useState({ value: '', error: false, helperText: 'Enter a value Ex. 10' });
    const [products, setProducts] = useState({ value: [], error: false, helperText: 'Select products Ex. Kaneez' });
    const [redeemBy, setRedeemBy] = useState({ value: '', error: false, helperText: 'Enter a redeem by Ex. 2020-12-31' });
    const [usageLimit, setUsageLimit] = useState({ value: '', error: false, helperText: 'Enter a usage limit Ex. 10' });
    const [promotionCodes, setPromotionCodes] = useState({ value: [] });

    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        (
            async () => {
                if (id) {
                    const response = await fetch(`${api}/type/getById`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            id: id
                        })
                    });
                    const content = await response.json();
                    if (content.data) {
                        const { data } = content;
                        setName({ value: data.name, error: false, helperText: 'Enter a name Ex. Care Instructions' });
                        setDisabled(false);
                    } else {
                        window.location.href = window.location.href.split('/admin')[0] + '/admin/description-type';
                    }
                }
            })();
    }, [id]);

    useEffect(() => {
        let flag = true;
        if (name.error === true) flag = true;
        else if (name.value.length === 0) flag = true;
        else flag = false;
        setDisabled(flag);
    }, [name]);

    const handleNameChange = (event) => {
        if (event.target.value.length === 0) {
            setName({ value: event.target.value, error: true, helperText: 'Name is required!' });
        } else {
            setName({ value: event.target.value, error: false, helperText: 'Enter a name Ex. Care Instructions' });
        }
    }

    const handleSubmitAdd = async event => {
        event.preventDefault();
        const response = await fetch(`${api}/type/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store'
            },
            body: JSON.stringify({
                name: name.value
            })
        });
        const content = await response.json();
        if (content.data) {
            window.location.href = window.location.href.split('/admin')[0] + '/admin/description-type';
        } else {
            alert("Something went wrong.");
        }
    }

    const handleSubmitEdit = async event => {
        event.preventDefault();
        const response = await fetch(`${api}/type/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store'
            },
            body: JSON.stringify({
                id: id,
                name: name.value,
            })
        });
        const content = await response.json();
        if (content.data) {
            window.location.href = window.location.href.split('/admin')[0] + '/admin/description-type';
        } else {
            alert("Something went wrong.");
        }
    }

    let onSubmit = handleSubmitAdd;
    if (id) onSubmit = handleSubmitEdit;

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
                        Coupon
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
                <Row>
                    <Col md={6}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel error={name.error} htmlFor="name">Name</InputLabel>
                            <Input id="name"
                                value={name.value}
                                onChange={handleNameChange}
                                onBlur={handleNameChange}
                                error={name.error}
                            />
                            <FormHelperText error={name.error}>{name.helperText}</FormHelperText>
                        </FormControl>
                    </Col>
                </Row>
                <div className="margin-global-top-1" />
                <Row>
                    <Col md={6}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel id="demo-simple-select-label">Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simtyprple-select"
                                value=""
                                label="Description Type"
                            // error={detail.typeError}
                            // onChange={e => handleDetailsChange(e, index, 'type')}
                            // onChange={handleChange}
                            >
                                <MenuItem value="Percetage Discount">Percetage Discount</MenuItem>
                                ))
                            </Select>
                            <FormHelperText error={type.typeError}>{type.typeHelperText}</FormHelperText>
                        </FormControl>
                    </Col>
                </Row>
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

export default CouponForm;