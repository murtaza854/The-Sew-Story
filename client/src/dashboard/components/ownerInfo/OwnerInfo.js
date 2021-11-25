import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import api from '../../../api';
import { DescriptionText, Heading } from '../../../components';
import UserContext from '../../../contexts/userContext';
import './OwnerInfo.scss';

function OwnerInfo(props) {
    const user = useContext(UserContext);

    const [firstName, setFirstName] = useState({ name: props.ownerFirstName, errorText: '', error: false });
    const [lastName, setLastName] = useState({ name: props.ownerLastName, errorText: '', error: false });

    const [disable, setDisable] = useState(false);

    const [message, setMessage] = useState({ display: false, text: '' });
    const [edit, setEdit] = useState(false);

    const changeFirstName = event => {
        if (event.target.value === '') setFirstName({ name: event.target.value, errorText: 'First name is required!', error: true });
        else setFirstName({ name: event.target.value, errorText: '', error: false });
    }
    const changeLastName = event => {
        if (event.target.value === '') setLastName({ name: event.target.value, errorText: 'Last name is required!', error: true });
        else setLastName({ name: event.target.value, errorText: '', error: false });
    }

    const onSubmit = async e => {
        e.preventDefault();
        setDisable(true);
        try {
            const response = await fetch(`${api}/user/change-owner-info`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-store'
                },
                credentials: 'include',
                withCredentials: true,
                body: JSON.stringify({ firstName: firstName.name, lastName: lastName.name }),
            });
            const content = await response.json();
            if (content.check) {
                const { displayName, email, emailVerified, admin } = content.data;
                user.setUserState({ displayName, email, emailVerified, admin });
                setEdit(false);
                setMessage({ display: true, text: 'User information changed successfully.' })
                setTimeout(() => {
                    setMessage({ display: false, text: '' });
                }, 5000);
            } else throw new Error("Error");
        } catch (error) {
            setMessage({ display: true, text: 'Error editing user information. Please try again later.' })
            setTimeout(() => {
                setMessage({ display: false, text: '' });
            }, 5000);
        }
    };

    const startCancelEdit = e => {
        e.preventDefault();
        setEdit(!edit);
    }

    useEffect(() => {
        let flag = true;
        if (firstName.error === true) flag = true;
        else if (firstName.name.length === 0) flag = true;
        else if (lastName.error === true) flag = true;
        else if (lastName.name.length === 0) flag = true;
        else flag = false;
        setDisable(flag);
    }, [firstName, lastName]);

    return (
        <Container className="dashboard-about box-shadow-dashboard" fluid>
            <Row>
                <Col>
                    <Heading
                        text="Profile"
                        classes="text-left"
                    />
                </Col>
            </Row>
            {
                edit ? (
                    <Row>
                        <Form onSubmit={onSubmit} className="form-style margin-global-top-1">
                            <Row className="justify-content-between">
                                <Form.Group as={Col} md={6} controlId="firstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        onChange={changeFirstName}
                                        onBlur={changeFirstName}
                                        value={firstName.name}
                                    />
                                    <div className="error-text">{firstName.errorText}</div>
                                </Form.Group>
                                <Form.Group as={Col} md={6} controlId="lastName">
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
                            <div className="margin-global-top-1" />
                            <Row className="justify-content-center">
                                <Button disabled={disable} type="submit">
                                    Submit
                                </Button>
                                <Button onClick={startCancelEdit} type="text">
                                    Cancel
                                </Button>
                            </Row>
                        </Form>
                    </Row>
                ) : (
                    <>
                        <Row>
                            <Form.Group as={Col} md={6}>
                                <Form.Label className="bold-600">First Name</Form.Label>
                                <p className="content-read">{props.ownerFirstName}</p>
                            </Form.Group>
                            <Form.Group as={Col} md={6}>
                                <Form.Label className="bold-600">Last Name</Form.Label>
                                <p className="content-read">{props.ownerLastName}</p>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form onSubmit={startCancelEdit} className="form-style margin-global-top-1">
                                <Row className="justify-content-center">
                                    <Button type="text">
                                        Edit
                                    </Button>
                                </Row>
                                {
                                    message.display ? (
                                        <Row className="margin-global-top-1">
                                            <Col>
                                                <DescriptionText
                                                    text={message.text}
                                                    link=""
                                                    to="/"
                                                    classes="text-center"
                                                />
                                            </Col>
                                        </Row>
                                    ) : null
                                }
                            </Form>
                        </Row>
                    </>
                )
            }
        </Container>
    );
}

export default OwnerInfo;