import React, { useState, useEffect } from 'react';
import { Container, Form, Row, Button, Col } from 'react-bootstrap';
import api from '../../../../api';
import { DescriptionText } from '../../../../components';

function EmailForm(props) {
    const [email, setEmail] = useState({ name: '', errorText: '', error: false });

    const [disable, setDisable] = useState(false);

    const [message, setMessage] = useState({ display: false, text: '' });

    const changeEmail = event => {
        const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (event.target.value === '') setEmail({ name: '', errorText: 'Email address is required!', error: true });
        else if (!event.target.value.match(mailformat)) setEmail({ name: event.target.value, errorText: 'Please enter a valid email address!', error: true });
        else setEmail({ name: event.target.value, errorText: '', error: false });
    }

    const onSubmit = async e => {
        e.preventDefault();
        setDisable(true);
        setEmail({ name: '', errorText: '', error: false });
        try {
            const response = await fetch(`${api}/user/subscribe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-store'
                },
                body: JSON.stringify({ email: email.name, subscribed: true }),
            });
            const content = await response.json();
            if (content.data) {
                setMessage({ display: true, text: 'Thankyou for Subscribing.' })
                setTimeout(() => {
                    setMessage({ display: false, text: '' });
                }, 5000);
            } else throw new Error("Error");
        } catch (error) {
            setMessage({ display: true, text: 'Error subscribing. Please try again later.' })
            setTimeout(() => {
                setMessage({ display: false, text: '' });
            }, 5000);
        }
    };

    useEffect(() => {
        let flag = true;
        if (email.error === true) flag = true;
        else if (email.name.length === 0) flag = true;
        else flag = false;
        setDisable(flag);
    }, [email]);

    return (
        <Container className="email-form">
            <Row>
                <Form onSubmit={onSubmit} className="form-style">
                    <input
                        type="password"
                        autoComplete="on"
                        value=""
                        style={{ display: 'none' }}
                        readOnly={true}
                    />
                    <Row className="justify-content-center">
                        <Form.Group as={Col} md={6} controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                onChange={changeEmail}
                                value={email.name}
                            />
                            <div className="error-text">{email.errorText}</div>
                        </Form.Group>
                    </Row>
                    <div className="margin-global-top-2" />
                    <Row className="justify-content-center">
                        <Button disabled={disable} type="submit">
                            Subscribe
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
                                        className="text-center bold-300"
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

export default EmailForm;