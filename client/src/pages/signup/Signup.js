import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Form, InputGroup, Row, Button } from 'react-bootstrap';
import { Heading, FormText } from '../../components';
import api from '../../api';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { useHistory } from 'react-router';
import './Signup.scss';
import UserContext from '../../contexts/userContext';

function Signup(props) {
    const history = useHistory();
    const user = useContext(UserContext);

    useEffect(() => {
        if (user.userState) history.push('/');
    }, [history, user.userState]);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = `Sign Up | The Sew Story`;
    }, []);

    const [firstName, setFirstName] = useState({ name: '', errorText: '', error: false });
    const [lastName, setLastName] = useState({ name: '', errorText: '', error: false });
    const [email, setEmail] = useState({ name: '', errorText: '', error: false });
    const [password, setPassword] = useState({ name: '', errorText: '', error: false, showPassword: false });
    const [confirmPassword, setConfirmPassword] = useState({ name: '', errorText: '', error: false, showPassword: false });

    const [disable, setDisable] = useState(true);

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
        try {
            const response = await fetch(`${api}/user/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-store'
                },
                body: JSON.stringify({ firstName, lastName, email, password }),
            });
            const content = await response.json();
            if (content.data) history.push("/__/auth/action?mode=accountCreation");
            else if (content.error.code === 'auth/email-already-in-use') alert(content.error.message);
            else alert("Error creating account, please contact support if this issue persists.");
        } catch (error) {
            alert("Error creating account, please contact support if this issue persists.");
        }
    };

    useEffect(() => {
        let flag = true;
        if (firstName.error === true) flag = true;
        else if (firstName.name.length === 0) flag = true;
        else if (lastName.error === true) flag = true;
        else if (lastName.name.length === 0) flag = true;
        else if (email.error === true) flag = true;
        else if (email.name.length === 0) flag = true;
        else if (password.error === true) flag = true;
        else if (password.name.length === 0) flag = true;
        else if (confirmPassword.error === true) flag = true;
        else if (confirmPassword.name.length === 0) flag = true;
        else flag = false;
        setDisable(flag);
    }, [firstName, lastName, email, password, confirmPassword]);

    useEffect(() => {
        (
            () => {
                if (confirmPassword.name !== password.name) setConfirmPassword(prevState => ({ ...prevState, errorText: 'Password does not match', error: true }));
                else setConfirmPassword(prevState => ({ ...prevState, errorText: '', error: false }));
            })();
    }, [confirmPassword.name, password.name]);

    return (
        <Container>
            <Row>
                <Col>
                    <Heading
                        text="Signup"
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
                    </Row>
                    <div className="margin-global-top-2" />
                    <Row className="justify-content-between">
                        <Form.Group className="form-group-ight" as={Col} md={6} controlId="password">
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
                        <Form.Group className="form-group-lft" as={Col} md={6} controlId="confirmPassword">
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
                            Signup
                        </Button>
                    </Row>
                    <div className="margin-global-top-2" />
                    <Row>
                        <Col>
                            <FormText
                                text="Already have an Account? Login"
                                link="HERE"
                                to="/login"
                                classes="text-center"
                            />
                        </Col>
                    </Row>
                </Form>
            </Row>
        </Container>
    );
}

export default Signup;