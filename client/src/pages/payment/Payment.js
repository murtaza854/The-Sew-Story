import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Heading, FormText } from '../../components';
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
            <div className="margin-global-top-2" />
            <Row>
                <Col>
                    <FormText
                        text="Error. Please contact support."
                        link=""
                        to="/"
                        classes="text-center"
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default Payment;