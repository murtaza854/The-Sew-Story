import { FormControl, InputLabel, Typography, Input, FormControlLabel, Checkbox, FormHelperText, Button, TextField, Autocomplete, Select, MenuItem, IconButton, Tooltip } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../../../../api';

function gcd(a, b) {
    return (b === 0) ? a : gcd(b, a % b);
}

function checkIfObjExistsByName(obj, name) {
    return obj.find(o => o.name.toLowerCase() === name.toLowerCase());
}

function ProductForm(props) {
    const {
        rows,
        setRows,
        setFilteredRows
    } = props;
    let history = useHistory();
    const id = parseInt(useParams().id) || null;

    const [name, setName] = useState({ value: '', error: false, helperText: 'Enter a name Ex. Kaneez' });
    const [productCode, setProductCode] = useState({ value: '', error: false, helperText: 'Enter a product code Ex. KZSS010' });
    const [price, setPrice] = useState({ value: '', error: false, helperText: 'Enter a price Ex. 10.00' });
    const [quantity, setQuantity] = useState({ value: '', error: false, helperText: 'Enter a quantity Ex. 10' });
    const [story, setStory] = useState({ value: '', error: false, helperText: 'Enter a story Ex. This is a story...' });
    const [storyImage, setStoryImage] = useState({ picturePreview: '', imgURl: '', error: false });
    const [images, setImages] = useState([]);
    const [category, setCategory] = useState({ name: '', obj: null, helperText: 'Enter category Ex. Kitchen Towels', error: false });
    const [details, setDetails] = useState([
        { type: '', label: '', text: '', typeError: false, typeHelperText: 'Select a type Ex. Care Instructions', labelHelperText: 'Enter a label Ex. Weight', textError: false, textHelperText: 'Enter text Ex. 4.00 lbs/Dozen', error: false }
    ]);
    const [checkBoxes, setCheckBoxes] = useState({ active: true });

    const [storyOldFileName, setStoryOldFileName] = useState('');
    const [imagesOldFileNames, setImagesOldFileNames] = useState([]);

    const [categories, setCategories] = useState([]);
    const [detailsTypes, setDetailsTypes] = useState([]);

    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        (
            async () => {
                if (id) {
                    const response = await fetch(`${api}/product/getById`, {
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
                        setName({ value: data.name, error: false, helperText: 'Enter a name Ex. Kaneez' });
                        setProductCode({ value: data.productCode, error: false, helperText: 'Enter a product code Ex. KZSS010' });
                        setPrice({ value: data.price, error: false, helperText: 'Enter a price Ex. 10.00' });
                        setQuantity({ value: data.quantity, error: false, helperText: 'Enter a quantity Ex. 10' });
                        setStory({ value: data.story, error: false, helperText: 'Enter a story Ex. This is a story...' });
                        setStoryImage({ picturePreview: '', imgURl: data.imagePath, error: false });
                        setImages(data.images);
                        setCategory({ name: data.category.name, obj: data.category, helperText: 'Enter category Ex. Kitchen Towels', error: false });
                        setDetails(data.details);
                        setCheckBoxes({ active: data.active });
                        setDisabled(false);

                        setStoryOldFileName(data.fileName);
                        setImagesOldFileNames(data.images.map(img => img.fileName));
                    } else {
                        history.push('/admin/product');
                    }
                }
            })();
    }, [history, id]);

    useEffect(() => {
        (
            async () => {
                const response = await fetch(`${api}/category/getAllCategories`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const content = await response.json();
                if (content.data) {
                    setCategories(content.data);
                }
            }
        )();
    }, []);

    useEffect(() => {
        (
            async () => {
                const response = await fetch(`${api}/type/getAllTypes`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const content = await response.json();
                if (content.data) {
                    setDetailsTypes(content.data);
                }
            }
        )();
    }, []);


    useEffect(() => {
        let flag = true;
        if (name.error === true) flag = true;
        else if (name.value.length === 0) flag = true;
        else if (storyImage.imgURl === '') flag = true;
        else if (storyImage.error === true) flag = true;
        else flag = false;
        setDisabled(flag);
    }, [name, storyImage]);

    const handleNameChange = (event) => {
        if (event.target.value.length === 0) {
            setName({ value: event.target.value, error: true, helperText: 'Name is required!' });
        } else if (checkIfObjExistsByName(rows, event.target.value)) {
            setName({ value: event.target.value, error: true, helperText: 'Product already exists!' });
        } else {
            setName({ value: event.target.value, error: false, helperText: 'Enter a name Ex. Kaneez' });
        }
    }

    const handleProductCodeChange = (event) => {
        if (event.target.value.length === 0) {
            setProductCode({ value: event.target.value, error: true, helperText: 'Product code is required!' });
        } else {
            setProductCode({ value: event.target.value, error: false, helperText: 'Enter a product code Ex. KZSS010' });
        }
    }

    const handlePriceChange = (event) => {
        if (event.target.value.length === 0) {
            setPrice({ value: event.target.value, error: true, helperText: 'Price is required!' });
        } else if (isNaN(event.target.value)) {
            setPrice({ value: event.target.value, error: true, helperText: 'Price must be a number!' });
        } else {
            setPrice({ value: event.target.value, error: false, helperText: 'Enter a price Ex. 10.00' });
        }
    }

    const handleQuantityChange = (event) => {
        if (event.target.value.length === 0) {
            setQuantity({ value: event.target.value, error: true, helperText: 'Quantity is required!' });
        } else if (isNaN(event.target.value)) {
            setQuantity({ value: event.target.value, error: true, helperText: 'Quantity must be a number!' });
        } else {
            setQuantity({ value: event.target.value, error: false, helperText: 'Enter a quantity Ex. 10' });
        }
    }

    const handleStoryChange = (event) => {
        if (event.target.value.length === 0) {
            setStory({ value: event.target.value, error: true, helperText: 'Story is required!' });
        } else {
            setStory({ value: event.target.value, error: false, helperText: 'Enter a story Ex. This is a story...' });
        }
    }

    const storyImageChange = event => {
        let reader = new FileReader();
        if (event.target.files && event.target.files[0]) {
            if (event.target.files[0].size / 1024 < 300) {
                reader.readAsDataURL(event.target.files[0]);
                const objectUrl = URL.createObjectURL(event.target.files[0]);
                reader.onload = ((theFile) => {
                    var image = new Image();
                    image.src = theFile.target.result;
                    image.onload = function () {
                        const w = this.width;
                        const h = this.height;
                        const r = gcd(w, h);
                        if (w / r < h / r) {
                            setStoryImage(prevState => ({ ...prevState, picturePreview: event.target.files[0], imgURl: objectUrl, error: false }));
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

    const imagesChange = event => {
        let reader = new FileReader();
        console.log(event.target.files);
    }

    const handleCategoryChange = (event) => {
        const obj = categories.find(cat => cat.name === event.target.value);
        if (event.target.value === '') {
            setCategory({ name: event.target.value, obj: null, helperText: 'Category is required!', error: true });
        } else if (obj === undefined) {
            setCategory({ name: event.target.value, obj: null, helperText: 'Category does not exist!', error: true });
        } else {
            setCategory({ name: event.target.value, obj, helperText: 'Enter category Ex. Kitchen Towels', error: false });
        }
    }

    const handleDetailsChange = (event, index, mode) => {
        const newDetails = [...details];
        if (mode === 'type') {
            newDetails[index].type = event.target.value;
        } else if (mode === 'label') {
            newDetails[index].label = event.target.value;
        } else if (mode === 'text') {
            if (event.target.value.length === 0) {
                newDetails[index].textError = true;
                newDetails[index].textHelperText = 'Text is required!';
            } else {
                newDetails[index].textError = false;
                newDetails[index].textHelperText = 'Enter text Ex. 4.00 lbs/Dozen';
            }
        }
        setDetails(newDetails);
    }

    const handleActiveChange = (event) => {
        setCheckBoxes({ ...checkBoxes, active: !checkBoxes.active });
    }

    const handleComingSoonChange = (event) => {
        setCheckBoxes({ ...checkBoxes, comingSoon: !checkBoxes.comingSoon });
    }

    const handleSubmitAdd = async event => {
        event.preventDefault();
        const formData = new FormData();
        formData.append(
            'data',
            JSON.stringify({
                name: name.value,
                active: checkBoxes.active,
                comingSoon: checkBoxes.comingSoon
            })
        );
        formData.append('image', storyImage.picturePreview);
        const response = await fetch(`${api}/category/add`, {
            method: 'POST',
            headers: {
                'Accept': 'multipart/form-data',
                'Cache-Control': 'no-store'
            },
            body: formData,
        });
        const content = await response.json();
        if (content.data) {
            setRows([...rows, content.data]);
            setFilteredRows([...rows, content.data]);
            history.push('/admin/category');
        } else {
            alert("Something went wrong.");
        }
    }

    const handleSubmitEdit = async event => {
        event.preventDefault();
        if (storyImage.picturePreview === '') {
            const response = await fetch(`${api}/category/updateWithoutImage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-store'
                },
                body: JSON.stringify({
                    id: id,
                    name: name.value,
                    active: checkBoxes.active,
                    comingSoon: checkBoxes.comingSoon
                })
            });
            const content = await response.json();
            if (content.data) {
                const newRows = rows.map(row => {
                    if (row.id === id) {
                        return content.data;
                    }
                    return row;
                });
                setRows(newRows);
                setFilteredRows(newRows);
                history.push('/admin/category');
            } else {
                alert("Something went wrong.");
            }
        } else {
            const formData = new FormData();
            formData.append(
                'data',
                JSON.stringify({
                    id: id,
                    name: name.value,
                    active: checkBoxes.active,
                    comingSoon: checkBoxes.comingSoon,
                    storyOldFileName
                })
            );
            formData.append('image', storyImage.picturePreview);
            const response = await fetch(`${api}/category/updateWithImage`, {
                method: 'POST',
                headers: {
                    'Accept': 'multipart/form-data',
                    'Cache-Control': 'no-store'
                },
                body: formData,
            });
            const content = await response.json();
            if (content.data) {
                const newRows = rows.map(row => {
                    if (row.id === id) {
                        return content.data;
                    } else {
                        return row;
                    }
                });
                setRows(newRows);
                setFilteredRows(newRows);
                history.push('/admin/category');
            } else {
                alert("Something went wrong.");
            }
        }
    }

    const handleAddDescription = _ => {
        setDetails([...details, { type: '', label: '', text: '', typeError: false, typeHelperText: 'Select a type Ex. Care Instructions', labelHelperText: 'Enter a label Ex. Weight', textError: false, textHelperText: 'Enter text Ex. 4.00 lbs/Dozen', error: false }]);
    }

    const handleRemoveDescription = index => {
        const newDetails = [...details];
        newDetails.splice(index, 1);
        setDetails(newDetails);
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
                        Category
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
                    <Col md={6}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel error={productCode.error} htmlFor="productCode">Product Code</InputLabel>
                            <Input id="productCode"
                                value={productCode.value}
                                onChange={handleProductCodeChange}
                                onBlur={handleProductCodeChange}
                                error={productCode.error}
                            />
                            <FormHelperText error={productCode.error}>{productCode.helperText}</FormHelperText>
                        </FormControl>
                    </Col>
                </Row>
                <div className="margin-global-top-1" />
                <Row>
                    <Col md={6}>
                        <FormControl variant="standard" fullWidth>
                            <Autocomplete
                                style={{ width: '100%' }}
                                disablePortal
                                // value={category.obj}
                                value={category.obj ? category.obj.name : null}
                                onChange={handleCategoryChange}
                                onBlur={handleCategoryChange}
                                fullWidth
                                id="combo-box-demo"
                                options={categories.map(option => option.name)}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField error={category.error} {...params} variant="standard" label="Category" />}
                            />
                            <FormHelperText error={category.error}>{category.helperText}</FormHelperText>
                        </FormControl>
                    </Col>
                </Row>
                <div className="margin-global-top-1" />
                <Row>
                    <Col md={6}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel error={price.error} htmlFor="storyImage">Price</InputLabel>
                            <Input
                                id="price"
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
                            <InputLabel error={quantity.error} htmlFor="quantity">Quantity</InputLabel>
                            <Input
                                id="quantity"
                                value={quantity.value}
                                onChange={handleQuantityChange}
                                onBlur={handleQuantityChange}
                                error={quantity.error}
                            />
                            <FormHelperText error={quantity.error}>{quantity.helperText}</FormHelperText>
                        </FormControl>
                    </Col>
                </Row>
                <div className="margin-global-top-1" />
                <Row>
                    <Typography
                        style={{ width: 'fit-content', lineHeight: '2.5' }}
                        variant="h8"
                        id="tableTitle"
                        component="div"
                    >
                        Description Details
                    </Typography>
                    <Col>
                        <Tooltip className="center-relative-vertical" title="Add Detail">
                            <Button style={{ borderRadius: '100px', padding: '10px', minWidth: '0' }} variant="contained" onClick={handleAddDescription}>
                                <AddIcon />
                            </Button>
                        </Tooltip>
                    </Col>
                </Row>
                {
                    details.map((detail, index) => {
                        return (
                            <Row key={index}>
                                <Col md={3}>
                                    <FormControl variant="standard" fullWidth>
                                        <InputLabel id="demo-simple-select-label">Description Type</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={detail.type}
                                            label="Description Type"
                                            error={detail.typeError}
                                            onChange={e => handleDetailsChange(e, index, 'type')}
                                        // onChange={handleChange}
                                        >
                                            {
                                                detailsTypes.map(detailType => (
                                                    <MenuItem key={detailType.id} value={detailType.id}>{detailType.name}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                        <FormHelperText error={detail.typeError}>{detail.typeHelperText}</FormHelperText>
                                    </FormControl>
                                </Col>
                                <Col md={3}>
                                    <FormControl variant="standard" fullWidth>
                                        <InputLabel id="demo-simple-select-label">Label</InputLabel>
                                        <Input
                                            id="label"
                                            value={detail.label}
                                            onChange={e => handleDetailsChange(e, index, 'label')}
                                            onBlur={e => handleDetailsChange(e, index, 'label')}
                                        // value={quantity.value}
                                        // onChange={handleQuantityChange}
                                        // onBlur={handleQuantityChange}
                                        // error={quantity.error}
                                        />
                                    </FormControl>
                                    <FormHelperText>{detail.labelHelperText}</FormHelperText>
                                </Col>
                                <Col md={3}>
                                    <FormControl variant="standard" fullWidth>
                                        <InputLabel id="demo-simple-select-label">Text</InputLabel>
                                        <Input
                                            id="text"
                                            value={detail.text}
                                            onChange={e => handleDetailsChange(e, index, 'text')}
                                            onBlur={e => handleDetailsChange(e, index, 'text')}
                                            error={detail.textError}
                                        // value={quantity.value}
                                        // onChange={handleQuantityChange}
                                        // onBlur={handleQuantityChange}
                                        // error={quantity.error}
                                        />
                                        <FormHelperText error={detail.textError}>{detail.textHelperText}</FormHelperText>
                                    </FormControl>
                                </Col>
                                {
                                    details.length !== 1 ? (
                                        <Col>
                                            <Tooltip className="center-relative-vertical" title="Remove Detail">
                                                <Button style={{ borderRadius: '100px', padding: '10px', minWidth: '0' }} variant="contained" onClick={() => handleRemoveDescription(index)}>
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
                    <Col md={6}>
                        <label htmlFor="image">
                            <Input onChange={storyImageChange} hidden accept="image/*" id="image" type="file" />
                            <Button type="button" variant="contained" component="span">
                                Upload Story Image
                            </Button>
                        </label>
                    </Col>
                </Row>
                {
                    storyImage.imgURl !== '' ? (
                        <Row>
                            <div className="margin-global-top-2" />
                            <img style={{ width: '30rem' }} src={storyImage.imgURl} alt="Preview" />
                            <div className="margin-global-top-1" />
                        </Row>
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

export default ProductForm;