import {Col, Container, Jumbotron, Row} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import React from "react";

export function MyHome (props) {
    return(
        <Container style={{marginTop:30, marginBottom:30}}>
            <Row>
                <Col sm={3} style={{marginBottom:30}}>
                    <LinkContainer to="/ActivityList" >
                        <button onClick={() => props.onClickActivityList()}>
                            <Jumbotron style={{margin:0}}>
                                <h2>My Questions & Answers</h2>
                            </Jumbotron>
                        </button>
                    </LinkContainer>
                </Col>
                <Col sm={3} style={{marginBottom:30}}>
                    <LinkContainer to="/ActivityStatistics" >
                        <button onClick={() => props.onClickActivityStatistics()}>
                            <Jumbotron style={{margin:0}}>
                                <h2>My Activity per day/month</h2>
                            </Jumbotron>
                        </button>
                    </LinkContainer>
                </Col>
                <Col sm={3} style={{marginBottom:30}}>
                    <LinkContainer to="/CreateQuestion" >
                        <button onClick={() => props.onClickCreateQuestion()}>
                            <Jumbotron style={{margin:0}}>
                                <h2>Ask a Question</h2>
                            </Jumbotron>
                        </button>
                    </LinkContainer>
                </Col>
                <Col sm={3}>
                    <LinkContainer to="/AnswerQuestion" >
                        <button onClick={() => props.onClickAnswerQuestion()}>
                            <Jumbotron style={{margin:0}}>
                                <h2>Answer a Question</h2>
                            </Jumbotron>
                        </button>
                    </LinkContainer>
                </Col>
            </Row>
        </Container>
    );
}
