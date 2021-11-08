import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { DescriptionText } from '../../components'
import './StoryInfo.scss';

function StoryInfo(props) {
    return (
        <Container className={`story-info ${props.className}`}>
            <Row>
                {
                    props.order === 'imageFirst' ? (
                        <>
                            <Col className="order-change-2" lg={4}>
                                <img src={props.image} alt={props.title} />
                            </Col>
                            <Col className="order-change-1" lg={8}>
                                <DescriptionText
                                    text={props.description}
                                    className="center-relative-vertical padding-left"
                                />
                            </Col>
                        </>
                    ) : (
                        <>
                            <Col className="order-change-1" lg={8}>
                                <DescriptionText
                                    text={props.description}
                                    className="center-relative-vertical padding-right"
                                />
                            </Col>
                            <Col className="image-margin-top order-change-2" lg={4}>
                                <img src={props.image} alt={props.title} />
                            </Col>
                        </>
                    )
                }
            </Row>
        </Container>
    );
}

export default StoryInfo;