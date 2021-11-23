import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Form, Row, Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import api from '../../api';
import { Heading, FormText } from '../../components';
import UserContext from '../../contexts/userContext';
import './ForgotPassword.scss';

function ForgotPassword(props) {
    const history = useHistory();
    const user = useContext(UserContext);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Forgot Password | The Sew Story';
    }, []);

    const [email, setEmail] = useState({ name: '', errorText: '', error: false });

    useEffect(() => {
        if (user.userState) {
            history.push('/');
        }
    }, [history, user.userState]);

    const changeEmail = event => {
        const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (event.target.value === '') setEmail({ name: '', errorText: 'Email address is required!', error: true });
        else if (!event.target.value.match(mailformat)) setEmail({ name: event.target.value, errorText: 'Please enter a valid email address!', error: true });
        else setEmail({ name: event.target.value, errorText: '', error: false });
    }

    const [disable, setDisable] = useState(true);

    useEffect(() => {
        let flag = true;
        if (email.name.length === 0) flag = true;
        else flag = false;
        setDisable(flag);
    }, [email]);

    const onSubmit = async e => {
        e.preventDefault();
        setDisable(true);
        try {
            await fetch(`${api}/user/send-password-reset-link`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-store'
                },
                body: JSON.stringify({ email: email.name }),
            });
            history.push("/__/auth/action?mode=sendResetLink");
        } catch (error) {
            alert("Error creating account, please contact support if this issue persists.");
        }
    };
    return (
        <Container>
            <div className="margin-global-top-5" />
            <Row>
                <Col>
                    <Heading
                        text="Forgot Password"
                        className="text-center margin-global-top-3"
                    />
                </Col>
            </Row>
            <Row>
                <Form onSubmit={onSubmit} className="form-style margin-global-top-1">
                    <Row className="justify-content-center">
                        <Form.Group as={Col} md={6} controlId="email">
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
                    <Row className="justify-content-center">
                        <Button disabled={disable} type="submit">
                            Submit
                        </Button>
                    </Row>
                    <div className="margin-global-top-2" />
                    <Row>
                        <Col>
                            <FormText
                                text="Please enter your email to search for your account."
                                link=""
                                to="/"
                                classes="text-center"
                            />
                        </Col>
                    </Row>
                </Form>
            </Row>
        </Container>
    );
}

export default ForgotPassword;