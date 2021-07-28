import React from "react";
import {Alert, Button, ButtonGroup, Col, Container, Form, InputGroup, Row} from "react-bootstrap";
import {backend_url} from "./App";

export class CreateQuestion extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            tagItems: [],
            success: false
        }
    }

    componentDidMount() {
        fetch(backend_url + "/api/stats/popular-tags")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        tagItems: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                })
    }

    submitQuestion() {
        let requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.props.access_token},
            body: JSON.stringify({title: this.props.newQuestionTitle, body: this.props.newQuestionBody})
        };
        fetch(backend_url + '/api/questions', requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.message)
                        this.setState({error: result})
                    else {
                        this.setState({success: true})
                        this.props.newQuestionTags['combined'].split(' ').forEach(item => {
                            requestOptions = {
                                method: 'POST',
                                headers: {'Content-Type': 'application/json'},
                                body: JSON.stringify({"field": item.split('#')[1], "questionId": result.id})
                            };
                            fetch(backend_url + '/api/tags', requestOptions)
                                .then(res => res.json())
                                .then(
                                    (result) => {
                                        if (result.message)
                                            this.setState({error: result, success: false})
                                        else
                                            this.setState({success: true})
                                    })
                        })
                    }
                }
            )

    }

    render() {
        const {error, isLoaded, tagItems} = this.state;
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
                    <Row className="justify-content-md-center"><Col sm={8}>
                        <h2>Ask a Question</h2>
                        <br/>
                        <Form>
                            <Form.Group>
                                <Form.Label>Question Title</Form.Label>
                                <Form.Control type="text" name="newQuestionTitle" onChange={(e) => this.props.onChange(e)}/>
                                <br/>
                                <Form.Label>Question Text</Form.Label>
                                <Form.Control as="textarea" name="newQuestionBody" rows={3} onChange={(e) => this.props.onChange(e)}/>
                                <br/>
                                <Form.Label>Choose #tags</Form.Label>
                                <Form.Control as="select" multiple onChange={(e) => this.props.onChangeTags(e)}>
                                    <option>Choose multiple...</option>
                                    {tagItems.map(item => (
                                        <option value={item.field}>#{item.field}</option>
                                    ))}
                                </Form.Control>
                                Create #tags
                                <InputGroup onChange={(e) => this.props.onChangeTags(e)}>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>#</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control />
                                </InputGroup>
                                <br/>
                                <Form.Control readOnly defaultValue={this.props.newQuestionTags['combined']} />
                                <br/>
                                <ButtonGroup>
                                    <Button variant="primary" type="button" onClick={() => this.submitQuestion()}>Submit</Button>
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
                    </Col></Row>
            );
        }
    }
}
