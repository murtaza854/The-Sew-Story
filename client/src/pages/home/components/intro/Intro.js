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
                            text="The proceeds from every sale will be directly allotted to the designer so that she can make a fair living wage to emerge with confidence from the strife of poverty."
                            className="margin-global-top-6"
                        />
                    </Row>
                    {/* </div> */}
                </Col>
                <Col lg={4}>
                    <Row>
                        <img src="/image.jpeg" alt="Test" />
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
                    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                    className="margin-global-top-3"
                />
            </Row>
        </Container>
    );
}

export default Intro;