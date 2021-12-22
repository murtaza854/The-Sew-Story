import { FormControl, InputLabel, Typography, Input, FormHelperText, Button, Select, MenuItem, FormControlLabel, Checkbox } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import api from '../../../../api';

function ShippingRateForm(props) {

    const [name, setName] = useState({ value: '', error: false, helperText: 'Enter a name Ex. Ground Shipping' });
    const [price, setPrice] = useState({ value: '', error: false, helperText: 'Enter a price Ex. 5.00' });
    const [taxBehavior, setTaxBehavior] = useState({ value: 'exclusive', error: false, helperText: 'Select one option', readOnly: false });
    const [deliveryEstimateMin, setDeliveryEstimateMin] = useState({ value: '', dropdown: 'business_day', error: false, helperText: 'Enter a minimum delivery estimate Ex. 1' });
    const [deliveryEstimateMax, setDeliveryEstimateMax] = useState({ value: '', dropdown: 'business_day', error: false, helperText: 'Enter a maximum delivery estimate Ex. 3' });
    const [checkBoxes, setCheckBoxes] = useState({ active: true });

    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        let flag = true;
        if (name.error === true) flag = true;
        else if (name.value.length === 0) flag = true;
        else if (price.error === true) flag = true;
        else if (price.value.length === 0) flag = true;
        else if (deliveryEstimateMin.error === true) flag = true;
        else if (deliveryEstimateMin.value.length === 0) flag = true;
        else if (deliveryEstimateMax.error === true) flag = true;
        else if (deliveryEstimateMax.value.length === 0) flag = true;
        else flag = false;
        setDisabled(flag);
    }, [name, price, deliveryEstimateMin, deliveryEstimateMax]);

    const handleNameChange = (event) => {
        if (event.target.value.length === 0) {
            setName({ value: event.target.value, error: true, helperText: 'Name is required!' });
        } else {
            setName({ value: event.target.value, error: false, helperText: 'Enter a name Ex. Ground Shipping' });
        }
    }

    const handlePriceChange = (event) => {
        if (event.target.value.length === 0) {
            setPrice({ value: event.target.value, error: true, helperText: 'Price is required!' });
        } else if (isNaN(event.target.value)) {
            setPrice({ value: event.target.value, error: true, helperText: 'Price must be a number!' });
        } else {
            setPrice({ value: event.target.value, error: false, helperText: 'Enter a price Ex. 5.00' });
        }
    }

    const handleTaxBehaviorChange = (event) => {
        setTaxBehavior({ value: event.target.value, error: false, helperText: 'Select one option', readOnly: false });
    }

    const handleDeliveryEstimateMinChange = (event) => {
        if (event.target.value.length === 0) {
            setDeliveryEstimateMin((prevState) => ({ ...prevState, value: event.target.value, error: true, helperText: 'Delivery estimate is required!' }));
        } else if (isNaN(event.target.value)) {
            setDeliveryEstimateMin((prevState) => ({ ...prevState, value: event.target.value, error: true, helperText: 'Delivery estimate must be a number!' }));
        } else {
            setDeliveryEstimateMin((prevState) => ({ ...prevState, value: event.target.value, error: false, helperText: 'Enter a minimum delivery estimate Ex. 1' }));
        }
    }

    const handleDeliveryEstimateMinUnitChange = (event) => {
        setDeliveryEstimateMin((prevState) => ({ ...prevState, dropdown: event.target.value }));
    }

    const handleDeliveryEstimateMaxChange = (event) => {
        if (event.target.value.length === 0) {
            setDeliveryEstimateMax((prevState) => ({ ...prevState, value: event.target.value, error: true, helperText: 'Delivery estimate is required!' }));
        } else if (isNaN(event.target.value)) {
            setDeliveryEstimateMax((prevState) => ({ ...prevState, value: event.target.value, error: true, helperText: 'Delivery estimate must be a number!' }));
        } else {
            setDeliveryEstimateMax((prevState) => ({ ...prevState, value: event.target.value, error: false, helperText: 'Enter a maximum delivery estimate Ex. 3' }));
        }
    }

    const handleDeliveryEstimateMaxUnitChange = (event) => {
        setDeliveryEstimateMax((prevState) => ({ ...prevState, dropdown: event.target.value }));
    }

    const handleActiveChange = (event) => {
        setCheckBoxes({ ...checkBoxes, active: !checkBoxes.active });
    }

    const handleSubmitAdd = async event => {
        event.preventDefault();
        const response = await fetch(`${api}/shippingRate/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store'
            },
            body: JSON.stringify({
                name: name.value,
                price: price.value,
                taxBehavior: taxBehavior.value,
                deliveryEstimateMin: deliveryEstimateMin.value,
                deliveryEstimateMinUnit: deliveryEstimateMin.dropdown,
                deliveryEstimateMax: deliveryEstimateMax.value,
                deliveryEstimateMaxUnit: deliveryEstimateMax.dropdown,
                active: checkBoxes.active
            })
        });
        const content = await response.json();
        if (content.data) {
            window.location.href = window.location.href.split('/admin')[0] + '/admin/shipping-rate';
        } else {
            alert(content.error.raw.message);
            // alert("Something went wrong.");
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
                        Shipping Rate
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
                            <InputLabel error={price.error} htmlFor="price">Price</InputLabel>
                            <Input id="price"
                                value={price.value}
                                onChange={handlePriceChange}
                                onBlur={handlePriceChange}
                                error={price.error}
                            />
                            <FormHelperText error={price.error}>{price.helperText}</FormHelperText>
                        </FormControl>
                    </Col>
                    <Col md={6}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel error={price.error} htmlFor="price">Include tax in price</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={taxBehavior.value}
                                label="Include tax in price"
                                readOnly={taxBehavior.readOnly}
                                onChange={handleTaxBehaviorChange}
                            // onChange={handleChange}
                            >
                                <MenuItem value="exclusive">No</MenuItem>
                                <MenuItem value="inclusive">Yes</MenuItem>
                            </Select>
                            <FormHelperText>{taxBehavior.typeHelperText}</FormHelperText>
                        </FormControl>
                    </Col>
                </Row>
                <div className="margin-global-top-1" />
                <Row>
                    <Col md={6}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel error={deliveryEstimateMin.error} htmlFor="deliveryEstimateMin">Delivery estimate minimum</InputLabel>
                            <Input id="deliveryEstimateMin"
                                value={deliveryEstimateMin.value}
                                onChange={handleDeliveryEstimateMinChange}
                                onBlur={handleDeliveryEstimateMinChange}
                                error={deliveryEstimateMin.error}
                            />
                            <FormHelperText error={deliveryEstimateMin.error}>{deliveryEstimateMin.helperText}</FormHelperText>
                        </FormControl>
                    </Col>
                    <Col md={6}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel error={price.error} htmlFor="price">Delivery estimate minimum unit</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={deliveryEstimateMin.dropdown}
                                label="Delivery estimate minimum unit"
                                onChange={handleDeliveryEstimateMinUnitChange}
                            // onChange={handleChange}
                            >
                                <MenuItem value="hour">Hours</MenuItem>
                                <MenuItem value="day">Days</MenuItem>
                                <MenuItem value="business_day">Business Days</MenuItem>
                                <MenuItem value="week">Weeks</MenuItem>
                                <MenuItem value="month">Months</MenuItem>
                            </Select>
                            <FormHelperText>Select an option</FormHelperText>
                        </FormControl>
                    </Col>
                </Row>
                <div className="margin-global-top-1" />
                <Row>
                    <Col md={6}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel error={deliveryEstimateMax.error} htmlFor="deliveryEstimateMax">Delivery estimate maximum</InputLabel>
                            <Input id="deliveryEstimateMax"
                                value={deliveryEstimateMax.value}
                                onChange={handleDeliveryEstimateMaxChange}
                                onBlur={handleDeliveryEstimateMaxChange}
                                error={deliveryEstimateMax.error}
                            />
                            <FormHelperText error={deliveryEstimateMax.error}>{deliveryEstimateMax.helperText}</FormHelperText>
                        </FormControl>
                    </Col>
                    <Col md={6}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel error={price.error} htmlFor="price">Delivery estimate maximum unit</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={deliveryEstimateMax.dropdown}
                                label="Delivery estimate maximum unit"
                                onChange={handleDeliveryEstimateMaxUnitChange}
                            // onChange={handleChange}
                            >
                                <MenuItem value="hour">Hours</MenuItem>
                                <MenuItem value="day">Days</MenuItem>
                                <MenuItem value="business_day">Business Days</MenuItem>
                                <MenuItem value="week">Weeks</MenuItem>
                                <MenuItem value="month">Months</MenuItem>
                            </Select>
                            <FormHelperText>Select an option</FormHelperText>
                        </FormControl>
                    </Col>
                </Row>
                <div className="margin-global-top-1" />
                <Row>
                    <Col md={6}>
                        <FormControlLabel
                            control={<Checkbox
                                checked={checkBoxes.active}
                                onChange={handleActiveChange}
                            />}
                            label="Active"
                        />
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

export default ShippingRateForm;