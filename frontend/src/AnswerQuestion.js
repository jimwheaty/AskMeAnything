import React from "react";
import {Alert, Button, ButtonGroup, Col, Container, Form, Row} from "react-bootstrap";
import {Question} from "./Question";
import {backend_url} from "./App";

export class AnswerQuestion extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            questionItems: [],
            success: false
        }
    }

    componentDidMount() {
        fetch(backend_url + "/api/questions")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        questionItems: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                })
    }

    submitAnswer() {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.props.access_token},
            body: JSON.stringify({body: this.props.newAnswerBody, questionId: this.props.questionActive})
        };
        fetch(backend_url + "/api/answers", requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.message)
                        this.setState({error: result})
                    else
                        this.setState({success: true})
                }
            )
    }

    render() {
        const {error, isLoaded, questionItems} = this.state;
        if (error) {
            return <Alert variant="danger">Error: {error.message}</Alert>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                (this.props.isSigned === false) ?
                    <Alert variant={'warning'}>
                        You have to sign in first !!!
                    </Alert>
                    :
                    <Row className="justify-content-md-center" style={{marginBottom: 30, marginTop: 30}}>
                        <Col sm={8}>
                            <h2>Answer a Question</h2>
                            <br/>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Choose Question Title</Form.Label>
                                    <Form.Control as="select" onChange={(e) => this.props.onQuestionLink(e)}>
                                        <option value="0">Choose...</option>
                                        {questionItems.map(item => (
                                            <option value={item.id}>{item.title}</option>
                                        ))}
                                    </Form.Control>
                                    <br/>
                                    <Question
                                        questionActive={this.props.questionActive}
                                        onClickTag={(e) => this.props.onClickTag(e)}
                                    />
                                    <br/>
                                    <Form.Label>Your Answer</Form.Label>
                                    <Form.Control as="textarea" rows={3} name="newAnswerBody" onChange={(e) => this.props.onChange(e)} />
                                    <br/>
                                    <ButtonGroup>
                                        <Button variant="primary" type="button" onClick={() => this.submitAnswer()}>Submit</Button>
                                        <Button variant="secondary" type="submit">Cancel</Button>
                                    </ButtonGroup>
                                </Form.Group>
                            </Form>
                            {
                                this.state.success ?
                                    <Alert variant="success">Thank you!</Alert>
                                    :
                                    <Container/>
                            }
                        </Col>
                    </Row>
            );
        }
    }
}
