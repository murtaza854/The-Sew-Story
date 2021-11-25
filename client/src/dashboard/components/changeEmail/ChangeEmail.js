import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import api from '../../../api';
import { DescriptionText, Heading } from '../../../components';
import './ChangeEmail.scss';

function ChangeEmail(props) {
    const [oldEmail] = useState({ name: props.email, errorText: '', error: false });
    const [email, setEmail] = useState({ name: '', errorText: '', error: false });
    const [password, setPassword] = useState({ name: '', errorText: '', error: false, showPassword: false });

    const [disable, setDisable] = useState(false);

    const [message, setMessage] = useState({ display: false, text: '' });
    const [edit, setEdit] = useState(false);

    const handleClickShowPassword = _ => {
        setPassword(prevState => ({ ...prevState, showPassword: !password.showPassword }));
    }
    const handleMouseDownPassword = event => {
        event.preventDefault();
    }
    const changePassword = event => {
        setPassword(prevState => ({ ...prevState, name: event.target.value }));
    }

    const changeEmail = event => {
        const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (event.target.value === '') setEmail({ name: '', errorText: 'Email address is required!', error: true });
        else if (!event.target.value.match(mailformat)) setEmail({ name: event.target.value, errorText: 'Please enter a valid email address!', error: true });
        else setEmail({ name: event.target.value, errorText: '', error: false });
    }

    const onSubmit = async e => {
        e.preventDefault();
        setDisable(true);
        try {
            const response = await fetch(`${api}/user/change-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                withCreditials: true,
                body: JSON.stringify({ email: email.name, password: password.name }),
            });
            const content = await response.json();
            setEmail({ name: '', errorText: '', error: false });
            if (content.data) {
                setEdit(false);
                setMessage({ display: true, text: 'Please verify your new email to confirm the change.' })
                setTimeout(() => {
                    setMessage({ display: false, text: '' });
                }, 5000);
            } else throw new Error("Error");
        } catch (error) {
            setMessage({ display: true, text: 'Error changing email. Please try again later.' })
            setTimeout(() => {
                setMessage({ display: false, text: '' });
            }, 5000);
        }
    };

    const startCancelEdit = e => {
        e.preventDefault();
        setEdit(!edit);
        setEmail({ name: '', errorText: '', error: false });
    }

    useEffect(() => {
        let flag = true;
        if (email.error === true) flag = true;
        else if (email.name.length === 0) flag = true;
        else if (password.error === true) flag = true;
        else if (password.name.length === 0) flag = true;
        else flag = false;
        setDisable(flag);
    }, [email, password]);

    return (
        <Container className="dashboard-about box-shadow-dashboard" fluid>
            <Row>
                <Col>
                    <Heading
                        text="Change Email"
                        classes="text-left"
                    />
                </Col>
            </Row>
            {
                edit ? (
                    <Row>
                        <Form onSubmit={onSubmit} className="form-style margin-global-top-1">
                            <Row className="justify-content-between">
                                <Form.Group as={Col} md={6} controlId="oldEmail">
                                    <Form.Label>Current Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        readOnly={true}
                                        value={oldEmail.name}
                                    />
                                </Form.Group>
                                <div className="margin-global-top-2 unhide-768" />
                                <Form.Group as={Col} md={6} controlId="email">
                                    <Form.Label>New Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        onChange={changeEmail}
                                        onBlur={changeEmail}
                                        value={email.name}
                                    />
                                    <div className="error-text">{email.errorText}</div>
                                </Form.Group>
                            </Row>
                            <div className="margin-global-top-2" />
                            <Row className="justify-content-center">
                                <Form.Group as={Col} md={6} controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <InputGroup size="lg">
                                        <Form.Control
                                            type={password.showPassword ? 'text' : 'password'}
                                            onChange={changePassword}
                                            value={password.name}
                                        />
                                        <InputGroup.Text>
                                            {
                                                password.showPassword ? (
                                                    <IoMdEye
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        className="icon" />
                                                ) : (
                                                    <IoMdEyeOff
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        className="icon" />
                                                )
                                            }
                                        </InputGroup.Text>
                                    </InputGroup>
                                    <div className="error-text">{password.errorText}</div>
                                </Form.Group>
                            </Row>
                            <div className="margin-global-top-1" />
                            <Row>
                                <Col>
                                    <DescriptionText
                                        text="Type your password to confirm this change"
                                        link=""
                                        to="/"
                                        className="text-center small-font"
                                    />
                                </Col>
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
                            <Form.Group>
                                <Form.Label className="bold-600">Current Email</Form.Label>
                                <p className="content-read">{props.email}</p>
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
                                                    className="text-center small-font"
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

export default ChangeEmail;