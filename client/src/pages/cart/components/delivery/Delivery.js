import React from 'react';
import { Col, Container, Row, Form } from 'react-bootstrap';
// import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import './Delivery.scss';
// import { useHistory } from 'react-router';
// import CartCountContext from '../../../../contexts/cartCountContext';
// import api from '../../../../api';
import { Heading } from '../../../../components';

function Delivery(props) {
    // const user = useContext(UserContext);
    const {
        // firstName,
        // setFirstName,
        // lastName,
        // setLastName,
        email,
        setEmail,
        // contactNumber,
        // setContactNumber,
        // addressLine1,
        // setAddressLine1,
        // addressLine2,
        // setAddressLine2,
        // zipCode,
        // setZipCode,
        // state,
        // setState,
        // stateList,
        // setStateList,
        // stateLoading,
        // setStateLoading,
        // city,
        // setCity,
        // cityList,
        // cityLoading,
        // setCityList,
        // setCityLoading,
    } = props;
    // const history = useHistory();

    // const changeFirstName = event => {
    //     if (event.target.value === '') setFirstName({ name: event.target.value, errorText: 'First name is required!', error: true });
    //     else setFirstName({ name: event.target.value, errorText: '', error: false });
    // }
    // const changeLastName = event => {
    //     if (event.target.value === '') setLastName({ name: event.target.value, errorText: 'Last name is required!', error: true });
    //     else setLastName({ name: event.target.value, errorText: '', error: false });
    // }
    const changeEmail = event => {
        const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (event.target.value === '') setEmail({ name: '', errorText: 'Email address is required!', error: true });
        else if (!event.target.value.match(mailformat)) setEmail({ name: event.target.value, errorText: 'Please enter a valid email address!', error: true });
        else setEmail({ name: event.target.value, errorText: '', error: false });
    }

    // function formatPhoneNumber(phoneNumberString) {
    //     var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    //     var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    //     if (match) {
    //         var intlCode = (match[1] ? '+1 ' : '');
    //         return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    //     }
    //     return null;
    // }

    // const changeContactNumber = event => {
    //     const phoneNumber = formatPhoneNumber(event.target.value);
    //     if (phoneNumber === null) setContactNumber({ name: event.target.value, errorText: 'Please enter a valid phone number!', error: true });
    //     else setContactNumber({ name: phoneNumber, errorText: '', error: false });
    // }

    // const changeState = async array => {
    //     if (array.length === 0) {
    //         setState({ value: array, error: true, errortext: 'State is required!', readOnly: false });
    //         setCity({ value: [], error: false, errortext: '', readOnly: true });
    //     }
    //     else {
    //         setState({ value: array, error: false, errortext: '', readOnly: false });
    //         setCity({ value: [], error: false, errortext: '', readOnly: false });
    //     }
    // }
    // const handleStateSearch = async (query) => {
    //     setStateLoading(true);
    //     setStateList([]);
    //     const response = await fetch(`${api}/state/get-states-search?stateText=${query}`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Cache-Control': 'no-store'
    //         },
    //         credentials: 'include',
    //         withCredentials: true,
    //     });
    //     const content = await response.json();
    //     setTimeout(() => {
    //         setStateList(content.data);
    //         setStateLoading(false);
    //     }, 1000)
    // };
    // const filterByState = () => true;

    // const changeCity = async array => {
    //     if (array.length === 0) {
    //         setCity({ value: array, error: true, errortext: 'City is required!', readOnly: false });
    //     }
    //     else {
    //         setCity({ value: array, error: false, errortext: '', readOnly: false });
    //     }
    // }
    // const handleCitySearch = async (query) => {
    //     setCityLoading(true);
    //     setCityList([]);
    //     const response = await fetch(`${api}/city/get-cities-search?cityText=${query}&states=${JSON.stringify(state.value)}`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Cache-Control': 'no-store'
    //         },
    //         credentials: 'include',
    //         withCredentials: true,
    //     });
    //     const content = await response.json();
    //     setTimeout(() => {
    //         setCityList(content.data);
    //         setCityLoading(false);
    //     }, 1000)
    // };
    // const filterByCity = () => true;

    // const handleAddressLine1 = event => {
    //     if (event.target.value === '') setAddressLine1({ text: event.target.value, errorText: 'Address line 1 is required!', error: true });
    //     else setAddressLine1({ text: event.target.value, errorText: '', error: false });
    // }
    // const handleAddressLine2 = event => {
    //     setAddressLine2({ text: event.target.value });
    // }
    // const changeZipCode = event => {
    //     const zipCodeFormat = /^[0-9]{5}(?:-[0-9]{4})?$/;
    //     if (event.target.value === '') setZipCode({ text: event.target.value, errorText: 'Zip code is required!', error: true });
    //     else if (!event.target.value.match(zipCodeFormat)) setZipCode({ text: event.target.value, errorText: 'Please enter a valid zip code!', error: true });
    //     else setZipCode({ text: event.target.value, errorText: '', error: false });
    // }

    // useEffect(() => {
    //     window.scrollTo(0, 0);
    // }, []);
    // const onSubmit = e => {
    //     e.preventDefault();
    //     localStorage.setItem('delivery', JSON.stringify({
    //         state: state.value,
    //         city: city.value,
    //         county: county.value,
    //         addressLine1: addressLine1.text,
    //         addressLine2: addressLine2.text,
    //         landmark: landmark.text,
    //     }));
    //     history.push('/payment');
    // }

    return (
        <Container>
            <Row>
                <Col>
                    <Heading
                        text="Customer Email"
                        className="text-center margin-global-top-3"
                    />
                </Col>
            </Row>
            <Row>
                <Form className="form-style margin-global-top-1">
                    <input
                        type="password"
                        autoComplete="on"
                        value=""
                        style={{ display: 'none' }}
                        readOnly={true}
                    />
                    {/* <Row className="justify-content-between">
                        <Form.Group className="form-group-rght" as={Col} md={6} controlId="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                readOnly={firstName.readOnly}
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
                                readOnly={lastName.readOnly}
                                onChange={changeLastName}
                                onBlur={changeLastName}
                                value={lastName.name}
                            />
                            <div className="error-text">{lastName.errorText}</div>
                        </Form.Group>
                    </Row>
                    <div className="margin-global-top-2" /> */}
                    <Row className="justify-content-center">
                        <Form.Group className="form-group-rght" as={Col} md={6} controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                readOnly={email.readOnly}
                                onChange={changeEmail}
                                onBlur={changeEmail}
                                value={email.name}
                            />
                            <div className="error-text">{email.errorText}</div>
                        </Form.Group>
                        {/* <div className="margin-global-top-2 unhide-768" />
                        <Form.Group className="form-group-rght" as={Col} md={6} controlId="contactNumber">
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={changeContactNumber}
                                onBlur={changeContactNumber}
                                value={contactNumber.name}
                            />
                            <div className="error-text">{contactNumber.errorText}</div>
                        </Form.Group> */}
                    </Row>
                    {/* <div className="margin-global-top-2" /> */}
                    {/* <Row className="justify-content-between">
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
                    <Row className="justify-content-between">
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
                    </Row> */}
                    {/* <div className="margin-global-top-2" />
                    <Row className="justify-content-center">
                        <Button disabled={disable} type="submit">
                            Submit
                        </Button>
                    </Row> */}
                </Form>
            </Row>
        </Container>
    );
}

export default Delivery;