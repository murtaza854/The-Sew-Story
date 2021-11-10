import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Quote, LinkButton, DescriptionText } from '../../../../components';
import './Intro.scss';

function Intro(props) {
    return (
        <Container className="intro">
            <Row>
                <Col lg={6}>
                    {/* <div className="center-relative-vertical"> */}
                    <Row>
                        <Quote
                            firstLineNormal="From the Women of"
                            firstLineCursive="Pakistan"
                            secondLineNormal="To the Women of the"
                            secondLineCursive="World"
                            className="margin-global-top-13"
                        />
                        <Col>
                            <LinkButton
                                text="Our Story"
                                to="/our-story"
                                className="btn"
                            />
                        </Col>
                    </Row>
                    {/* <div className="margin-global-top-3" /> */}
                    <Row className="hide-992">
                        <DescriptionText
                            text="The Sew Story has become a Passion Project. Buying something at our store means buying something truly unique with a conscious mind to help sustain and empower a woman with mouths to feed and extraordinary skill of creating artistic handwork pieces. A percentage of all our sales would be invested back into the community to help improve the quality of life of these skilled women."
                            className="margin-global-top-6"
                        />
                    </Row>
                    {/* </div> */}
                </Col>
                <Col lg={4}>
                    <Row>
                        <Col>
                            <div className="slider1">
                                <img src="/image.jpeg" alt="Test" />
                                <img src="/Story/Story 1.jpg" alt="Test" />
                                <img src="/Story/Story 2.jpg" alt="Test" />
                            </div>
                        </Col>
                    </Row>
                    <Row className="margin-global-top-1">
                        <Col>
                            <div className="bottom-line center-relative-horizontal" />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className="unhide-992">
                <DescriptionText
                    text="The Sew Story has become a Passion Project. Buying something at our store means buying something truly unique with a conscious mind to help sustain and empower a woman with mouths to feed and extraordinary skill of creating artistic handwork pieces. A percentage of all our sales would be invested back into the community to help improve the quality of life of these skilled women."
                    className="margin-global-top-3"
                />
            </Row>
        </Container>
    );
}

export default Intro;