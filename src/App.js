import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {
    Breadcrumb,
    Button, ButtonGroup, Card, CardDeck,
    Col,
    Container,
    Dropdown, Form,
    FormControl,
    Jumbotron, Nav,
    Navbar,
    Row
} from "react-bootstrap";
import {MemoryRouter, Switch, Route, Link} from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

function Home (props) {
    return(
        <Container style={{marginTop:30, marginBottom:30}}>
            <Row>
                <Col sm={3} style={{marginBottom:30}}>
                    <LinkContainer to="/Tags" >
                        <button>
                            <Jumbotron style={{margin:0}}>
                                <h2>Questions per #tag</h2>
                            </Jumbotron>
                        </button>
                    </LinkContainer>
                </Col>
                <Col sm={3} style={{marginBottom:30}}>
                    <LinkContainer to="/QuestionsPerTime" >
                        <button onClick={() => props.onClick()}>
                            <Jumbotron style={{margin:0}}>
                                <h2>Questions per day</h2>
                            </Jumbotron>
                        </button>
                    </LinkContainer>
                </Col>
                <Col sm={3} style={{marginBottom:30}}>
                    <LinkContainer to="/CreateQuestion" >
                        <button>
                            <Jumbotron style={{margin:0}}>
                                <h2>Ask a Question</h2>
                            </Jumbotron>
                        </button>
                    </LinkContainer>
                </Col>
                <Col sm={3}>
                    <LinkContainer to="/AnswerQuestion" >
                        <button>
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

function Tags(props) {
    return(
        <Container style={{marginTop:30, marginBottom:30}}>
            <h2>Most popular Tags</h2><br />
            <CardDeck>
                <Card body style={{minWidth:200}}>
                    <LinkContainer to="/QuestionsPerTime" >
                        <Button onClick={(e) => props.onClick(e)} name="tag1">#Tag1</Button>
                    </LinkContainer>
                    <small className="text-muted"> (10 questions)</small>
                </Card>
                <Card body style={{minWidth:200}}>
                    <Button>#Tag1</Button>
                    <small className="text-muted"> (10 questions)</small>
                </Card>
                <Card body style={{minWidth:200}}>
                    <Button>#Tag1</Button>
                    <small className="text-muted"> (10 questions)</small>
                </Card>
                <Card body style={{minWidth:200}}>
                    <Button>#Tag1</Button>
                    <small className="text-muted"> (10 questions)</small>
                </Card>
                <Card body style={{minWidth:200}}>
                    <Button>#Tag1</Button>
                    <small className="text-muted"> (10 questions)</small>
                </Card>
                <Card body style={{minWidth:200}}>
                    <Button>#Tag1</Button>
                    <small className="text-muted"> (10 questions)</small>
                </Card>
                <Card body style={{minWidth:200}}>
                    <Button>#Tag1</Button>
                    <small className="text-muted"> (10 questions)</small>
                </Card>
                <Card body style={{minWidth:200}}>
                    <Button>#Tag1</Button>
                    <small className="text-muted"> (10 questions)</small>
                </Card>
                <Card body style={{minWidth:200}}>
                    <Button>#Tag1</Button>
                    <small className="text-muted"> (10 questions)</small>
                </Card>
                <Card body style={{minWidth:200}}>
                    <Button>#Tag1</Button>
                    <small className="text-muted"> (10 questions)</small>
                </Card>
                <Card body style={{minWidth:200}}>
                    <Button>#Tag1</Button>
                    <small className="text-muted"> (10 questions)</small>
                </Card>
            </CardDeck>
        </Container>
    );
}

function QuestionsPerTime(props) {
    return(
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title><Link to='/Question' id='1' onClick={(e) => props.onClickQuestion(e)}>Η πρώτη μου ερώτηση</Link></Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">asked 1 hour ago by jimmy</Card.Subtitle>
                    <Card.Link name='tag1' onClick={(e) => props.onClickTag(e)}>#tag1</Card.Link>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">Last updated 3 minutes ago</small>
                </Card.Footer>
            </Card>
            <Card>
                <Card.Body>
                    <Card.Title><Link to='/Question' id='1' onClick={(e) => props.onClickQuestion(e)}>Η πρώτη μου ερώτηση</Link></Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">asked 1 hour ago by jimmy</Card.Subtitle>
                    <Card.Link name='tag1' onClick={(e) => props.onClickTag(e)}>#tag1</Card.Link>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">Last updated 3 minutes ago</small>
                </Card.Footer>
            </Card>
            <Card>
                <Card.Body>
                    <Card.Title><Link to='/Question' id='1' onClick={(e) => props.onClickQuestion(e)}>Η πρώτη μου ερώτηση</Link></Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">asked 1 hour ago by jimmy</Card.Subtitle>
                    <Card.Link name='tag1' onClick={(e) => props.onClickTag(e)}>#tag1</Card.Link>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">Last updated 3 minutes ago</small>
                </Card.Footer>
            </Card>
        </Container>
    );
}

function Question (props) {
    return(
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title>Η πρώτη μου ερώτηση</Card.Title>
                    <LinkContainer to="/QuestionsPerTime" >
                        <Card.Link name='tag1' onClick={(e) => props.onClickTag(e)}>#tag1</Card.Link>
                    </LinkContainer>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">asked 1 hour ago by jimmy</small>
                </Card.Footer>
            </Card>
            <br /><h4>2 Answers</h4><br/>
            <Card>
                <Card.Body>
                    <Card.Title>Η πρώτη μου απάντηση!</Card.Title>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">answered 30 minutes ago by jimmy</small>
                </Card.Footer>
            </Card>
            <Card>
                <Card.Body>
                    <Card.Title>Η δεύτερη μου απάντηση!</Card.Title>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">answered 20 minutes ago by jimmy</small>
                </Card.Footer>
            </Card>
        </Container>
    )
}

function MyHome () {
    return(
        <Container style={{marginTop:30, marginBottom:30}}>
            <Row>
                <Col sm={3} style={{marginBottom:30}}>
                    <LinkContainer to="/ContributionsPerTag" >
                        <button>
                            <Jumbotron>
                                <h2>My Questions</h2>
                                <br/>
                                <h2>My Answers</h2>
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
                        </button>
                    </LinkContainer>
                </Col>
                <Col sm={3} style={{marginBottom:30}}>
                    <LinkContainer to="/ContributionsPerTime" >
                        <button>
                            <Jumbotron>
                                <h2>My contributions per day/period</h2>
                            </Jumbotron>
                        </button>
                    </LinkContainer>
                </Col>
                <Col sm={3} style={{marginBottom:30}}>
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
                            <Button variant="primary" type="button">Submit</Button>
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
                        *TODO*
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
                            <Button variant="primary" type="button">Submit</Button>
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
            <Col sm={4}>
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
                        <Button variant="primary" type="button" name="isSigned" onClick={ (e) => props.onClick(e)}>Sign Up</Button>
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
            <Col sm={3}>
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
                        <Button variant="primary" type="button" name="isSigned" onClick={ (e) => props.onClick(e)}>
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
            tag: undefined,
            questionActive: undefined,
            history: Array(4).fill(null),
        };
    }

    handleChange = (event) => {
        const target = event.target;
        const value = (target.type === 'button') ? true : target.value;
        this.setState({
            [target.name]: value
        });
    };

    handleTagButton = (event) => this.setState({tag: event.target.name});

    handleQuestionsPerDayButton = () => this.setState({tag: undefined});

    handleQuestionLink = (event) => this.setState({questionActive: event.target.id});

    QuestionHeader = () => {
        return(
            <Container  style={{marginTop:30, marginBottom:30}}>
                <h2>Question {this.state.questionActive}</h2><br />
                <Question />
            </Container>
        )
    }

    QuestionsPerTimeHeader = () => {
        return(
            (this.state.tag) ?
                <Container  style={{marginTop:30, marginBottom:30}}>
                    <h2>Questions with #{this.state.tag}</h2><br />
                    <QuestionsPerTime
                        onClickQuestion={(event) => this.handleQuestionLink(event)}
                        onClickTag={(event) => this.handleTagButton(event)}
                    />
                </Container>
                :
                <Container  style={{marginTop:30, marginBottom:30}}>
                    <h2>Recent questions</h2><br />
                    <QuestionsPerTime
                        onClickQuestion={(event) => this.handleQuestionLink(event)}
                        onClickTag={(event) => this.handleTagButton(event)}
                    />
                </Container>
        )
    }

    CustomNavbar = () => {
        return (
            (this.state.isSigned === false) ?
                <Navbar bg="dark" variant="dark" className="justify-content-between">
                    <LinkContainer to="/" ><Button variant="outline-secondary">Home</Button></LinkContainer>
                    <Nav>
                        <LinkContainer id="sign_up_btn" to="/sign_up">
                            <Button variant="outline-secondary">Signup !</Button>
                        </LinkContainer>
                        <LinkContainer id="sign_in_btn" to="/sign_in">
                            <Button variant="outline-secondary">Signin !</Button>
                        </LinkContainer>
                    </Nav>
                </Navbar>
                :
                <Navbar bg="dark" expand="lg" variant="dark" className="justify-content-between">
                    <LinkContainer to="/" ><Button variant="outline-secondary">Home</Button></LinkContainer>
                    <Nav>
                        <Navbar.Text>Signed in as: <LinkContainer to="/myHome" ><Link>{this.state.email}</Link></LinkContainer></Navbar.Text>
                        <LinkContainer id="sign_out_btn" to="/">
                            <Button variant="outline-secondary" name="isSigned" onClick={() => this.handleChange()}>Sign out</Button>
                        </LinkContainer>
                    </Nav>
                </Navbar>
        );
    }

    CustomBreadcrump = () => {
        return (
            <Breadcrumb>
                <Breadcrumb.Item></Breadcrumb.Item>
            </Breadcrumb>
        )
    }

    render(){
        return (
            <MemoryRouter>
                <Col>
                    <div className="jumbotron text-center" style={{marginBottom:0}}>
                        <h1>Ask me Anything</h1>
                        <p>All your question and answers in one place!!</p>
                    </div>
                    <this.CustomNavbar />
                    <this.CustomBreadcrump />
                    <Switch>
                        <Route path="/myHome">
                            <MyHome />
                        </Route>
                        <Route path="/Tags">
                            <Tags
                                onClick={(event) => this.handleTagButton(event)}
                            />
                        </Route>
                        <Route path="/QuestionsPerTime">
                            <this.QuestionsPerTimeHeader />
                        </Route>
                        <Route path="/Question">
                            <this.QuestionHeader
                                onClickTag={(event) => this.handleTagButton(event)}
                            />
                        </Route>
                        <Route path="/CreateQuestion">
                            <CreateQuestion />
                        </Route>
                        <Route path="/AnswerQuestion">
                            <AnswerQuestion />
                        </Route>
                        <Route path="/sign_up">
                            <Signup
                                onChange={(event) => this.handleChange(event)}
                                onClick={(event) => this.handleChange(event)}
                            />
                        </Route>
                        <Route path="/sign_in">
                            <Signin
                                onChange={(event) => this.handleChange(event)}
                                onClick={(event) => this.handleChange(event)}
                            />
                        </Route>
                        <Route path="/">
                            <Home
                                onClick={() => this.handleQuestionsPerDayButton()}
                            />
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