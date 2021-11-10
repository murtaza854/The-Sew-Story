import React, { useState, useEffect, Fragment, useContext } from 'react';
import { Col, Container, Row, Button, Form } from 'react-bootstrap';
import api from '../../api';
import { Heading } from '../../components';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import './Delivery.scss';
import { useHistory } from 'react-router';
import UserContext from '../../contexts/userContext';
import CartCountContext from '../../contexts/cartCountContext';

function Delivery(props) {
    const user = useContext(UserContext);
    const cartCountContext = useContext(CartCountContext);
    const history = useHistory();

    useEffect(() => {
        if (!user.userState) history.push('/login');
        else if (cartCountContext.cartCount <= 0) history.push('/cart');
    }, [history, user.userState, cartCountContext]);

    const [disable, setDisable] = useState(true);

    const [state, setState] = useState({ value: [], error: false, errortext: '', readOnly: false });
    const [stateList, setStateList] = useState([]);
    const [stateLoading, setStateLoading] = useState(false);

    const [city, setCity] = useState({ value: [], error: false, errortext: '', readOnly: true });
    const [cityList, setCityList] = useState([]);
    const [cityLoading, setCityLoading] = useState(false);

    const [area, setArea] = useState({ value: [], error: false, errortext: '', readOnly: true });
    const [areaList, setAreaList] = useState([]);
    const [areaLoading, setAreaLoading] = useState(false);

    const [addressLine1, setAddressLine1] = useState({ text: '', error: false, errorText: '' });
    const [addressLine2, setAddressLine2] = useState({ text: '' });
    const [landmark, setLandmark] = useState({ text: '' });

    const changeState = async array => {
        if (array.length === 0) {
            setState({ value: array, error: true, errortext: 'State is required!', readOnly: false });
            setCity({ value: [], error: false, errortext: '', readOnly: true });
            setArea({ value: [], error: false, errortext: '', readOnly: true });
        }
        else {
            setState({ value: array, error: false, errortext: '', readOnly: false });
            setCity({ value: [], error: false, errortext: '', readOnly: false });
            setArea({ value: [], error: false, errortext: '', readOnly: true });
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
            setArea({ value: [], error: false, errortext: '', readOnly: false });
        }
        else {
            setCity({ value: array, error: false, errortext: '', readOnly: false });
            setArea({ value: [], error: false, errortext: '', readOnly: false });
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

    const changeArea = async array => {
        if (array.length === 0) setArea({ value: array, error: true, errortext: 'Area is required!', readOnly: false });
        else setArea({ value: array, error: false, errortext: '', readOnly: false });
    }
    const handleAreaSearch = async (query) => {
        setAreaLoading(true);
        setAreaList([]);
        const response = await fetch(`${api}/area/get-areas-search?areaText=${query}&cities=${JSON.stringify(city.value)}`, {
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
            setAreaList(content.data);
            setAreaLoading(false);
        }, 1000)
    };
    const filterByArea = () => true;

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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const onSubmit = e => {
        e.preventDefault();
        // console.log(logo.picturePreview);
        localStorage.setItem('delivery', JSON.stringify({
            state: state.value,
            city: city.value,
            area: area.value,
            addressLine1: addressLine1.text,
            addressLine2: addressLine2.text,
            landmark: landmark.text,
        }));
        history.push('/payment');
    }

    useEffect(() => {
        let flag = true;
        if (state.error === true) flag = true;
        else if (state.value.length === 0) flag = true;
        else if (city.error === true) flag = true;
        else if (city.value.length === 0) flag = true;
        else if (area.error === true) flag = true;
        else if (area.value.length === 0) flag = true;
        if (addressLine1.error === true) flag = true;
        else if (addressLine1.text.length === 0) flag = true;
        else flag = false;
        setDisable(flag);
    }, [state, city, area, addressLine1]);

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
                        <Form.Group as={Col} md={6} controlId="area">
                            <Form.Label>Area</Form.Label>
                            <AsyncTypeahead
                                filterBy={filterByArea}
                                isLoading={areaLoading}
                                id="area"
                                labelKey="name"
                                minLength={2}
                                onSearch={handleAreaSearch}
                                inputProps={{
                                    readOnly: area.readOnly,
                                }}
                                onChange={changeArea}
                                options={areaList}
                                selected={area.value}
                                renderMenuItemChildren={(option, props) => (
                                    <Fragment>
                                        <span>{option.name}</span>
                                    </Fragment>
                                )}
                            />
                            <div className="error-text">{area.errortext}</div>
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