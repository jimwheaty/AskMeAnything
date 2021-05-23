import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {
    Breadcrumb, BreadcrumbItem,
    Button, ButtonGroup, Card, CardDeck,
    Col,
    Container,
    Form,
    FormControl,
    Jumbotron, Nav,
    Navbar,
    Row,
    Accordion,
    InputGroup, Alert
} from "react-bootstrap";
import {MemoryRouter, Switch, Route, Link} from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { VictoryChart, VictoryAxis, VictoryTheme, VictoryPie, VictoryLine } from 'victory'
/* Daytime imports */
import TimeAgo from 'react-timeago'


function Home (props) {
    return(
        <Container style={{marginTop:30, marginBottom:30}}>
            <Row>
                <Col sm={3} style={{marginBottom:30}}>
                    <LinkContainer to="/Tags" >
                        <button onClick={() => props.onClickTags()}>
                            <Jumbotron style={{margin:0}}>
                                <h2>Questions per #tag</h2>
                            </Jumbotron>
                        </button>
                    </LinkContainer>
                </Col>
                <Col sm={3} style={{marginBottom:30}}>
                    <LinkContainer to="/QuestionsList" >
                        <button onClick={() => props.onClickQuestionsList()}>
                            <Jumbotron style={{margin:0}}>
                                <h2>Questions per day/period</h2>
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

function Tags(props) {

    return(
        <Container style={{marginTop:30, marginBottom:30}}>
            <h2>Most popular Tags</h2><br />
            <Container>
                <Accordion>
                    <Card style={{width:400}}>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                Graph !
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <VictoryPie
                                    data={[
                                        { x: "Tag1", y: 35 },
                                        { x: "Tag2", y: 40 },
                                        { x: "Tag3", y: 55 },
                                        { x: "Tag4", y: 25 },
                                        { x: "Tag5", y: 15 }
                                    ]}
                                    labels={({ datum }) => `${datum.x}: ${datum.y}`}
                                    labelPlacement={({ index }) => index
                                        ? "parallel"
                                        : "vertical"
                                    }
                                    padding={100}
                                />
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </Container> <br/>
            <CardDeck>
                <Card body style={{minWidth:200}}>
                    <LinkContainer to="/QuestionsList" >
                        <Button onClick={(e) => props.onClick(e)} name="#tag1">#Tag1</Button>
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

class QuestionsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded1: false,
            questionItems: [],
        }
    }

    componentDidMount() {
        fetch("http://localhost:8080/api/questions")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded1: true,
                        questionItems: result
                    });
                    const { questionItems } = this.state;
                    return Promise.all(
                        questionItems.map(item => (
                            fetch("http://localhost:8080/api/users/" + item.userId)
                                .then(res => res.json())
                                .then(
                                    (result) => {
                                        item.userName = result.username;
                                        this.setState({
                                            questionItems : questionItems
                                        })
                                    },
                                    (error) => {
                                        this.setState({
                                            error
                                        });
                                    }
                                )
                        ))
                    )
                },
                (error) => {
                    this.setState({
                        isLoaded1: true,
                        error
                    });
                })
    }

    render() {
        const { error, isLoaded1, questionItems } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded1) {
            return <div>Loading...</div>;
        } else {
            return (
                <Container>
                    {questionItems.map(item => (
                        <Container>
                        <Card key={item.id}>
                            <Card.Body>
                                <Card.Title><Link to='/Question' id='1' onClick={(e) => this.props.onClickQuestion(e)}>{item.title}</Link></Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">asked <TimeAgo date={item.createdAt}/> by {item.userName}</Card.Subtitle>
                                <Card.Link><Link name='#tag1' onClick={(e) => this.props.onClickTag(e)}>#tag1</Link></Card.Link>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">Last updated <TimeAgo date={item.updatedAt} /></small>
                            </Card.Footer>
                        </Card>
                        </Container>
                    ))}
                </Container>
            );
        }
    }
    /* TODO
    return(
        <Container>
            <Accordion>
                <Card style={{width:400}}>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                            Questions per month Graph !
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Select a year</Form.Label>
                                    <Form.Control as="select" custom>
                                        <option>2021</option>
                                        <option>2020</option>
                                        <option>2019</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form>
                            <VictoryChart
                                theme={VictoryTheme.material}
                            >
                                <VictoryAxis crossAxis
                                             width={400}
                                             height={400}
                                             domain={[0, 12]}
                                             label="month of the year"
                                             style={{axisLabel: {fontSize: 20, padding: 30}}}
                                />
                                <VictoryAxis dependentAxis crossAxis
                                             width={400}
                                             height={400}
                                             domain={[0, 10]}
                                             label="Number of Questions"
                                             style={{axisLabel: {fontSize: 20, padding: 30}}}
                                />
                                <VictoryLine
                                    style={{
                                        data: { stroke: "#c43a31" },
                                        parent: { border: "1px solid #ccc"}
                                    }}
                                    data={[
                                        { x: 1, y: 2 },
                                        { x: 2, y: 3 },
                                        { x: 3, y: 5 },
                                        { x: 4, y: 4 },
                                        { x: 5, y: 7 }
                                    ]}
                                />
                            </VictoryChart>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card style={{width:400}}>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            Questions per day Graph !
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Select a year</Form.Label>
                                    <Form.Control as="select" custom>
                                        <option>2021</option>
                                        <option>2020</option>
                                        <option>2019</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="exampleForm.SelectCustom">
                                    <Form.Label>and a month !</Form.Label>
                                    <Form.Control as="select" custom>
                                        <option>Ιανουάριος</option>
                                        <option>Φεβρουάριος</option>
                                        <option>Μάρτιος</option>
                                        <option>Απρίλιος</option>
                                        <option>Μάιος</option>
                                        <option>Ιούνιος</option>
                                        <option>Ιούλιος</option>
                                        <option>Αύγουστος</option>
                                        <option>Σεπτέμβριος</option>
                                        <option>Οκτώμβριος</option>
                                        <option>Νοέμβριος</option>
                                        <option>Δεκέμβριος</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form>
                            <VictoryChart
                                theme={VictoryTheme.material}
                            >
                                <VictoryAxis crossAxis
                                             width={400}
                                             height={400}
                                             domain={[0, 31]}
                                             label="day of the month"
                                             style={{axisLabel: {fontSize: 20, padding: 30}}}
                                />
                                <VictoryAxis dependentAxis crossAxis
                                             width={400}
                                             height={400}
                                             domain={[0, 10]}
                                             label="Number of Questions"
                                             style={{axisLabel: {fontSize: 20, padding: 30}}}
                                />
                                <VictoryLine
                                    style={{
                                        data: { stroke: "#c43a31" },
                                        parent: { border: "1px solid #ccc"}
                                    }}
                                    data={[
                                        { x: 1, y: 2 },
                                        { x: 2, y: 3 },
                                        { x: 3, y: 5 },
                                        { x: 4, y: 4 },
                                        { x: 5, y: 7 }
                                    ]}
                                />
                            </VictoryChart>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion> <br/>
            <Card>
                <Card.Body>
                    <Card.Title><Link to='/Question' id='1' onClick={(e) => props.onClickQuestion(e)}>Η πρώτη μου ερώτηση</Link></Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">asked 1 hour ago by jimmy</Card.Subtitle>
                    <Card.Link><Link name='#tag1' onClick={(e) => props.onClickTag(e)}>#tag1</Link></Card.Link>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">Last updated 3 minutes ago</small>
                </Card.Footer>
            </Card>
            <Card>
                <Card.Body>
                    <Card.Title><Link to='/Question' id='1' onClick={(e) => props.onClickQuestion(e)}>Η πρώτη μου ερώτηση</Link></Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">asked 1 hour ago by jimmy</Card.Subtitle>
                    <Card.Link><Link name='#tag1' onClick={(e) => props.onClickTag(e)}>#tag1</Link></Card.Link>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">Last updated 3 minutes ago</small>
                </Card.Footer>
            </Card>
            <Card>
                <Card.Body>
                    <Card.Title><Link to='/Question' id='1' onClick={(e) => props.onClickQuestion(e)}>Η πρώτη μου ερώτηση</Link></Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">asked 1 hour ago by jimmy</Card.Subtitle>
                    <Card.Link><Link name='#tag1' onClick={(e) => props.onClickTag(e)}>#tag1</Link></Card.Link>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">Last updated 3 minutes ago</small>
                </Card.Footer>
            </Card>
        </Container>
    );
    */
}

