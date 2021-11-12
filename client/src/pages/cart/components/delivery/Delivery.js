import React, { useState, useEffect, Fragment, useContext } from 'react';
import { Col, Container, Row, Button, Form } from 'react-bootstrap';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import './Delivery.scss';
import { useHistory } from 'react-router';
import CartCountContext from '../../../../contexts/cartCountContext';
import api from '../../../../api';
import { Heading } from '../../../../components';

function Delivery(props) {
    // const user = useContext(UserContext);
    const cartCountContext = useContext(CartCountContext);
    const history = useHistory();

    useEffect(() => {
        // if (!user.userState) history.push('/login');
        if (cartCountContext.cartCount <= 0) history.push('/cart');
    }, [history, cartCountContext]);

    const [disable, setDisable] = useState(true);

    const [firstName, setFirstName] = useState({ name: '', error: false, errorText: '' });
    const [lastName, setLastName] = useState({ name: '', error: false, errorText: '' });
    const [email, setEmail] = useState({ name: '', error: false, errorText: '' });
    const [contactNumber, setContactNumber] = useState({ name: '', error: false, errorText: '' });

    const [state, setState] = useState({ value: [], error: false, errortext: '', readOnly: false });
    const [stateList, setStateList] = useState([]);
    const [stateLoading, setStateLoading] = useState(false);

    const [city, setCity] = useState({ value: [], error: false, errortext: '', readOnly: true });
    const [cityList, setCityList] = useState([]);
    const [cityLoading, setCityLoading] = useState(false);

    const [county, setCounty] = useState({ value: [], error: false, errortext: '', readOnly: true });
    const [countyList, setCountyList] = useState([]);
    const [countyLoading, setCountyLoading] = useState(false);

    const [addressLine1, setAddressLine1] = useState({ text: '', error: false, errorText: '' });
    const [addressLine2, setAddressLine2] = useState({ text: '' });
    const [landmark, setLandmark] = useState({ text: '' });
    const [zipCode, setZipCode] = useState({ text: '', error: false, errorText: '' });

    const changeFirstName = event => {
        if (event.target.value === '') setFirstName({ name: event.target.value, errorText: 'First name is required!', error: true });
        else setFirstName({ name: event.target.value, errorText: '', error: false });
    }
    const changeLastName = event => {
        if (event.target.value === '') setLastName({ name: event.target.value, errorText: 'Last name is required!', error: true });
        else setLastName({ name: event.target.value, errorText: '', error: false });
    }
    const changeEmail = event => {
        const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (event.target.value === '') setEmail({ name: '', errorText: 'Email address is required!', error: true });
        else if (!event.target.value.match(mailformat)) setEmail({ name: event.target.value, errorText: 'Please enter a valid email address!', error: true });
        else setEmail({ name: event.target.value, errorText: '', error: false });
    }

    function formatPhoneNumber(phoneNumberString) {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
        var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            var intlCode = (match[1] ? '+1 ' : '');
            return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
        }
        return null;
    }

    const changeContactNumber = event => {
        const phoneNumber = formatPhoneNumber(event.target.value);
        if (phoneNumber === null) setContactNumber({ name: event.target.value, errorText: 'Please enter a valid phone number!', error: true });
        else setContactNumber({ name: phoneNumber, errorText: '', error: false });
    }

    const changeState = async array => {
        if (array.length === 0) {
            setState({ value: array, error: true, errortext: 'State is required!', readOnly: false });
            setCity({ value: [], error: false, errortext: '', readOnly: true });
            setCounty({ value: [], error: false, errortext: '', readOnly: true });
        }
        else {
            setState({ value: array, error: false, errortext: '', readOnly: false });
            setCity({ value: [], error: false, errortext: '', readOnly: false });
            setCounty({ value: [], error: false, errortext: '', readOnly: true });
        }
    }
    const handleStateSearch = async (query) => {
        setStateLoading(true);
        setStateList([]);
        const response = await fetch(`${api}/state/get-states-search?stateText=${query}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store'
            },
            credentials: 'include',
            withCredentials: true,
        });
        const content = await response.json();
        setTimeout(() => {
            setStateList(content.data);
            setStateLoading(false);
        }, 1000)
    };
    const filterByState = () => true;

    const changeCity = async array => {
        if (array.length === 0) {
            setCity({ value: array, error: true, errortext: 'City is required!', readOnly: false });
            setCounty({ value: [], error: false, errortext: '', readOnly: false });
        }
        else {
            setCity({ value: array, error: false, errortext: '', readOnly: false });
            setCounty({ value: [], error: false, errortext: '', readOnly: false });
        }
    }
    const handleCitySearch = async (query) => {
        setCityLoading(true);
        setCityList([]);
        const response = await fetch(`${api}/city/get-cities-search?cityText=${query}&states=${JSON.stringify(state.value)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store'
            },
            credentials: 'include',
            withCredentials: true,
        });
        const content = await response.json();
        setTimeout(() => {
            setCityList(content.data);
            setCityLoading(false);
        }, 1000)
    };
    const filterByCity = () => true;

    const changeCounty = async array => {
        if (array.length === 0) setCounty({ value: array, error: true, errortext: 'County is required!', readOnly: false });
        else setCounty({ value: array, error: false, errortext: '', readOnly: false });
    }
    const handleCountySearch = async (query) => {
        setCountyLoading(true);
        setCountyList([]);
        const response = await fetch(`${api}/county/get-counties-search?countyText=${query}&cities=${JSON.stringify(city.value)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store'
            },
            credentials: 'include',
            withCredentials: true,
        });
        const content = await response.json();
        setTimeout(() => {
            setCountyList(content.data);
            setCountyLoading(false);
        }, 1000)
    };
    const filterByCounty = () => true;

    const handleAddressLine1 = event => {
        if (event.target.value === '') setAddressLine1({ text: event.target.value, errorText: 'Address line 1 is required!', error: true });
        else setAddressLine1({ text: event.target.value, errorText: '', error: false });
    }
    const handleAddressLine2 = event => {
        setAddressLine2({ text: event.target.value });
    }
    const handleLandmark = event => {
        setLandmark({ text: event.target.value });
    }
    const changeZipCode = event => {
        const zipCodeFormat = /^[0-9]{5}(?:-[0-9]{4})?$/;
        if (event.target.value === '') setZipCode({ text: event.target.value, errorText: 'Zip code is required!', error: true });
        else if (!event.target.value.match(zipCodeFormat)) setZipCode({ text: event.target.value, errorText: 'Please enter a valid zip code!', error: true });
        else setZipCode({ text: event.target.value, errorText: '', error: false });
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const onSubmit = e => {
        e.preventDefault();
        // console.log(logo.picturePreview);
        localStorage.setItem('delivery', JSON.stringify({
            state: state.value,
            city: city.value,
            county: county.value,
            addressLine1: addressLine1.text,
            addressLine2: addressLine2.text,
            landmark: landmark.text,
        }));
        history.push('/payment');
    }

    useEffect(() => {
        let flag = true;
        if (firstName.name.length === 0) flag = false;
        else if (firstName.error === true) flag = false;
        else if (lastName.name.length === 0) flag = false;
        else if (lastName.error === true) flag = false;
        else if (contactNumber.name.length === 0) flag = false;
        else if (contactNumber.error === true) flag = false;
        else if (email.name.length === 0) flag = false;
        else if (email.error === true) flag = false;
        else if (state.error === true) flag = true;
        else if (state.value.length === 0) flag = true;
        else if (city.error === true) flag = true;
        else if (city.value.length === 0) flag = true;
        else if (county.error === true) flag = true;
        else if (county.value.length === 0) flag = true;
        else if (addressLine1.error === true) flag = true;
        else if (addressLine1.text.length === 0) flag = true;
        else if (zipCode.error === true) flag = true;
        else if (zipCode.text.length === 0) flag = true;
        else flag = false;
        setDisable(flag);
    }, [state, city, county, addressLine1, zipCode, firstName, lastName, contactNumber, email]);

    return (
        <Container>
            <Row>
                <Col>
                    <Heading
                        text="Delivery Details"
                        className="text-center margin-global-top-3"
                    />
                </Col>
            </Row>
            <Row>
                <Form onSubmit={onSubmit} className="form-style margin-global-top-1">
                    <input
                        type="password"
                        autoComplete="on"
                        value=""
                        style={{ display: 'none' }}
                        readOnly={true}
                    />
                    <Row className="justify-content-between">
                        <Form.Group className="form-group-rght" as={Col} md={6} controlId="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={changeFirstName}
                                onBlur={changeFirstName}
                                value={firstName.name}
                            />
                            <div className="error-text">{firstName.errorText}</div>
                        </Form.Group>
                        <div className="margin-global-top-2 unhide-768" />
                        <Form.Group className="form-group-lft" as={Col} md={6} controlId="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={changeLastName}
                                onBlur={changeLastName}
                                value={lastName.name}
                            />
                            <div className="error-text">{lastName.errorText}</div>
                        </Form.Group>
                    </Row>
                    <div className="margin-global-top-2" />
                    <Row className="justify-content-between">
                        <Form.Group className="form-group-rght" as={Col} md={6} controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                onChange={changeEmail}
                                onBlur={changeEmail}
                                value={email.name}
                            />
                            <div className="error-text">{email.errorText}</div>
                        </Form.Group>
                        <div className="margin-global-top-2 unhide-768" />
                        <Form.Group className="form-group-rght" as={Col} md={6} controlId="contactNumber">
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={changeContactNumber}
                                onBlur={changeContactNumber}
                                value={contactNumber.name}
                            />
                            <div className="error-text">{contactNumber.errorText}</div>
                        </Form.Group>
                    </Row>
                    <div className="margin-global-top-2" />
                    <Row className="justify-content-between">
                        <Form.Group as={Col} md={6} controlId="state">
                            <Form.Label>State</Form.Label>
                            <AsyncTypeahead
                                filterBy={filterByState}
                                isLoading={stateLoading}
                                id="state"
                                labelKey="name"
                                minLength={2}
                                onSearch={handleStateSearch}
                                inputProps={{
                                    readOnly: state.readOnly,
                                }}
                                onChange={changeState}
                                options={stateList}
                                selected={state.value}
                                renderMenuItemChildren={(option, props) => (
                                    <Fragment>
                                        <span>{option.name}</span>
                                    </Fragment>
                                )}
                            />
                            <div className="error-text">{state.errortext}</div>
                        </Form.Group>
                        <div className="margin-global-top-2 unhide-768" />
                        <Form.Group as={Col} md={6} controlId="addressLine1">
                            <Form.Label>Address Line 1</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={handleAddressLine1}
                                onBlur={handleAddressLine1}
                                value={addressLine1.text}
                            />
                            <div className="error-text">{addressLine1.errorText}</div>
                        </Form.Group>
                    </Row>
                    <div className="margin-global-top-2" />
                    <Row className="justify-content-between">
                        <Form.Group as={Col} md={6} controlId="city">
                            <Form.Label>City</Form.Label>
                            <AsyncTypeahead
                                filterBy={filterByCity}
                                isLoading={cityLoading}
                                id="city"
                                labelKey="name"
                                minLength={2}
                                onSearch={handleCitySearch}
                                inputProps={{
                                    readOnly: city.readOnly,
                                }}
                                onChange={changeCity}
                                options={cityList}
                                selected={city.value}
                                renderMenuItemChildren={(option, props) => (
                                    <Fragment>
                                        <span>{option.name}</span>
                                    </Fragment>
                                )}
                            />
                            <div className="error-text">{city.errortext}</div>
                        </Form.Group>
                        <div className="margin-global-top-2 unhide-768" />
                        <Form.Group as={Col} md={6} controlId="addressLine2">
                            <Form.Label>Address Line 2 [Optional]</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={handleAddressLine2}
                                onBlur={handleAddressLine2}
                                value={addressLine2.text}
                            />
                        </Form.Group>
                    </Row>
                    <div className="margin-global-top-2" />
                    <Row className="justify-content-between">
                        <Form.Group as={Col} md={6} controlId="county">
                            <Form.Label>County</Form.Label>
                            <AsyncTypeahead
                                filterBy={filterByCounty}
                                isLoading={countyLoading}
                                id="county"
                                labelKey="name"
                                minLength={2}
                                onSearch={handleCountySearch}
                                inputProps={{
                                    readOnly: county.readOnly,
                                }}
                                onChange={changeCounty}
                                options={countyList}
                                selected={county.value}
                                renderMenuItemChildren={(option, props) => (
                                    <Fragment>
                                        <span>{option.name}</span>
                                    </Fragment>
                                )}
                            />
                            <div className="error-text">{county.errortext}</div>
                        </Form.Group>
                        <div className="margin-global-top-2 unhide-768" />
                        <Form.Group as={Col} md={6} controlId="landmark">
                            <Form.Label>Nearest Landmark [Optional]</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={handleLandmark}
                                onBlur={handleLandmark}
                                value={landmark.text}
                            />
                        </Form.Group>
                    </Row>
                    <div className="margin-global-top-2" />
                    <Row className="justify-content-between">
                        <Form.Group className="form-group-rght" as={Col} md={6} controlId="zipCode">
                            <Form.Label>Zip Code</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={changeZipCode}
                                onBlur={changeZipCode}
                                value={zipCode.name}
                            />
                            <div className="error-text">{zipCode.errorText}</div>
                        </Form.Group>
                    </Row>
                    <div className="margin-global-top-2" />
                    <Row className="justify-content-center">
                        <Button disabled={disable} type="submit">
                            Submit
                        </Button>
                    </Row>
                </Form>
            </Row>
        </Container>
    );
}

export default Delivery;