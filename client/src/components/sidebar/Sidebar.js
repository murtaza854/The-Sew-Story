import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import './Sidebar.scss';

function Sidebar(props) {

    const onClickHamburger = () => {
        const check = document.getElementById('client-sidebar').classList.contains('client-sidebar-closed');
        if (check) {
            document.getElementById('client-sidebar').classList.remove('client-sidebar-closed');
            document.getElementById('client-sidebar').classList.add('client-sidebar-open');
        } else {
            document.getElementById('client-sidebar').classList.add('client-sidebar-closed');
            document.getElementById('client-sidebar').classList.remove('client-sidebar-open');
        }
    }
    
    return (
        <Container id="client-sidebar" className="client-sidebar client-sidebar-closed" fluid>
            <Row className="top-row">
                <Col>
                    <AiOutlineClose style={{fontSize: '2rem'}} onClick={onClickHamburger} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Link to="/">
                        <img src="logo.png" alt="logo" className="logo" />
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Link to="/">
                        Home
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Link to="/about">
                        About
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Link to="/shop">
                        Shop
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Link to="/gallery">
                        Gallery
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Link to="/contact">
                        Contact Us
                    </Link>
                </Col>
            </Row>
        </Container>
    );
}

export default Sidebar;