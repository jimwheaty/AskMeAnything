import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {
    Alert,
    Button, ButtonGroup,
    Col,
    Container,
    Dropdown, Form,
    FormControl,
    Jumbotron, Nav,
    Navbar,
    Row, ToggleButtonGroup
} from "react-bootstrap";
import { MemoryRouter, Switch, Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

function Home () {
    return(
        <Container style={{marginTop:30, marginBottom:30}}>
            <Row>
                <Col sm={3}>
                    <Jumbotron>
                        <h2>Questions per keyword</h2>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">Dropdown Button</Dropdown.Toggle>
                            <Dropdown.Menu>
                                <FormControl type="text" placeholder="Search..." className="mr-sm-2" />
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Jumbotron>
                </Col>
                <Col sm={3}>
                    <Jumbotron>
                        <h2>Questions per day/period</h2>
                    </Jumbotron>
                </Col>
                <Col sm={3}>
                    <LinkContainer to="/CreateQuestion" >
                        <button>
                            <Jumbotron>
                                <h2>Ask a Question</h2>
                            </Jumbotron>
                        </button>
                    </LinkContainer>
                </Col>
                <Col sm={3}>
                    <LinkContainer to="/AnswerQuestion" >
                        <button>
                            <Jumbotron>
                                <h2>Answer a Question</h2>
                            </Jumbotron>
                        </button>
                    </LinkContainer>
                </Col>
            </Row>
        </Container>
    );
}

function CreateQuestion () {
    return (
        <Row className="justify-content-md-center" style={{marginBottom:30, marginTop:30}}>
            <Col xs={8}>
                <h2>Ask a Question</h2>
                <br />
                <Form>
                    <Form.Group>
                        <Form.Label>Question Title</Form.Label>
                        <Form.Control type="text"/>
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Question Text</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Tag</Form.Label>
                        <Form.Control as="select">
                            <option value="0">Choose...</option>
                            <option value="1">#One</option>
                            <option value="2">#Two</option>
                            <option value="3">#Three</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <ButtonGroup>
                            <Button variant="primary" type="submit">Submit</Button>
                            <Button variant="secondary" type="submit">Cancel</Button>
                        </ButtonGroup>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    );
}

function AnswerQuestion () {
    return (
        <Row className="justify-content-md-center" style={{marginBottom:30, marginTop:30}}>
            <Col xs={8}>
                <h2>Answer a Question</h2>
                <br />
                <Form>
                    <Form.Group>
                        <Form.Label>Question Title</Form.Label>
                        <Form.Control as="select">
                            <option value="0">Choose...</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Control>
                    </Form.Group>

                    <h4>
                        /*TODO*/
                        <br/>
                        Keywords - read only
                        <br />
                        Other answer can be shown here
                    </h4>

                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Your Answer</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group>

                    <Form.Group>
                        <ButtonGroup>
                            <Button variant="primary" type="submit">Submit</Button>
                            <Button variant="secondary" type="submit">Cancel</Button>
                        </ButtonGroup>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    );
}

function Signup (props) {
    return(
        <Row className="justify-content-md-center" style={{marginBottom:30, marginTop:30}}>
            <Col xs={4}>
                <h2>Sign Up</h2>
                <br />
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" onChange={(e) => props.onChange(e)}/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" onChange={(e) => props.onChange(e)}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Re-enter Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>

                    <ButtonGroup>
                        <Button variant="primary" type="submit" name="isSigned" onClick={ (e) => props.onClick(e)}>Sign Up</Button>
                        <Button variant="secondary" type="submit">Cancel</Button>
                    </ButtonGroup>
                </Form>
            </Col>
        </Row>
    );
}
function Signin (props) {
    return(
        <Row className="justify-content-md-center" style={{marginBottom:30, marginTop:30}}>
            <Col xs={4}>
                <h2>Log In</h2>
                <br />
                <Form>
                    <Form.Group controlId="formBasicEmail" >
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" onChange={(e) => props.onChange(e)}/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword" >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" onChange={(e) => props.onChange(e)}/>
                    </Form.Group>
                    <ButtonGroup >
                        <Button variant="primary" type="submit" name="isSigned" onClick={ (e) => props.onClick(e)}>
                            Log In
                        </Button>
                        <Button variant="secondary" type="submit">
                            Cancel
                        </Button>
                    </ButtonGroup>
                </Form>
            </Col>
        </Row>
    );
}

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isSigned: false,
            email: "jimmy@gmail.com",
            password: "pass",
        };
    }

    handleChange = (event) => {
        const target = event.target;
        this.setState({
            [target.name]: target.value
        });
    };

    handleClick = (event) => {
        const target = event.target;
        this.setState({
            [target.name]: true
        });
    };

    CustomNav = () => {
        return (
            (this.state.isSigned === false) ?
                <Nav>
                    <LinkContainer id="sign_up_btn" to="/sign_up">
                        <Button variant="outline-secondary">Signup !</Button>
                    </LinkContainer>
                    <LinkContainer id="sign_in_btn" to="/sign_in">
                        <Button variant="outline-secondary">Signin !</Button>
                    </LinkContainer>
                </Nav>
                :
                <Navbar.Text>Signed in as: <a href="#login">{this.state.email}</a></Navbar.Text>
        );
    }

    render(){
        return (
            <MemoryRouter>
                <Col>
                    <div className="jumbotron text-center" style={{marginBottom:0}}>
                        <h1>Ask me Anything</h1>
                        <p>All your question and answers in one place!!</p>
                    </div>
                    <Navbar bg="dark" expand="lg" variant="dark" className="justify-content-between">
                        <LinkContainer to="/" ><Button variant="outline-secondary">Home</Button></LinkContainer>
                        <this.CustomNav></this.CustomNav>
                    </Navbar>
                    <Switch>
                        <Route path="/CreateQuestion">
                            <CreateQuestion />
                        </Route>
                        <Route path="/AnswerQuestion">
                            <AnswerQuestion />
                        </Route>
                        <Route path="/sign_up">
                            <Signup
                                onChange={(event) => this.handleChange(event)}
                                onClick={(event) => this.handleClick(event)}
                            />
                        </Route>
                        <Route path="/sign_in">
                            <Signin
                                onChange={(event) => this.handleChange(event)}
                                onClick={(event) => this.handleClick(event)}
                            />
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                    <div className="jumbotron text-center" style={{marginBottom:0}}>
                        <kbd>Powered by React and Bootstrap</kbd>
                    </div>
                </Col>
            </MemoryRouter>
        );
    }
}

export default App;