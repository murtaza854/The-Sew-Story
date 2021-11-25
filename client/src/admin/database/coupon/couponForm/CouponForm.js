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
    const id = parseInt(useParams().id) || null;

    const [name, setName] = useState({ value: '', error: false, helperText: 'Enter a name Ex. First Purchase Discount' });
    const [type, setType] = useState({ value: '', error: false, helperText: 'Select a type Ex. Fixed amount' });
    const [value, setValue] = useState({ value: '', error: false, helperText: 'Enter a value Ex. 10' });
    const [products, setProducts] = useState([
        { value: null, error: false, helperText: 'Enter a product Ex. Kaneez' }
    ]);
    const [duration, setDuration] = useState({ value: '', error: false, helperText: 'Select a duration Ex. once' });
    const [redeemBy, setRedeemBy] = useState({ value: '', error: false, helperText: 'Enter a redeem by Ex. 2020-12-31' });
    const [usageLimit, setUsageLimit] = useState({ value: '', error: false, helperText: 'Enter a usage limit Ex. 10' });
    // const [promotionCodes, setPromotionCodes] = useState(
    //     [
    //         { code: '', firstTime: false, limitCustomer: false, customerName: null, limitUsage: false, usageNumber: 0, expiryDateEnabled: false, expiryDate: null, mininumValueEnabled< error: false, helperText: 'Enter a promotion code Ex. KANEEZ10' }
    //     ]
    // );

    const [checkboxes, setCheckboxes] = useState({
        products: false,
        usageLimit: false,
        redeemBy: false
    });

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

    const handleTypeChange = (event) => {
        if (event.target.value.length === 0) {
            setType({ value: event.target.value, error: true, helperText: 'Type is required!' });
        } else {
            setType({ value: event.target.value, error: false, helperText: 'Select a type Ex. Fixed amount' });
        }
    }

    const handleValueChange = (event) => {
        if (event.target.value.length === 0) {
            setValue({ value: event.target.value, error: true, helperText: 'Value is required!' });
        } else if (event.target.value < 0) {
            setValue({ value: event.target.value, error: true, helperText: 'Value must be greater than 0!' });
        } else if (isNaN(event.target.value)) {
            setValue({ value: event.target.value, error: true, helperText: 'Value must be a number!' });
        } else {
            setValue({ value: event.target.value, error: false, helperText: 'Enter a value Ex. 10' });
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

    // const handlePromotionCodesChange = (event) => {
    //     setCheckboxes({ ...checkboxes, promotionCodes: !checkboxes.promotionCodes });
    // }

    const handleDurationChange = (event) => {
        if (event.target.value.length === 0) {
            setDuration({ value: event.target.value, error: true, helperText: 'Duration is required!' });
        } else {
            setDuration({ value: event.target.value, error: false, helperText: 'Select a duration Ex. once' });
        }
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

    // const handleAddPromtionCode = () => {
    //     setPromotionCodes([...promotionCodes, { value: null, error: false, helperText: 'Enter Customer Name Ex. John Doe' }]);
    // }

    // const handleRemovePromtionCode = (index) => {
    //     const newPromotionCodes = [...promotionCodes];
    //     newPromotionCodes.splice(index, 1);
    //     setPromotionCodes(newPromotionCodes);
    // }

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
                                value={type.value}
                                label="Description Type"
                                error={type.error}
                                onChange={handleTypeChange}
                            >
                                <MenuItem value="Fixed Amount Discount">Fixed Amount Discount</MenuItem>
                                <MenuItem value="Percetage Discount">Percetage Discount</MenuItem>
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
                                readOnly={!type.value}
                                onChange={handleValueChange}
                                onBlur={handleValueChange}
                                error={value.error}
                                startAdornment={
                                    type.value === 'Fixed Amount Discount' ? <InputAdornment position="start">$</InputAdornment> : null
                                }
                                endAdornment={
                                    type.value === 'Percetage Discount' ? <InputAdornment position="end">%</InputAdornment> : null
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
                                products.map((product, index) => (
                                    <Row key={index}>
                                        <Col md={6}>
                                            <Autocomplete
                                                disablePortal
                                                id="combo-box-demo"
                                                options={[]}
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
                                ))
                            }
                        </>
                    ) : null
                }
                <div className="margin-global-top-1" />
                <Row>
                    <Col md={6}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel error={duration.error} id="demo-simple-select-label">Duration</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simtyprple-select"
                                value={duration.value}
                                label="Description Type"
                                error={duration.error}
                                onChange={handleDurationChange}
                            >
                                <MenuItem value="once">Once</MenuItem>
                                <MenuItem value="forever">Forever</MenuItem>
                                ))
                            </Select>
                            <FormHelperText error={duration.error}>{duration.helperText}</FormHelperText>
                        </FormControl>
                    </Col>
                </Row>
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
                                                setRedeemBy({ value: newValue, error: false, helperText: 'Enter a redeem by Ex. 2020-12-31' });
                                            }}
                                            renderInput={(params) => <TextField error={redeemBy.error} helperText={redeemBy.helperText} variant="standard" fullWidth {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Col>
                            </Row>
                        </>
                    ) : null
                }
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
                {
                    checkboxes.usageLimit ? (
                        <>
                            <Row>
                                <Col md={6}>
                                    <FormControl variant="standard" fullWidth>
                                        <InputLabel error={usageLimit.error} id="demo-simple-select-label">Usage Limit</InputLabel>
                                        <Input id="name"
                                            value={usageLimit.value}
                                            readOnly={!type.value}
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
                {/* <Row>
                    <Col md={6}>
                        <FormControlLabel
                            control={<Checkbox
                                checked={checkboxes.promotionCodes}
                                onChange={handlePromotionCodesChange}
                            />}
                            label="Enable Promotion Codes"
                        />
                        {
                            checkboxes.promotionCodes ? (
                                    <Tooltip className="center-relative-vertical" title="Add Customer">
                                        <Button style={{ borderRadius: '100px', padding: '10px', minWidth: '0' }} variant="contained" onClick={handleAddPromtionCode}>
                                            <AddIcon />
                                        </Button>
                                    </Tooltip>
                            ) : null
                        }
                    </Col>
                </Row> */}
                {/* {
                    checkboxes.promotionCodes ? (
                        <>
                            {
                                promotionCodes.map((promotionCode, index) => (
                                    <Row key={index}>
                                        <Col md={6}>
                                            <Autocomplete
                                                disablePortal
                                                id="combo-box-demo"
                                                options={[]}
                                                renderInput={(params) => <TextField label="Customer Name" variant="standard" fullWidth {...params} />}
                                            />
                                        </Col>
                                        {
                                            promotionCodes.length !== 1 ? (
                                                <Col>
                                                    <Tooltip className="center-relative-vertical" title="Remove Detail">
                                                        <Button style={{ borderRadius: '100px', padding: '10px', minWidth: '0' }} variant="contained" onClick={() => handleRemovePromtionCode(index)}>
                                                            <DeleteIcon />
                                                        </Button>
                                                    </Tooltip>
                                                </Col>
                                            ) : null
                                        }
                                    </Row>
                                ))
                            }
                        </>
                    ) : null
                } */}
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