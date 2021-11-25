import React, { useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import api from '../../../api';
import { DescriptionText, Heading, LinkButton } from '../../../components';
import UserContext from '../../../contexts/userContext';
import './DashboardHome.scss';

function DashboardHome(props) {
    const user = useContext(UserContext);

    const logout = async e => {
        e.preventDefault();
        try {
            const response = await fetch(`${api}/user/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                withCredentials: true,
            });
            const content = await response.json();
            const { displayName, email, emailVerified, admin } = content.data;
            // history.push('/');
            user.setUserState({ displayName, email, emailVerified, admin });
        } catch (error) {
            alert("Error logging out. Please contact support.")
        }
    }

    return (
        <Container style={{ boxShadow: 'none' }} className="dashboard-about box-shadow-dashboard" fluid>
            <Row>
                <Col>
                    <Heading
                        text={`Hello ${props.ownerFirstName}!`}
                        classes="text-left"
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <DescriptionText
                        text={`We hope you are having a great day!`}
                        link=""
                        to="/"
                        classes="text-left"
                    />
                </Col>
            </Row>
            <Row className="margin-global-top-2">
                <LinkButton
                    to="/"
                    text="Sign Out"
                    className="text-uppercase width-high horizontal-center-relative"
                    onClick={logout}
                    id=""
                />
            </Row>
        </Container>
    );
}

export default DashboardHome;