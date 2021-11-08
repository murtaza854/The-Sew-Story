import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import api from '../../../api';
import { DescriptionText, Heading } from '../../../components';
import './ChangePassword.scss';

function ChangePassword(props) {
    const [oldPassword, setOldPassword] = useState({ name: '', errorText: '', error: false, showPassword: false });
    const [password, setPassword] = useState({ name: '', errorText: '', error: false, showPassword: false });
    const [confirmPassword, setConfirmPassword] = useState({ name: '', errorText: '', error: false, showPassword: false });

    const [disable, setDisable] = useState(false);

    const [message, setMessage] = useState({ display: false, text: '' });

    const changeOldPassword = event => {
        setOldPassword(prevState => ({ ...prevState, name: event.target.value }));
    }

    const handleClickShowOldPassword = _ => {
        setOldPassword(prevState => ({ ...prevState, showPassword: !oldPassword.showPassword }));
    }
    const handleMouseDownOldPassword = event => {
        event.preventDefault();
    }

    const handleClickShowPassword = _ => {
        setPassword(prevState => ({ ...prevState, showPassword: !password.showPassword }));
    }
    const handleMouseDownPassword = event => {
        event.preventDefault();
    }
    const changePassword = event => {
        const { value } = event.target;
        const passwReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
        setPassword(prevState => ({ ...prevState, name: value }));
        if (!value.match(passwReg)) setPassword(prevState => ({ ...prevState, errorText: 'Password must contain atleast 1 lowercase alhpabetical character, atleast 1 uppercase alhpabetical character, atleast 1 numericical character, 1 special character and must be of atleast 8 characters', error: true }));
        else setPassword(prevState => ({ ...prevState, errorText: '', error: false }));
    }
    const handleClickShowConfirmPassword = _ => {
        setConfirmPassword(prevState => ({ ...prevState, showPassword: !confirmPassword.showPassword }));
    }
    const handleMouseDownConfirmPassword = event => {
        event.preventDefault();
    }
    const changeConfirmPassword = event => {
        setConfirmPassword(prevState => ({ ...prevState, name: event.target.value }));
    }

    const onSubmit = async e => {
        e.preventDefault();
        setDisable(true);
        setOldPassword({ name: '', errorText: '', error: false, showPassword: false });
        setPassword({ name: '', errorText: '', error: false, showPassword: false });
        setConfirmPassword({ name: '', errorText: '', error: false, showPassword: false });
        try {
            const response = await fetch(`${api}/startup/change-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-store'
                },
                body: JSON.stringify({ oldPassword: oldPassword.name, password: password.name }),
            });
            const content = await response.json();
            if (content.data) {
                setMessage({ display: true, text: 'Your password has been changed successfully.' })
                setTimeout(() => {
                    setMessage({ display: false, text: '' });
                }, 5000);
            } else throw new Error("Error");
        } catch (error) {
            setMessage({ display: true, text: 'Error changing password. Please try again later.' })
            setTimeout(() => {
                setMessage({ display: false, text: '' });
            }, 5000);
        }
    };

    useEffect(() => {
        let flag = true;
        if (password.error === true) flag = true;
        else if (password.name.length === 0) flag = true;
        else flag = false;
        setDisable(flag);
    }, [password]);

    return (
        <Container className="dashboard-about box-shadow-dashboard" fluid>
            <Row>
                <Col>
                    <Heading
                        text="Change Password"
                        classes="text-left"
                    />
                </Col>
            </Row>
            <Row>
                <Form onSubmit={onSubmit} className="form-style margin-global-top-2">
                    <input
                        type="password"
                        autoComplete="on"
                        value=""
                        style={{ display: 'none' }}
                        readOnly={true}
                    />
                    <Row className="justify-content-center">
                        <Form.Group as={Col} md={6} controlId="password">
                            <Form.Label>Old Password</Form.Label>
                            <InputGroup size="lg">
                                <Form.Control
                                    type={oldPassword.showPassword ? 'text' : 'password'}
                                    onChange={changeOldPassword}
                                    value={oldPassword.name}
                                />
                                <InputGroup.Text>
                                    {
                                        oldPassword.showPassword ? (
                                            <IoMdEye
                                                onClick={handleClickShowOldPassword}
                                                onMouseDown={handleMouseDownOldPassword}
                                                className="icon" />
                                        ) : (
                                            <IoMdEyeOff
                                                onClick={handleClickShowOldPassword}
                                                onMouseDown={handleMouseDownOldPassword}
                                                className="icon" />
                                        )
                                    }
                                </InputGroup.Text>
                            </InputGroup>
                            <div className="error-text">{oldPassword.errorText}</div>
                        </Form.Group>
                    </Row>
                    <div className="margin-global-top-2" />
                    <Row className="justify-content-between">
                        <Form.Group className="form-group-right" as={Col} md={6} controlId="password">
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
                        <div className="margin-global-top-2 unhide-768" />
                        <Form.Group className="form-group-left" as={Col} md={6} controlId="confirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <InputGroup size="lg">
                                <Form.Control
                                    type={confirmPassword.showPassword ? 'text' : 'password'}
                                    onChange={changeConfirmPassword}
                                    value={confirmPassword.name}
                                />
                                <InputGroup.Text>
                                    {
                                        confirmPassword.showPassword ? (
                                            <IoMdEye
                                                onClick={handleClickShowConfirmPassword}
                                                onMouseDown={handleMouseDownConfirmPassword}
                                                className="icon" />
                                        ) : (
                                            <IoMdEyeOff
                                                onClick={handleClickShowConfirmPassword}
                                                onMouseDown={handleMouseDownConfirmPassword}
                                                className="icon" />
                                        )
                                    }
                                </InputGroup.Text>
                            </InputGroup>
                            <div className="error-text">{confirmPassword.errorText}</div>
                        </Form.Group>
                    </Row>
                    <div className="margin-global-top-2" />
                    <Row className="justify-content-center">
                        <Button disabled={disable} type="submit">
                            Confirm
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
        </Container>
    );
}

export default ChangePassword;