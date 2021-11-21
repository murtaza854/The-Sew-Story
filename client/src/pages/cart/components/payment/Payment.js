import React from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { Heading } from '../../../../components';
// import { useHistory } from 'react-router';
// import CartCountContext from '../../contexts/cartCountContext';
// import UserContext from '../../contexts/userContext';
import './Payment.scss';

function Payment(props) {
    // const user = useContext(UserContext);
    // const cartCountContext = useContext(CartCountContext);
    // const history = useHistory();

    // useEffect(() => {
    //     if (!user.userState) history.push('/login');
    //     else if (cartCountContext.cartCount <= 0) history.push('/cart');
    // }, [history, user.userState, cartCountContext]);

    return (
        <Container className="mt-5">
            <Row>
                <Col>
                    <Heading
                        text="Choose Payment Method"
                        className="text-center margin-global-top-3"
                    />
                </Col>
            </Row>
            <Row>
                <Form className="form-style margin-global-top-1">
                    <div className="mb-3">
                        <Form.Check
                            inline
                            label="Debit/Credit Card"
                            name="group1"
                            type="checkbox"
                            id="inline-checkbox-1"
                            value="Debit/Credit Card"
                            checked={true}
                            onChange={() => {}}
                        />
                        {/* <Form.Check
                            inline
                            label="2"
                            name="group1"
                            type="radio"
                            id="inline-radio-2"
                        />
                        <Form.Check
                            inline
                            disabled
                            label="3 (disabled)"
                            type="radio"
                            id="inline-radio-3"
                        /> */}
                    </div>
                </Form>
            </Row>
            {/* <Row>
                <Col>
                    <FormText
                        text="Error. Please contact support."
                        link=""
                        to="/"
                        classes="text-center"
                    />
                </Col>
            </Row> */}
        </Container>
    );
}

export default Payment;