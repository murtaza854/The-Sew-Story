import { FormControl, InputLabel, Typography, Input, FormHelperText, Button, Select, MenuItem, InputAdornment, FormControlLabel, Checkbox, Autocomplete, TextField, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import React, { useState, useEffect } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import api from '../../../../api';

function CouponForm(props) {
    const id = useParams().id || null;

    const [name, setName] = useState({ value: '', error: false, helperText: 'Enter a name Ex. First Purchase Discount' });
    const [type, setType] = useState({ value: '', error: false, helperText: 'Select a type Ex. Fixed amount', readOnly: false });
    const [value, setValue] = useState({ value: '', error: false, helperText: 'Enter a value Ex. 10', readOnly: false });
    const [products, setProducts] = useState([
        { value: null, error: false, helperText: 'Enter a product Ex. Kaneez' }
    ]);
    const [redeemBy, setRedeemBy] = useState({ value: '', error: false, helperText: 'Enter a redeem by' });
    const [usageLimit, setUsageLimit] = useState({ value: '', error: false, helperText: 'Enter a usage limit Ex. 10' });

    const [productsData, setProductsData] = useState([]);
    // const [promotionCodes, setPromotionCodes] = useState(
    //     [
    //         { code: '', firstTime: false, limitCustomer: false, customerName: null, limitUsage: false, usageNumber: 0, expiryDateEnabled: false, expiryDate: null, mininumValueEnabled< error: false, helperText: 'Enter a promotion code Ex. KANEEZ10' }
    //     ]
    // );

    const [checkboxes, setCheckboxes] = useState({
        products: false,
        usageLimit: false,
        redeemBy: false,
        promotionCodes: false
    });

    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        (
            async () => {
                if (id) {
                    const response = await fetch(`${api}/coupon/getById`, {
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
                        setName({ value: data.name, error: false, helperText: 'Enter a name Ex. First Purchase Discount' });
                        setDisabled(false);
                        setType({ value: data.type, error: false, helperText: 'Select a type Ex. Fixed amount', readOnly: true });
                        setValue({ value: data.amountOff || data.percentOff, error: false, helperText: 'Enter a value Ex. 10', readOnly: true });
                        setRedeemBy({ value: data.redeemBy, error: false, helperText: 'Enter a redeem by' });
                        setUsageLimit({ value: data.maxRedemptions, error: false, helperText: 'Enter a usage limit Ex. 10' });
                        setCheckboxes({
                            products: data.appliedToProducts,
                            usageLimit: data.maxRedemptions ? true : false,
                            redeemBy: data.redeemBy ? true : false,
                            promotionCodes: data.hasPromotionCodes
                        });
                    } else {
                        window.location.href = window.location.href.split('/admin')[0] + '/admin/description-type';
                    }
                }
            })();
    }, [id]);

    useEffect(() => {
        (
            async () => {
                const response = await fetch(`${api}/product/getAllProducts`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const content = await response.json();
                if (content.data) {
                    const { data } = content;
                    const prods = data.map(product => {
                        return {
                            value: product.id,
                            label: product.name + ' - ' + product.shortDescription
                        };
                    });
                    setProductsData(prods);
                }
            })();
    }, []);

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
            setName({ value: event.target.value, error: false, helperText: 'Enter a name Ex. First Purchase Discount' });
        }
    }

    const handleTypeChange = (event) => {
        if (event.target.value.length === 0) {
            setType({ value: event.target.value, error: true, helperText: 'Type is required!', readOnly: false });
        } else {
            if (event.target.value === 'Fixed Amount Discount') {
                if (value.value.length !== 0) {
                    setValue({ value: parseInt(value.value), error: false, helperText: 'Enter a value Ex. 10', readOnly: false });
                }
            }
            setType({ value: event.target.value, error: false, helperText: 'Select a type Ex. Fixed amount', readOnly: false });
        }
    }

    const handleValueChange = (event) => {
        if (event.target.value.length === 0) {
            setValue({ value: event.target.value, error: true, helperText: 'Value is required!', readOnly: false });
        } else if (event.target.value < 0) {
            setValue({ value: event.target.value, error: true, helperText: 'Value must be greater than 0!', readOnly: false });
        } else if (isNaN(event.target.value)) {
            setValue({ value: event.target.value, error: true, helperText: 'Value must be a number!', readOnly: false });
        } else {
            if (type.value === 'Percentage Discount') {
                setValue({ value: event.target.value, error: false, helperText: 'Enter a value Ex. 10', readOnly: false });
            } else {
                setValue({ value: parseInt(event.target.value), error: false, helperText: 'Enter a value Ex. 10', readOnly: false });
            }
        }
    }

    const handleUsageLimitValueChange = (event) => {
        if (event.target.value.length === 0) {
            setUsageLimit({ value: event.target.value, error: true, helperText: 'Usage limit is required!' });
        } else if (event.target.value < 0) {
            setUsageLimit({ value: event.target.value, error: true, helperText: 'Usage limit must be greater than 0!' });
        } else if (isNaN(event.target.value)) {
            setUsageLimit({ value: event.target.value, error: true, helperText: 'Usage limit must be a number!' });
        } else {
            setUsageLimit({ value: event.target.value, error: false, helperText: 'Enter a usage limit Ex. 10' });
        }
    }

    const handleProductsChange = (event) => {
        setCheckboxes({ ...checkboxes, products: !checkboxes.products });
    }

    const handleUsageLimitChange = (event) => {
        setCheckboxes({ ...checkboxes, usageLimit: !checkboxes.usageLimit });
    }

    const handleRedeemByChange = (event) => {
        setCheckboxes({ ...checkboxes, redeemBy: !checkboxes.redeemBy });
    }

    const handlePromotionCodesChange = (event) => {
        setCheckboxes({ ...checkboxes, promotionCodes: !checkboxes.promotionCodes });
    }

    const handleRemoveProduct = (index) => {
        const newProducts = [...products];
        newProducts.splice(index, 1);
        setProducts(newProducts);
    }

    const handleAddProduct = () => {
        const newProducts = [...products];
        newProducts.push({ value: null, error: false, helperText: 'Enter a product Ex. Kaneez' });
        setProducts(newProducts);
    }

    function handleProductChange(event, newValue, index) {
        if (newValue) {
            const newProducts = [...products];
            newProducts[index] = { value: newValue, error: false, helperText: 'Enter a product Ex. Kaneez' };
            setProducts(newProducts);
        }
    }

    const handleSubmitAdd = async event => {
        event.preventDefault();
        const response = await fetch(`${api}/coupon/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store'
            },
            body: JSON.stringify({
                name: name.value,
                type: type.value,
                value: value.value,
                usageLimit: checkboxes.usageLimit ? usageLimit.value : null,
                redeemBy: checkboxes.redeemBy ? redeemBy.value : null,
                appliedToProducts: checkboxes.products,
                products: checkboxes.products ? products.map(product => product.value) : null,
                promotionCodes: checkboxes.promotionCodes
            })
        });
        const content = await response.json();
        if (content.data) {
            window.location.href = window.location.href.split('/admin')[0] + '/admin/coupon';
        } else {
            alert("Something went wrong.");
        }
    }

    const handleSubmitEdit = async event => {
        event.preventDefault();
        const response = await fetch(`${api}/coupon/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store'
            },
            body: JSON.stringify({
                id: id,
                name: name.value,
                usageLimit: checkboxes.usageLimit ? usageLimit.value : null,
                redeemBy: checkboxes.redeemBy ? redeemBy.value : null,
                appliedToProducts: checkboxes.products,
                products: checkboxes.products ? products.map(product => product.value) : null,
                promotionCodes: checkboxes.promotionCodes
            })
        });
        const content = await response.json();
        if (content.data) {
            window.location.href = window.location.href.split('/admin')[0] + '/admin/coupon';
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
                                value={type.value}
                                label="Description Type"
                                error={type.error}
                                onChange={handleTypeChange}
                                readOnly={type.readOnly}
                            >
                                <MenuItem value="Fixed Amount Discount">Fixed Amount Discount</MenuItem>
                                <MenuItem value="Percentage Discount">Percentage Discount</MenuItem>
                                ))
                            </Select>
                            <FormHelperText error={type.error}>{type.helperText}</FormHelperText>
                        </FormControl>
                    </Col>
                    <Col md={6}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel id="demo-simple-select-label">Value</InputLabel>
                            <Input id="name"
                                value={value.value}
                                readOnly={
                                    type.readOnly ? type.readOnly : !type.value
                                }
                                onChange={handleValueChange}
                                onBlur={handleValueChange}
                                error={value.error}
                                startAdornment={
                                    type.value === 'Fixed Amount Discount' ? <InputAdornment position="start">$</InputAdornment> : null
                                }
                                endAdornment={
                                    type.value === 'Percentage Discount' ? <InputAdornment position="end">%</InputAdornment> : null
                                }

                            />
                            <FormHelperText error={value.error}>{value.helperText}</FormHelperText>
                        </FormControl>
                    </Col>
                </Row>
                <div className="margin-global-top-1" />
                <Row>
                    <Col md={6}>
                        <FormControlLabel
                            control={<Checkbox
                                checked={checkboxes.products}
                                onChange={handleProductsChange}
                            />}
                            label="Apply to specific Products"
                        />
                        {
                            checkboxes.products ? (
                                <Tooltip className="center-relative-vertical" title="Add Product">
                                    <Button style={{ borderRadius: '100px', padding: '10px', minWidth: '0' }} variant="contained" onClick={handleAddProduct}>
                                        <AddIcon />
                                    </Button>
                                </Tooltip>
                            ) : null
                        }
                    </Col>
                </Row>
                {
                    checkboxes.products ? (
                        <>
                            {
                                products.map((product, index) => {
                                    return (
                                        <Row className="margin-global-top-1" key={index}>
                                            <Col md={6}>
                                                <Autocomplete
                                                    disablePortal
                                                    id="combo-box-demo"
                                                    value={product.value}
                                                    onChange={(event, newValue) => handleProductChange(event, newValue, index)}
                                                    onBlur={(event, newValue) => handleProductChange(event, newValue, index)}
                                                    options={productsData}
                                                    renderInput={(params) => <TextField label="Product Name" variant="standard" fullWidth {...params} />}
                                                />
                                            </Col>
                                            {
                                                products.length !== 1 ? (
                                                    <Col>
                                                        <Tooltip className="center-relative-vertical" title="Remove Product">
                                                            <Button style={{ borderRadius: '100px', padding: '10px', minWidth: '0' }} variant="contained" onClick={() => handleRemoveProduct(index)}>
                                                                <DeleteIcon />
                                                            </Button>
                                                        </Tooltip>
                                                    </Col>
                                                ) : null
                                            }
                                        </Row>
                                    )
                                })
                            }
                        </>
                    ) : null
                }
                <div className="margin-global-top-1" />
                <Row>
                    <Col md={6}>
                        <FormControlLabel
                            control={<Checkbox
                                checked={checkboxes.redeemBy}
                                onChange={handleRedeemByChange}
                            />}
                            label="Enable limit till when users can redeem this coupon"
                        />
                    </Col>
                </Row>
                <div className="margin-global-top-1" />
                {
                    checkboxes.redeemBy ? (
                        <>
                            <Row>
                                <Col md={6}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DateTimePicker
                                            disablePortal
                                            label="Redeem By"
                                            value={redeemBy.value}
                                            onChange={(newValue) => {
                                                setRedeemBy({ value: newValue, error: false, helperText: 'Enter a redeem by' });
                                            }}
                                            renderInput={(params) => <TextField error={redeemBy.error} helperText={redeemBy.helperText} variant="standard" fullWidth {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Col>
                            </Row>
                        </>
                    ) : null
                }
                <div className="margin-global-top-1" />
                <Row>
                    <Col md={6}>
                        <FormControlLabel
                            control={<Checkbox
                                checked={checkboxes.usageLimit}
                                onChange={handleUsageLimitChange}
                            />}
                            label="Enable usage limit"
                        />
                    </Col>
                </Row>
                <div className="margin-global-top-1" />
                {
                    checkboxes.usageLimit ? (
                        <>
                            <Row>
                                <Col md={6}>
                                    <FormControl variant="standard" fullWidth>
                                        <InputLabel error={usageLimit.error} id="demo-simple-select-label">Usage Limit</InputLabel>
                                        <Input id="name"
                                            value={usageLimit.value}
                                            onChange={handleUsageLimitValueChange}
                                            onBlur={handleUsageLimitValueChange}
                                            error={usageLimit.error}

                                        />
                                        <FormHelperText error={usageLimit.error}>{usageLimit.helperText}</FormHelperText>
                                    </FormControl>
                                </Col>
                            </Row>
                        </>
                    ) : null
                }
                <div className="margin-global-top-1" />
                <Row>
                    <Col md={6}>
                        <FormControlLabel
                            control={<Checkbox
                                checked={checkboxes.promotionCodes}
                                onChange={handlePromotionCodesChange}
                            />}
                            label="Enable Promotion Codes for Customers"
                        />
                    </Col>
                </Row>
                <div className="margin-global-top-1" />
                {
                    checkboxes.promotionCodes ? (
                        <>
                            <Row>
                                <Col>
                                    <p>Add Promotion Codes through the Promotion Code section</p>
                                </Col>
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

export default CouponForm;