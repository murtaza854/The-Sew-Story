import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
// import { AiOutlineClose } from "react-icons/ai";
import './Sidebar.scss';

function Sidebar(props) {

    // const onClickHamburger = () => {
    //     const sidebar = document.getElementById('client-sidebar');
    //     const check = sidebar.classList.contains('client-sidebar-closed');
    //     const notActive = sidebar.classList.contains('client-sidebar-not-active');
    //     if (notActive) {
    //         sidebar.classList.remove('client-sidebar-not-active');
    //         sidebar.classList.add('client-sidebar-open');
    //     } else {
    //         if (check) {
    //             sidebar.classList.remove('client-sidebar-closed');
    //             sidebar.classList.add('client-sidebar-open');
    //         } else {
    //             sidebar.classList.add('client-sidebar-closed');
    //             sidebar.classList.remove('client-sidebar-open');
    //         }
    //     }
    // }

    useEffect(() => {
        document.addEventListener('click', function (event) {
            const isClickInsideSidebar = document.getElementById('client-sidebar').contains(event.target);
            const isClickInsideHamburger = document.getElementById('client-sidebar-hamburger').contains(event.target);

            if (!isClickInsideSidebar && !isClickInsideHamburger) {
                //the click was outside the specifiedElement, do something
                const sidebar = document.getElementById('client-sidebar');
                const check = sidebar.classList.contains('client-sidebar-open');
                if (check) {
                    sidebar.classList.remove('client-sidebar-open');
                    sidebar.classList.add('client-sidebar-closed');
                }
            }
        });
    }, []);

    return (
        <Container id="client-sidebar" className="client-sidebar client-sidebar-not-active" fluid>
            {/* <Row className="top-row">
                <Col>
                    <AiOutlineClose style={{ fontSize: '2rem' }} onClick={onClickHamburger} />
                </Col>
            </Row> */}
            <Row className="top-row">
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
                    <Link to="/our-story">
                        Our Story
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