function MyHome (props) {
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

function ActivityList(props) {
    return(
        <Container style={{marginTop:30, marginBottom:30}}>
            <Card>
                <Card.Body>
                    <Card.Title><Link to='/Question' id='1' onClick={(e) => props.onClickQuestion(e)}>Η πρώτη μου ερώτηση</Link></Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">asked 1 hour ago by jimmy</Card.Subtitle>
                    <Card.Link><Link name='#tag1' to='/QuestionsList' onClick={(e) => props.onClickTag(e)}>#tag1</Link></Card.Link>
                </Card.Body>
            </Card>
            <Card>
                <Card.Body>
                    <Card.Title><Link to='/Question' id='1' onClick={(e) => props.onClickQuestion(e)}>Η πρώτη μου ερώτηση</Link></Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">answered 20 minutes ago by jimmy</Card.Subtitle>
                    <Card.Link><Link name='#tag1' to='/QuestionsList' onClick={(e) => props.onClickTag(e)}>#tag1</Link></Card.Link>
                </Card.Body>
            </Card>
            <Card>
                <Card.Body>
                    <Card.Title><Link to='/Question' id='1' onClick={(e) => props.onClickQuestion(e)}>Η πρώτη μου ερώτηση</Link></Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">answered 30 minutes ago by jimmy</Card.Subtitle>
                    <Card.Link><Link name='#tag1' to='/QuestionsList' onClick={(e) => props.onClickTag(e)}>#tag1</Link></Card.Link>
                </Card.Body>
            </Card>
        </Container>
    );
}

function ActivityStatistics() {
    return (
        <Container style={{marginTop:30, marginBottom:30}}>
            <Row>
                <Col sm={6}>
                    <Card>
                        <Card.Header>
                            Questions per day Graph !
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Select a year</Form.Label>
                                    <Form.Control as="select" custom>
                                        <option>2021</option>
                                        <option>2020</option>
                                        <option>2019</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="exampleForm.SelectCustom">
                                    <Form.Label>and a month !</Form.Label>
                                    <Form.Control as="select" custom>
                                        <option>Ιανουάριος</option>
                                        <option>Φεβρουάριος</option>
                                        <option>Μάρτιος</option>
                                        <option>Απρίλιος</option>
                                        <option>Μάιος</option>
                                        <option>Ιούνιος</option>
                                        <option>Ιούλιος</option>
                                        <option>Αύγουστος</option>
                                        <option>Σεπτέμβριος</option>
                                        <option>Οκτώμβριος</option>
                                        <option>Νοέμβριος</option>
                                        <option>Δεκέμβριος</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form>
                            <VictoryChart
                                theme={VictoryTheme.material}
                            >
                                <VictoryAxis crossAxis
                                             width={400}
                                             height={400}
                                             domain={[0, 31]}
                                             label="day of the month"
                                             style={{axisLabel: {fontSize: 20, padding: 30}}}
                                />
                                <VictoryAxis dependentAxis crossAxis
                                             width={400}
                                             height={400}
                                             domain={[0, 10]}
                                             label="Number of Questions"
                                             style={{axisLabel: {fontSize: 20, padding: 30}}}
                                />
                                <VictoryLine
                                    style={{
                                        data: { stroke: "#c43a31" },
                                        parent: { border: "1px solid #ccc"}
                                    }}
                                    data={[
                                        { x: 1, y: 2 },
                                        { x: 2, y: 3 },
                                        { x: 3, y: 5 },
                                        { x: 4, y: 4 },
                                        { x: 5, y: 7 }
                                    ]}
                                />
                            </VictoryChart>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={6}>
                    <Card>
                        <Card.Header>
                            Answers per day Graph !
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Select a year</Form.Label>
                                    <Form.Control as="select" custom>
                                        <option>2021</option>
                                        <option>2020</option>
                                        <option>2019</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="exampleForm.SelectCustom">
                                    <Form.Label>and a month !</Form.Label>
                                    <Form.Control as="select" custom>
                                        <option>Ιανουάριος</option>
                                        <option>Φεβρουάριος</option>
                                        <option>Μάρτιος</option>
                                        <option>Απρίλιος</option>
                                        <option>Μάιος</option>
                                        <option>Ιούνιος</option>
                                        <option>Ιούλιος</option>
                                        <option>Αύγουστος</option>
                                        <option>Σεπτέμβριος</option>
                                        <option>Οκτώμβριος</option>
                                        <option>Νοέμβριος</option>
                                        <option>Δεκέμβριος</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form>
                            <VictoryChart
                                theme={VictoryTheme.material}
                            >
                                <VictoryAxis crossAxis
                                             width={400}
                                             height={400}
                                             domain={[0, 31]}
                                             label="day of the month"
                                             style={{axisLabel: {fontSize: 20, padding: 30}}}
                                />
                                <VictoryAxis dependentAxis crossAxis
                                             width={400}
                                             height={400}
                                             domain={[0, 10]}
                                             label="Number of Answers"
                                             style={{axisLabel: {fontSize: 20, padding: 30}}}
                                />
                                <VictoryLine
                                    style={{
                                        data: { stroke: "#c43a31" },
                                        parent: { border: "1px solid #ccc"}
                                    }}
                                    data={[
                                        { x: 1, y: 2 },
                                        { x: 2, y: 3 },
                                        { x: 3, y: 5 },
                                        { x: 4, y: 4 },
                                        { x: 5, y: 7 }
                                    ]}
                                />
                            </VictoryChart>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
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
                        <LinkContainer to="/">
                            <Button variant="primary" type="button" name="isSigned" onClick={ (e) => props.onClick(e)}>
                                Sign Up
                            </Button>
                        </LinkContainer>
                        <LinkContainer to="/">
                            <Button variant="secondary" type="submit">
                                Cancel
                            </Button>
                        </LinkContainer>
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
                        <LinkContainer to="/">
                            <Button variant="primary" type="button" name="isSigned" onClick={ (e) => props.onClick(e)}>
                                Log In
                            </Button>
                        </LinkContainer>
                        <LinkContainer to="/">
                            <Button variant="secondary" type="submit">
                                Cancel
                            </Button>
                        </LinkContainer>
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
            history: [],
            createTag: false,
        };
    }

    handleChange = (event) => {
        const target = event.target;
        const value = (target.type === 'button') ? true : target.value;
        this.setState({
            [target.name]: value
        });
    };

    handleHomeButton = () => this.setState({history:[]});

    handleMyHomeLink = () => this.setState({history:["My Home"]});

    handleActivityListButton = () => this.setState({history:["My Home", "My Activity"]});

    handleActivityStatisticsButton = () => this.setState({history:["My Home", "My Statistics"]});

    handleTagsButton = () => this.setState({history:["Tags"]})

    handleTagButton = (event) => {
        const name = event.target.name;
        return(
            (name == "") ?
                this.setState({history:["Tags",this.state.tag]})
            :
                this.setState({tag: name, history:["Tags",name]})
        )
    }

    handleQuestionsListButton = () => this.setState({tag: undefined, history:["Questions"]});

    handleQuestionLink = (event) => {
        const history = this.state.history.slice();
        const target = event.target;
        let id = (target.id) ? target.id : target.value;
        if (id === '0')
            this.setState({questionActive: undefined, history: ["Questions","Answer a Question"]});
        else if (history[0] === "Questions")
            this.setState({questionActive: id, history: ["Questions","Question"+id]});
        else if (history[0] === "Tags") {
            history.push("Question"+id)
            this.setState({questionActive: id, history:history});
        }
        else if (history[0] === "My Home") {
            history.push("Question" + id)
            this.setState({questionActive: id, history: history});
        }
    }

    handleCreateTagRadio = () => this.setState({createTag: !this.state.createTag});

    handleCreateQuestionButton = () => {
        const history = this.state.history.slice();
        history.push('Create Question')
        this.setState({history: history})
    }
    handleAnswerQuestionButton = () => {
        const history = this.state.history.slice();
        history.push('Answer Question')
        this.setState({history: history})
    }

    QuestionHeader = () => {
        return(
            <Container  style={{marginTop:30, marginBottom:30}}>
                <h2>Question {this.state.questionActive}</h2><br />
                <this.Question />
                <br />
                <LinkContainer to="/AnswerQuestion"><Button>Answer!</Button></LinkContainer>
            </Container>
        )
    }

    Question = () => {
        return(
            (this.state.questionActive) ?
                <Container>
                    <Card>
                        <Card.Body>
                            <Card.Title>Η πρώτη μου ερώτηση</Card.Title>
                            <LinkContainer to="/QuestionsList" >
                                <Card.Link><Link to='/QuestionsList' name='#tag1' onClick={(e) => this.handleTagButton(e)}>#tag1</Link></Card.Link>
                            </LinkContainer>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">asked 1 hour ago by jimmy</small>
                        </Card.Footer>
                    </Card>
                    <br /><h4>2 Answers:</h4>
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
                :
                <Container />
        )
    }

    QuestionsListHeader = () => {
        return(
            (this.state.tag) ?
                <Container  style={{marginTop:30, marginBottom:30}}>
                    <h2>Questions with {this.state.tag}</h2><br />
                    <QuestionsList
                        onClickQuestion={(event) => this.handleQuestionLink(event)}
                        onClickTag={(event) => this.handleTagButton(event)}
                    />
                </Container>
                :
                <Container  style={{marginTop:30, marginBottom:30}}>
                    <h2>Recent questions</h2><br />
                    <QuestionsList
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
                    <LinkContainer to="/" ><Button onClick={()=> this.handleHomeButton()} variant="outline-secondary">Home</Button></LinkContainer>
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
                    <LinkContainer to="/" ><Button onClick={()=> this.handleHomeButton()} variant="outline-secondary" >Home</Button></LinkContainer>
                    <Nav>
                        <Navbar.Text>Signed in as: <LinkContainer to="/myHome" onClick={()=> this.handleMyHomeLink()}><Link>{this.state.email}</Link></LinkContainer></Navbar.Text>
                        <LinkContainer id="sign_out_btn" to="/">
                            <Button variant="outline-secondary" name="isSigned" onClick={() => this.handleChange()}>Sign out</Button>
                        </LinkContainer>
                    </Nav>
                </Navbar>
        );
    }

    CustomBreadcrump = () => {
        const history = this.state.history.slice();
        // eslint-disable-next-line
        if (history == ""){
            return(
                <Breadcrumb>
                    <Breadcrumb.Item></Breadcrumb.Item>
                </Breadcrumb>
            )
        }
        else if (history.length == 1) {
            return(
                <Breadcrumb>
                    <Breadcrumb.Item></Breadcrumb.Item>
                    <Breadcrumb.Item active>{history}</Breadcrumb.Item>
                </Breadcrumb>
            )
        }
        else if (history[0] == "Questions" && history.length == 2) {
            return(
                <Breadcrumb>
                    <Breadcrumb.Item></Breadcrumb.Item>
                    <LinkContainer to="/QuestionsList" onClick={() => this.handleQuestionsListButton()}><Breadcrumb.Item>Questions</Breadcrumb.Item></LinkContainer>
                    <BreadcrumbItem active>{history[1]}</BreadcrumbItem>
                </Breadcrumb>
            )
        }
        else if (history[0] == "Tags" && history.length == 2) {
            return(
                <Breadcrumb>
                    <Breadcrumb.Item></Breadcrumb.Item>
                    <LinkContainer to="/Tags" onClick={() => this.handleTagsButton()}><Breadcrumb.Item>Tags</Breadcrumb.Item></LinkContainer>
                    <BreadcrumbItem active>{history[1]}</BreadcrumbItem>
                </Breadcrumb>
            )
        }
        else if (history[0] == "Tags" && history.length == 3) {
            return(
                <Breadcrumb>
                    <Breadcrumb.Item></Breadcrumb.Item>
                    <LinkContainer to="/Tags" onClick={() => this.handleTagsButton()}><Breadcrumb.Item>Tags</Breadcrumb.Item></LinkContainer>
                    <LinkContainer to="/QuestionsList" onClick={(e) => this.handleTagButton(e)}><BreadcrumbItem>{history[1]}</BreadcrumbItem></LinkContainer>
                    <BreadcrumbItem active>{history[2]}</BreadcrumbItem>
                </Breadcrumb>
            )
        }
        else if (history[0] == "My Home" && history.length == 2) {
            return(
                <Breadcrumb>
                    <Breadcrumb.Item></Breadcrumb.Item>
                    <LinkContainer to="/myHome" onClick={() => this.handleMyHomeLink()}><Breadcrumb.Item>My Home</Breadcrumb.Item></LinkContainer>
                    <BreadcrumbItem active>{history[1]}</BreadcrumbItem>
                </Breadcrumb>
            )
        }
        else if (history[0] == "My Home" && history.length == 3) {
            return(
                <Breadcrumb>
                    <Breadcrumb.Item></Breadcrumb.Item>
                    <LinkContainer to="/myHome" onClick={() => this.handleMyHomeLink()}><Breadcrumb.Item>My Home</Breadcrumb.Item></LinkContainer>
                    <LinkContainer to="/ActivityList" onClick={() => this.handleActivityListButton()}><Breadcrumb.Item>My Activity</Breadcrumb.Item></LinkContainer>
                    <BreadcrumbItem active>{history[2]}</BreadcrumbItem>
                </Breadcrumb>
            )
        }
        else {
            alert("this.state.history="+history)
            return(
                <Breadcrumb>
                    <Breadcrumb.Item>Fail</Breadcrumb.Item>
                </Breadcrumb>
            )
        }
    }

    CreateQuestion = () => {
        return (
            (this.state.isSigned === false) ?
                <Alert variant={'warning'}>
                    You have to sign in first !!!
                </Alert>
                :
                (this.state.createTag) ?
                    <Row className="justify-content-md-center"><Col sm={8}>
                        <h2>Ask a Question</h2>
                        <br />
                        <Form>
                            <Form.Group>
                                <Form.Label>Question Title</Form.Label>
                                <Form.Control type="text"/>
                                <br />
                                <Form.Label>Question Text</Form.Label>
                                <Form.Control as="textarea" rows={3} />
                                <br />
                                <Form.Label>Tag</Form.Label>
                                <Form.Control as="select" disabled>
                                    <option value="0">Choose...</option>
                                    <option value="1">#One</option>
                                    <option value="2">#Two</option>
                                    <option value="3">#Three</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formHorizontalCheck">
                                <Form.Check onClick={() => this.handleCreateTagRadio()} label="or create your own #tag !" />
                            </Form.Group>
                            <Form.Group>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>#</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl />
                                </InputGroup>
                                <br />
                                <ButtonGroup>
                                    <Button variant="primary" type="button">Submit</Button>
                                    <Button variant="secondary" type="submit">Cancel</Button>
                                </ButtonGroup>
                            </Form.Group>
                        </Form>
                    </Col></Row>
                    :
                    <Row className="justify-content-md-center"><Col sm={8}>
                        <h2>Ask a Question</h2>
                        <br />
                        <Form>
                            <Form.Group>
                                <Form.Label>Question Title</Form.Label>
                                <Form.Control type="text"/>
                                <br />
                                <Form.Label>Question Text</Form.Label>
                                <Form.Control as="textarea" rows={3} />
                                <br />
                                <Form.Label>Tag</Form.Label>
                                <Form.Control as="select">
                                    <option value="0">Choose...</option>
                                    <option value="1">#One</option>
                                    <option value="2">#Two</option>
                                    <option value="3">#Three</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formHorizontalCheck">
                                <Form.Check onClick={() => this.handleCreateTagRadio()} label="or create your own #tag !" />
                            </Form.Group>
                            <Form.Group>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>#</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl disabled />
                                </InputGroup>
                                <br />
                                <ButtonGroup>
                                    <Button variant="primary" type="button">Submit</Button>
                                    <Button variant="secondary" type="submit">Cancel</Button>
                                </ButtonGroup>
                            </Form.Group>
                        </Form>
                    </Col></Row>
        );
    }

    AnswerQuestion = () => {
        return (
            (this.state.isSigned === false) ?
                <Alert variant={'warning'}>
                    You have to sign in first !!!
                </Alert>
                :
                <Row className="justify-content-md-center" style={{marginBottom:30, marginTop:30}}>
                    <Col sm={8}>
                        <h2>Answer a Question</h2>
                        <br />
                        <Form>
                            <Form.Group>
                                <Form.Label>Choose Question Title</Form.Label>
                                <Form.Control as="select" onChange={(e) => this.handleQuestionLink(e)}>
                                    <option value="0">Choose...</option>
                                    <option value="1">Η πρώτη μου ερώτηση</option>
                                    <option value="2">Η πρώτη μου ερώτηση</option>
                                    <option value="3">Η πρώτη μου ερώτηση</option>
                                </Form.Control>
                                <br/>
                                <this.Question />
                                <br />
                                <Form.Label>Your Answer</Form.Label>
                                <Form.Control as="textarea" rows={3} />
                                <br/>
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
                            <MyHome
                                onClickActivityList={() => this.handleActivityListButton()}
                                onClickActivityStatistics={() => this.handleActivityStatisticsButton()}
                                onClickCreateQuestion={() => this.handleCreateQuestionButton()}
                                onClickAnswerQuestion={() => this.handleAnswerQuestionButton()}
                            />
                        </Route>
                        <Route path="/ActivityList">
                            <ActivityList
                                onClickQuestion={(event) => this.handleQuestionLink(event)}
                                onClickTag={(event) => this.handleTagButton(event)}
                            />
                        </Route>
                        <Route path="/ActivityStatistics">
                            <ActivityStatistics />
                        </Route>
                        <Route path="/Tags">
                            <Tags
                                onClick={(event) => this.handleTagButton(event)}
                            />
                        </Route>
                        <Route path="/QuestionsList">
                            <this.QuestionsListHeader />
                        </Route>
                        <Route path="/Question">
                            <this.QuestionHeader />
                        </Route>
                        <Route path="/CreateQuestion">
                            <this.CreateQuestion/>
                        </Route>
                        <Route path="/AnswerQuestion">
                            <this.AnswerQuestion />
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
                                onClickQuestionsList={() => this.handleQuestionsListButton()}
                                onClickTags={() => this.handleTagsButton()}
                                onClickCreateQuestion={() => this.handleCreateQuestionButton()}
                                onClickAnswerQuestion={() => this.handleAnswerQuestionButton()}
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