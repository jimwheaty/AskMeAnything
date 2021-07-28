import React from "react";
import {Redirect} from "react-router-dom";
import {Alert, Button, ButtonGroup, Col, Container, Form, Row} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {auth_url, backend_url} from "./App";

export class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
        }
    }

    onSubmit() {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username: this.props.username, password: this.props.password})
        };
        fetch(auth_url + '/api/auth/login', requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.error)
                        this.setState({error : result.message})
                    else {
                        this.props.onClick(result.access_token)
                        fetch(backend_url + "/api/users")
                            .then(res => res.json())
                            .then(
                                (result) => {
                                    result.forEach((item) => {
                                        if (item.username == this.props.username)
                                            this.props.onUserId(item.id)
                                    })
                                },
                                (error) => this.setState({error: error})
                            )
                    }
                }
            )
    }
    render() {
        const { error } = this.state;
        if (this.props.redirect) {
            return <Redirect to={this.props.redirect} />
        }
        return(
            <Row className="justify-content-md-center" style={{marginBottom:30, marginTop:30}}>
                <Col sm={3}>
                    <h2>Log In</h2>
                    <br />
                    <Form>
                        <Form.Group controlId="formBasicUsername" >
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" name="username" onChange={(e) => this.props.onChange(e)}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword" >
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password" onChange={(e) => this.props.onChange(e)}/>
                        </Form.Group>
                        <ButtonGroup >
                            <Button variant="primary" type="button" name="isSigned" onClick={ () => this.onSubmit()}>
                                Log In
                            </Button>
                            <LinkContainer to="/">
                                <Button variant="secondary" type="submit">
                                    Cancel
                                </Button>
                            </LinkContainer>
                        </ButtonGroup>
                    </Form>
                    {error ?
                        <Container>
                            <br />
                            <Alert variant={'warning'}>
                                {error}
                            </Alert> </Container>
                        :
                        <br/>
                    }
                </Col>
            </Row>
        );
    }
}
