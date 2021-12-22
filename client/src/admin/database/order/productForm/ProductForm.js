import { FormControl, InputLabel, Typography, Input, FormControlLabel, Checkbox, FormHelperText, Button, TextField, Autocomplete, Select, MenuItem, Tooltip } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import api from '../../../../api';


function gcd(a, b) {
    return (b === 0) ? a : gcd(b, a % b);
}

function checkIfObjExists(obj, string, id) {
    if (id) {
        return obj.find(o => o.productCode.toLowerCase() === string.toLowerCase() && o.id !== id);
    } else {
        return obj.find(o => o.productCode.toLowerCase() === string.toLowerCase());
    }
}

function ProductForm(props) {
    const {
        rows,
    } = props;
    const id = useParams().id || null;

    const [name, setName] = useState({ value: '', error: false, helperText: 'Enter a name Ex. Kaneez' });
    const [productCode, setProductCode] = useState({ value: '', error: false, helperText: 'Enter a product code Ex. KZSS010' });
    const [shortDescription, setShortDescription] = useState({ value: '', error: false, helperText: 'Enter a short description Ex. Pack of 2 Kitchen Towels' });
    const [price, setPrice] = useState({ value: '', error: false, helperText: 'Enter a price Ex. 10.00' });
    const [taxBehavior, setTaxBehavior] = useState({ value: 'exclusive', error: false, helperText: 'Select one option', readOnly: false });
    const [quantity, setQuantity] = useState({ value: '', error: false, helperText: 'Enter a quantity Ex. 10' });
    const [primaryImage, setPrimaryImage] = useState({ picturePreview: '', imgURl: '', error: false });
    const [story, setStory] = useState({ value: '', error: false, helperText: 'Enter a story Ex. This is a story...' });
    const [storyImage, setStoryImage] = useState({ picturePreview: '', imgURl: '', error: false });
    const [storyWrittenBy, setStoryWrittenBy] = useState({ value: '', error: false, helperText: 'Enter a Hand Embroidered by Ex. John Doe' });
    const [images, setImages] = useState([]);
    const [category, setCategory] = useState({ name: '', obj: null, helperText: 'Enter category Ex. Kitchen Towels', error: false });
    const [details, setDetails] = useState([
        { type: '', label: '', text: '', typeError: false, typeHelperText: 'Select a type Ex. Care Instructions', labelHelperText: 'Enter a label Ex. Weight', textError: false, textHelperText: 'Enter text Ex. 4.00 lbs/Dozen', error: false, order: 1, orderError: false, orderHelperText: 'Enter an order Ex. 1' },
    ]);
    const [checkBoxes, setCheckBoxes] = useState({ active: true });

    const [storyImageToBeDeleted, setStoryImageToBeDeleted] = useState('');
    const [primaryImageToBeDeleted, setPrimaryImageToBeDeleted] = useState('');
    const [imagesOldFileNames, setImagesOldFileNames] = useState([]);
    const [imagesToBeDeleted, setImagesToBeDeleted] = useState([]);

    const [categories, setCategories] = useState([]);
    const [detailsTypes, setDetailsTypes] = useState([]);

    const [disabled, setDisabled] = useState(true);

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
        else if (shortDescription.error === true) flag = true;
        else if (shortDescription.value.length === 0) flag = true;
        else if (primaryImage.imgURl === '') flag = true;
        else if (primaryImage.error === true) flag = true;
        else if (storyImage.imgURl === '') flag = true;
        else if (storyImage.error === true) flag = true;
        else if (storyWrittenBy.error === true) flag = true;
        else if (storyWrittenBy.value.length === 0) flag = true;
        else if (category.error === true) flag = true;
        else if (category.obj === null) flag = true;
        else if (details.length !== 0) {
            for (let i = 0; i < details.length; i++) {
                if (details[i].error === true) {
                    flag = true;
                    break;
                } else if (details[i].typeError === true) {
                    flag = true;
                    break;
                } else if (details[i].textError === true) {
                    flag = true;
                    break;
                } else if (details[i].orderError === true) {
                    flag = true;
                    break;
                } else {
                    flag = false;
                }
            }
        }
        setDisabled(flag);
    }, [name, shortDescription, primaryImage, storyImage, storyWrittenBy, category, details]);

    const handleNameChange = (event) => {
        if (event.target.value.length === 0) {
            setName({ value: event.target.value, error: true, helperText: 'Name is required!' });
        } else {
            setName({ value: event.target.value, error: false, helperText: 'Enter a name Ex. Kaneez' });
        }
    }

    const handleShortDescriptionChange = (event) => {
        if (event.target.value.length === 0) {
            setShortDescription({ value: event.target.value, error: true, helperText: 'Short description is required!' });
        } else {
            setShortDescription({ value: event.target.value, error: false, helperText: 'Enter a short description Ex. Pack of 2 Kitchen Towels' });
        }
    }

    const handleProductCodeChange = (event) => {
        if (event.target.value.length === 0) {
            setProductCode({ value: event.target.value, error: true, helperText: 'Product code is required!' });
        } else if (checkIfObjExists(rows, event.target.value, id)) {
            setProductCode({ value: event.target.value, error: true, helperText: 'Product code already exists!' });
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

    const handleTaxBehaviorChange = (event) => {
        setTaxBehavior({ value: event.target.value, error: false, helperText: 'Select one option', readOnly: false });
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

    const primaryImageChange = event => {
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
                            setPrimaryImage(prevState => ({ ...prevState, picturePreview: event.target.files[0], imgURl: objectUrl, error: false }));
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
                        if (w / r === h / r) {
                            setStoryImage(prevState => ({ ...prevState, picturePreview: event.target.files[0], imgURl: objectUrl, error: false }));
                        }
                        else {
                            alert("Please upload a square image.");
                        }
                    };
                });
            } else {
                alert("Size too large. Must be below 300kb.");
            }
        }
    }

    const imagesChange = event => {
        const files = event.target.files;
        let flag = false;
        if (images.length + files.length < 8) {
            Array.prototype.forEach.call(files, (file, index) => {
                if (file.size / 1024 < 300) {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    const objectUrl = URL.createObjectURL(file);
                    reader.onload = ((theFile) => {
                        var image = new Image();
                        image.src = theFile.target.result;
                        image.onload = function () {
                            const w = this.width;
                            const h = this.height;
                            const r = gcd(w, h);
                            if (w / r < h / r) {
                                setImages(prevState => [...prevState, { picturePreview: file, imgURl: objectUrl, error: false }]);
                            } else {
                                flag = true;
                            }
                        };
                    });
                } else {
                    alert("Size too large. Must be below 300kb.");
                }
            });
            if (flag) {
                alert("Only portrait images uploaded");
            }
        } else {
            alert("You can only upload a maximum of 8 images");
        }
    }

    const handleStoryWrittenByChange = (event) => {
        if (event.target.value.length === 0) {
            setStoryWrittenBy({ value: event.target.value, error: true, helperText: 'Hand Embroidered by is required!' });
        } else {
            setStoryWrittenBy({ value: event.target.value, error: false, helperText: 'Enter Hand Embroidered by Ex. John Doe' });
        }
    }

    const handleRemoveImage = async (imgURL, index) => {
        // try {
        //     const response = await fetch(`${api}/product/removeImage`, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({
        //             imageURL: imgURL
        //         })
        //     });
        //     const data = await response.json();
        //     if (data.success) {
        //         setImages(prevState => prevState.filter((image, i) => i !== index));
        //     } else {
        //         throw new Error(data.message);
        //     }
        // } catch (error) {
        //     alert(error.message);
        // }
        const imgSplit = imgURL.split('/')[imgURL.split('/').length - 1];
        if (imagesOldFileNames.includes(imgSplit)) {
            const imagesDeleted = [];
            imagesOldFileNames.forEach((fileName, i) => {
                if (imgSplit === fileName) {
                    imagesDeleted.push(fileName);
                }
            });
            setImagesToBeDeleted(prevState => [...prevState, ...imagesDeleted]);
        }
        setImages(prevState => prevState.filter((image, i) => i !== index));
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
                newDetails[index].text = event.target.value;
                newDetails[index].textError = false;
                newDetails[index].textHelperText = 'Enter text Ex. 4.00 lbs/Dozen';
            }
        } else if (mode === 'order') {
            if (event.target.value.length === 0) {
                newDetails[index].orderError = true;
                newDetails[index].orderHelperText = 'Order is required!';
                newDetails[index].order = event.target.value;
            } else if (isNaN(event.target.value)) {
                newDetails[index].order = event.target.value;
                newDetails[index].orderError = true;
                newDetails[index].orderHelperText = 'Order must be a number!';
            } else if (event.target.value < 0) {
                newDetails[index].order = event.target.value;
                newDetails[index].orderError = true;
                newDetails[index].orderHelperText = 'Order must be greater than 0!';
            } else {
                newDetails[index].order = event.target.value;
                newDetails[index].orderError = false;
                newDetails[index].orderHelperText = 'Enter order Ex. 1';
            }
        }
        setDetails(newDetails);
    }

    const handleActiveChange = (event) => {
        setCheckBoxes({ ...checkBoxes, active: !checkBoxes.active });
    }

    const handleSubmitAdd = async event => {
        event.preventDefault();
        const formData = new FormData();
        formData.append(
            'data',
            JSON.stringify({
                name: name.value,
                shortDescription: shortDescription.value,
                productCode: productCode.value,
                price: price.value,
                taxBehavior: taxBehavior.value,
                quantity: quantity.value,
                story: story.value,
                storyWrittenBy: storyWrittenBy.value,
                category: category.obj,
                details: details.map(detail => ({
                    type: detail.type,
                    label: detail.label,
                    text: detail.text,
                    order: detail.order
                })),
                active: checkBoxes.active,
            })
        );
        for (let index = 0; index < images.length; index++) {
            const element = images[index];
            formData.append('images', element.picturePreview);
        }
        formData.append('images', storyImage.picturePreview);
        formData.append('images', primaryImage.picturePreview);
        const response = await fetch(`${api}/product/add`, {
            method: 'POST',
            headers: {
                'Accept': 'multipart/form-data',
                'Cache-Control': 'no-store'
            },
            body: formData,
        });
        const content = await response.json();
        if (content.data) {
            window.location.href = window.location.href.split('/admin')[0] + '/admin/product';
        } else {
            alert("Something went wrong.");
        }
    }

    // const handleSubmitAdd = async event => {
    //     event.preventDefault();
    //     const formData = new FormData();
    //     formData.append(
    //         'data',
    //         JSON.stringify({
    //             name: name.value,
    //             shortDescription: shortDescription.value,
    //             productCode: productCode.value,
    //             price: price.value,
    //             quantity: quantity.value,
    //             story: story.value,
    //             storyWrittenBy: storyWrittenBy.value,
    //             category: category.obj,
    //             details: details.map(detail => ({
    //                 type: detail.type,
    //                 label: detail.label,
    //                 text: detail.text,
    //                 order: detail.order
    //             })),
    //             active: checkBoxes.active,
    //         })
    //     );
    //     for (let index = 0; index < images.length; index++) {
    //         const element = images[index];
    //         formData.append('images', element.picturePreview);
    //     }
    //     formData.append('images', storyImage.picturePreview);
    //     const response = await fetch(`${api}/product/add`, {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'multipart/form-data',
    //             'Cache-Control': 'no-store'
    //         },
    //         body: formData,
    //     });
    //     const content = await response.json();
    //     if (content.data) {
    //         window.location.href = window.location.href.split('/admin')[0] + '/admin/product';
    //     } else {
    //         alert("Something went wrong.");
    //     }
    // }

    const handleSubmitEdit = async event => {
        event.preventDefault();
        const formData = new FormData();
        for (let index = 0; index < images.length; index++) {
            const element = images[index];
            if (element.picturePreview !== '') {
                formData.append('images', element.picturePreview);
            }
        }
        let count = 0;
        if (storyImage.picturePreview !== '') {
            formData.append('images', storyImage.picturePreview);
            count += 1;
        }
        if (primaryImage.picturePreview !== '') {
            formData.append('images', primaryImage.picturePreview);
            count += 1;
        }
        formData.append(
            'data',
            JSON.stringify({
                id: id,
                name: name.value,
                shortDescription: shortDescription.value,
                productCode: productCode.value,
                price: price.value,
                taxBehavior: taxBehavior.value,
                quantity: quantity.value,
                story: story.value,
                storyWrittenBy: storyWrittenBy.value,
                category: category.obj,
                details: details.map(detail => ({
                    type: detail.type,
                    label: detail.label,
                    text: detail.text,
                    order: detail.order
                })),
                active: checkBoxes.active,
                imagesToBeDeleted,
                storyImageToBeDeleted: storyImage.picturePreview !== '' ? storyImageToBeDeleted : '',
                primaryImageToBeDeleted: primaryImage.picturePreview !== '' ? primaryImageToBeDeleted : '',
                count
            })
        );
        const response = await fetch(`${api}/product/update`, {
            method: 'POST',
            headers: {
                'Accept': 'multipart/form-data',
                'Cache-Control': 'no-store'
            },
            body: formData,
        });
        const content = await response.json();
        if (content.data) {
            window.location.href = window.location.href.split('/admin')[0] + '/admin/product';
        } else {
            alert("Something went wrong.");
        }
        // let flag = false;
        // if (storyImage.picturePreview === '') flag = true;
        // else flag = false;
        // if (images.length === 0) flag = true;
        // else flag = false;
        // if (flag) {
        //     const response = await fetch(`${api}/product/updateWithoutImage`, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Cache-Control': 'no-store'
        //         },
        //         body: JSON.stringify({
        //             id: id,
        //             name: name.value,
        //             shortDescription: shortDescription.value,
        //             productCode: productCode.value,
        //             price: price.value,
        //             quantity: quantity.value,
        //             story: story.value,
        //             storyWrittenBy: storyWrittenBy.value,
        //             storyOldFileName: storyOldFileName,
        //             category: category.obj,
        //             details: details.map(detail => ({
        //                 type: detail.type,
        //                 label: detail.label,
        //                 text: detail.text,
        //                 order: detail.order
        //             })),
        //             active: checkBoxes.active,
        //             imagesToBeDeleted: imagesToBeDeleted,
        //             storyImageToBeDeleted: storyImageToBeDeleted,
        //         })
        //     });
        //     const content = await response.json();
        //     if (content.data) {
        //         window.location.href = window.location.href.split('/admin')[0] + '/admin/product';
        //     } else {
        //         alert("Something went wrong.");
        //     }
        // } else {
        //     const formData = new FormData();
        //     formData.append(
        //         'data',
        //         JSON.stringify({
        //             id: id,
        //             name: name.value,
        //             shortDescription: shortDescription.value,
        //             productCode: productCode.value,
        //             price: price.value,
        //             quantity: quantity.value,
        //             story: story.value,
        //             storyWrittenBy: storyWrittenBy.value,
        //             storyOldFileName: storyOldFileName,
        //             category: category.obj,
        //             details: details.map(detail => ({
        //                 type: detail.type,
        //                 label: detail.label,
        //                 text: detail.text,
        //                 order: detail.order
        //             })),
        //             active: checkBoxes.active,
        //             imagesToBeDeleted: imagesToBeDeleted,
        //             storyImageToBeDeleted: storyImageToBeDeleted,
        //         })
        //     );
        //     for (let index = 0; index < images.length; index++) {
        //         const element = images[index];
        //         if (element.picturePreview !== '') {
        //             formData.append('images', element.picturePreview);
        //         }
        //     }
        //     if (storyImage.picturePreview !== '') {
        //         formData.append('images', storyImage.picturePreview);
        //     }
        //     const response = await fetch(`${api}/product/updateWithImage`, {
        //         method: 'POST',
        //         headers: {
        //             'Accept': 'multipart/form-data',
        //             'Cache-Control': 'no-store'
        //         },
        //         body: formData,
        //     });
        //     const content = await response.json();
        //     if (content.data) {
        //         window.location.href = window.location.href.split('/admin')[0] + '/admin/product';
        //     } else {
        //         alert("Something went wrong.");
        //     }
        // }
    }

    const handleAddDescription = _ => {
        setDetails([...details, { type: '', label: '', text: '', typeError: false, typeHelperText: 'Select a type Ex. Care Instructions', labelHelperText: 'Enter a label Ex. Weight', textError: false, textHelperText: 'Enter text Ex. 4.00 lbs/Dozen', error: false, order: details.length + 1, orderError: false, orderHelperText: 'Enter an order Ex. 1' }]);
    }

    const handleRemoveDescription = index => {
        const newDetails = [];
        for (let i = 0; i < details.length; i++) {
            if (i !== index) {
                newDetails.push(details[i]);
            }
        }
        newDetails.forEach((detail, index) => {
            detail.order = index + 1;
        });
        setDetails(newDetails);
    }

    useEffect(() => {
        (
            async () => {
                if (id && detailsTypes.length !== 0) {
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
                        const activePrice = data.prices.find(p => p.active);
                        setName({ value: data.name, error: false, helperText: 'Enter a name Ex. Kaneez' });
                        setShortDescription({ value: data.shortDescription, error: false, helperText: 'Enter a short description Ex. Pack of 2 Kitchen Towels' });
                        setProductCode({ value: data.productCode, error: false, helperText: 'Enter a product code Ex. KZSS010' });
                        setPrice({ value: activePrice.amount, error: false, helperText: 'Enter a price Ex. 10.00' });
                        setTaxBehavior({ value: activePrice.taxBehavior, error: false, helperText: 'Select one option', readOnly: false });
                        setQuantity({ value: data.quantity, error: false, helperText: 'Enter a quantity Ex. 10' });
                        setPrimaryImage({ picturePreview: '', imgURl: data.image, error: false })
                        setStory({ value: data.story, error: false, helperText: 'Enter a story Ex. This is a story...' });
                        setStoryImage({ picturePreview: '', imgURl: data.storyImagePath, error: false });
                        setStoryImageToBeDeleted(data.storyImageFileName);
                        setPrimaryImageToBeDeleted(data.image)
                        setStoryWrittenBy({ value: data.storyWrittenBy, error: false, helperText: 'Enter a Hand Embroidered by Ex. John Doe' });
                        // setImages(data.images);
                        setCategory({ name: data.category.name, obj: data.category, helperText: 'Enter category Ex. Kitchen Towels', error: false });
                        setCheckBoxes({ active: data.active });
                        const dbDetails = [];
                        data.details.forEach(d => {
                            dbDetails.push({ type: d.type.id, label: d.label, text: d.text, typeError: false, typeHelperText: 'Select a type Ex. Care Instructions', labelHelperText: 'Enter a label Ex. Weight', textError: false, textHelperText: 'Enter text Ex. 4.00 lbs/Dozen', error: false, order: d.order, orderError: false, orderHelperText: 'Enter an order Ex. 1' });
                        });
                        setDetails(dbDetails);
                        const dbImages = [];
                        data.images.forEach(i => {
                            dbImages.push({ picturePreview: '', imgURl: i.path, error: false });
                        });
                        setImages(dbImages);
                        setImagesOldFileNames(data.images.map(i => i.fileName));

                        setDisabled(false);

                    } else {
                        window.location.href = window.location.href.split('/admin')[0] + '/admin/product';
                    }
                }
            })();
    }, [id, detailsTypes]);

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
                        Product
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
                    <Col md={6}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel error={shortDescription.error} htmlFor="shortDescription">Short Description</InputLabel>
                            <Input id="shortDescription"
                                value={shortDescription.value}
                                onChange={handleShortDescriptionChange}
                                onBlur={handleShortDescriptionChange}
                                error={shortDescription.error}
                            />
                            <FormHelperText error={shortDescription.error}>{shortDescription.helperText}</FormHelperText>
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
                    <Col md={6}>
                        <Row>
                            <label htmlFor="image1">
                                <Input onChange={primaryImageChange} hidden accept="image/*" id="image1" type="file" />
                                <Button type="button" variant="contained" component="span">
                                    Upload Primary Image
                                </Button>
                            </label>
                        </Row>
                        <Row>
                            {
                                primaryImage.imgURl !== '' ? (
                                    <>
                                        <div className="margin-global-top-2" />
                                        <img style={{ width: '15rem' }} src={primaryImage.imgURl} alt="Preview" />
                                        <div className="margin-global-top-1" />
                                    </>
                                ) : null
                            }
                        </Row>
                    </Col>
                </Row>
                <div className="margin-global-top-1" />
                <Row>
                    <Col md={6}>
                        <FormControl variant="standard" fullWidth>
                            {/* <InputLabel error={story.error} htmlFor="story">Story</InputLabel> */}
                            <TextField
                                id="story"
                                label="Story"
                                variant="standard"
                                value={story.value}
                                onChange={handleStoryChange}
                                onBlur={handleStoryChange}
                                error={story.error}
                                multiline
                                rows={10}
                            />
                            <FormHelperText error={story.error}>{story.helperText}</FormHelperText>
                        </FormControl>
                    </Col>
                    <Col md={6}>
                        <Row>
                            <label htmlFor="image">
                                <Input onChange={storyImageChange} hidden accept="image/*" id="image" type="file" />
                                <Button type="button" variant="contained" component="span">
                                    Upload Story Image
                                </Button>
                            </label>
                        </Row>
                        <Row>
                            {
                                storyImage.imgURl !== '' ? (
                                    <Row>
                                        <div className="margin-global-top-2" />
                                        <img style={{ width: '30rem' }} src={storyImage.imgURl} alt="Preview" />
                                        <div className="margin-global-top-1" />
                                    </Row>
                                ) : null
                            }
                        </Row>
                    </Col>
                </Row>
                <div className="margin-global-top-1" />
                <Row>
                    <Col md={6}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel error={storyWrittenBy.error} htmlFor="storyWrittenBy">Hand Embroidered by</InputLabel>
                            <Input
                                id="storyWrittenBy"
                                value={storyWrittenBy.value}
                                onChange={handleStoryWrittenByChange}
                                onBlur={handleStoryWrittenByChange}
                                error={storyWrittenBy.error}
                            />
                            <FormHelperText error={storyWrittenBy.error}>{storyWrittenBy.helperText}</FormHelperText>
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
                                <Col md={2}>
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
                                <Col md={2}>
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
                                <Col md={2}>
                                    <FormControl variant="standard" fullWidth>
                                        <InputLabel id="demo-simple-select-label">Text</InputLabel>
                                        <Input
                                            id="text"
                                            value={detail.text}
                                            onChange={e => handleDetailsChange(e, index, 'text')}
                                            onBlur={e => handleDetailsChange(e, index, 'text')}
                                            error={detail.textError}
                                        />
                                        <FormHelperText error={detail.textError}>{detail.textHelperText}</FormHelperText>
                                    </FormControl>
                                </Col>
                                <Col md={2}>
                                    <FormControl variant="standard" fullWidth>
                                        <InputLabel id="order">Order</InputLabel>
                                        <Input
                                            id="order"
                                            value={detail.order}
                                            onChange={e => handleDetailsChange(e, index, 'order')}
                                            onBlur={e => handleDetailsChange(e, index, 'order')}
                                            error={detail.orderError}
                                        />
                                        <FormHelperText error={detail.orderError}>{detail.orderHelperText}</FormHelperText>
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
                {/* {
                    storyImage.imgURl !== '' ? (
                        <Row>
                            <div className="margin-global-top-2" />
                            <img style={{ width: '30rem' }} src={storyImage.imgURl} alt="Preview" />
                            <div className="margin-global-top-1" />
                        </Row>
                    ) : null
                } */}
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

export default ProductForm;