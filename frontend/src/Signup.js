import React from "react";
import {Alert, Button, ButtonGroup, Col, Container, Form, Row} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {backend_url} from "./App";

export class Signup extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            success: false
        }
    }

    onSubmit() {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username: this.props.username, password: this.props.password, email: this.props.email})
        };
        fetch(backend_url + '/api/users', requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.error)
                        this.setState({error : result.message})
                    else
                        this.setState({success : true})
                }
            )
    }
    render() {
        const {error, success} = this.state;
        return (
            <Row className="justify-content-md-center" style={{marginBottom: 30, marginTop: 30}}>
                <Col sm={4}>
                    <h2>Sign Up</h2>
                    <br/>
                    <Form>
                        <Form.Group controlId="formBasicUsername" >
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" name="username" onChange={(e) => this.props.onChange(e)}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" onChange={(e) => this.props.onChange(e)}/>
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password" onChange={(e) => this.props.onChange(e)}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Re-enter Password</Form.Label>
                            <Form.Control type="password" placeholder="Password"/>
                        </Form.Group>

                        <ButtonGroup>
                            <Button variant="primary" type="button" onClick={() => this.onSubmit()}>
                                Sign Up
                            </Button>
                            <LinkContainer to="/">
                                <Button variant="secondary" type="submit">
                                    Cancel
                                </Button>
                            </LinkContainer>
                        </ButtonGroup>
                    </Form>

                    <Container>
                        <br/>
                        {error ?
                            <Alert variant={'warning'}>{error}</Alert>
                            :
                            <Container/>
                        }
                        {success ?
                            <Alert variant={'success'}>Thank you!</Alert>
                            :
                            <Container/>
                        }
                    </Container>
                </Col>
            </Row>
        );
    }
}
