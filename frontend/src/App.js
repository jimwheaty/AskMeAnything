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
    InputGroup, Alert, Tabs, Tab
} from "react-bootstrap";
import {MemoryRouter, Switch, Route, Link, Redirect} from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { VictoryChart, VictoryAxis, VictoryTheme, VictoryPie, VictoryLine } from 'victory'
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

class Tags extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            tagItems: [],
        }
    }

    componentDidMount() {
        fetch("http://localhost:8080/api/tags")
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

    render() {
        const {error, isLoaded, tagItems} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <Container style={{marginTop: 30, marginBottom: 30}}>
                    <h2>Most popular Tags</h2><br/>
                    <Container>
                        <Accordion>
                            <Card style={{width: 400}}>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                        Graph !
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <VictoryPie
                                            data={[
                                                {x: "Tag1", y: 35},
                                                {x: "Tag2", y: 40},
                                                {x: "Tag3", y: 55},
                                                {x: "Tag4", y: 25},
                                                {x: "Tag5", y: 15}
                                            ]}
                                            labels={({datum}) => `${datum.x}: ${datum.y}`}
                                            labelPlacement={({index}) => index
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
                        {tagItems.map(item => (
                            <Card body key={item.id} style={{minWidth: 200}}>
                                <LinkContainer to="/QuestionsList">
                                    <Button onClick={(e) => this.props.onClick(e)} name={item.field}>#{item.field}</Button>
                                </LinkContainer>
                                <small className="text-muted"> (10 questions)</small>
                            </Card>
                        ))}
                    </CardDeck>
                </Container>
            );
        }
    }
}

class QuestionsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            questionItems: [],
        }
    }

    componentDidMount() {
        fetch("http://localhost:8080/api/questions")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        questionItems: result
                    });
                    const {questionItems} = this.state;
                    return Promise.all(
                        questionItems.map(item => (
                            fetch("http://localhost:8080/api/users/" + item.userId)
                                .then(res => res.json())
                                .then(
                                    (result) => {
                                        item.userName = result.username;
                                        this.setState({
                                            questionItems: questionItems
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
                        isLoaded: true,
                        error
                    });
                })
    }

    render() {
        const {error, isLoaded, questionItems} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <Container style={{marginTop: 30, marginBottom: 30}}>
                    {
                        (this.props.tag) ?
                            <h2>Questions with {this.props.tag} </h2>
                            :
                            <h2>Recent questions</h2>
                    }
                    <Container>
                        <br/>
                        <Accordion>
                            <Card style={{width: 400}}>
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
                                                    data: {stroke: "#c43a31"},
                                                    parent: {border: "1px solid #ccc"}
                                                }}
                                                data={[
                                                    {x: 1, y: 2},
                                                    {x: 2, y: 3},
                                                    {x: 3, y: 5},
                                                    {x: 4, y: 4},
                                                    {x: 5, y: 7}
                                                ]}
                                            />
                                        </VictoryChart>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card style={{width: 400}}>
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
                                                    data: {stroke: "#c43a31"},
                                                    parent: {border: "1px solid #ccc"}
                                                }}
                                                data={[
                                                    {x: 1, y: 2},
                                                    {x: 2, y: 3},
                                                    {x: 3, y: 5},
                                                    {x: 4, y: 4},
                                                    {x: 5, y: 7}
                                                ]}
                                            />
                                        </VictoryChart>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion> <br/>
                        {questionItems.map(item => (
                            (item.tag === this.props.tag) ?
                                <Card key={item.id}>
                                    <Card.Body>
                                        <Card.Title><Link to='/Question' id={item.id} onClick={(e) => this.props.onClickQuestion(e)}>{item.title}</Link></Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">asked <TimeAgo date={item.createdAt}/> by {item.userName}</Card.Subtitle>
                                        <Card.Link><Link name='#tag1' onClick={(e) => this.props.onClickTag(e)}>#tag1</Link></Card.Link>
                                    </Card.Body>
                                    <Card.Footer>
                                        <small className="text-muted">Last updated <TimeAgo
                                            date={item.updatedAt}/></small>
                                    </Card.Footer>
                                </Card>
                                :
                                <Container />
                        ))}
                    </Container>
                </Container>
            );
        }
    }
}

class Question extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            questionItem: undefined,
        }
    }

    componentDidMount() {
        const { questionActive } = this.props;
        if (questionActive) {
            fetch("http://localhost:8080/api/answers/per-question?questionId=" + questionActive)
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            isLoaded: true,
                            questionItem: result
                        });
                        const { questionItem } = this.state;
                        return Promise.all([
                            fetch("http://localhost:8080/api/users/" + questionItem.userId)
                            .then(res => res.json())
                            .then(
                                (result) => {
                                    questionItem.userName = result.username;
                                    this.setState({
                                        questionItem : questionItem
                                    })
                                },
                                (error) => {
                                    this.setState({
                                        error
                                    });
                                }
                            ),
                            questionItem.answers.map(answer => (
                                fetch("http://localhost:8080/api/users/" + answer.userId)
                                    .then(res => res.json())
                                    .then(
                                        (result) => {
                                            answer.userName = result.username;
                                            this.setState({
                                                questionItem : questionItem
                                            })
                                        },
                                        (error) => {
                                            this.setState({
                                                error
                                            });
                                        }
                                    )
                            ))
                        ])
                    },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        });
                    })
        }
    }

    render() {
        if (!this.props.questionActive)
            return <Container />

        const {error, isLoaded, questionItem} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <Container  style={{marginTop:30, marginBottom:30}}>
                    <h2>{questionItem.title}</h2><br />
                    <Container>
                        <Card>
                            <Card.Body>
                                <Card.Title>{questionItem.body}</Card.Title>
                                <LinkContainer to="/QuestionsList" >
                                    <Card.Link><Link to='/QuestionsList' name='#tag1' onClick={(e) => this.props.onClickTag(e)}>#tag1</Link></Card.Link>
                                </LinkContainer>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">asked <TimeAgo date={questionItem.createdAt}/> by {questionItem.userName}</small>
                            </Card.Footer>
                        </Card>
                        <br /><h4>{questionItem.answers.length} Answers:</h4>
                        {questionItem.answers.map(answer => (
                            <Card key={answer.id}>
                                <Card.Body>
                                    <Card.Title>{answer.body}</Card.Title>
                                </Card.Body>
                                <Card.Footer>
                                    <small className="text-muted">answered <TimeAgo date={answer.createdAt}/> by {answer.userName}</small>
                                </Card.Footer>
                            </Card>
                        ))}
                    </Container>
                    <br />
                    <LinkContainer to="/AnswerQuestion"><Button>Answer!</Button></LinkContainer>
                </Container>
            )
        }
    }
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

class ActivityList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded1: false,
            isLoaded2: false,
            userId: undefined,
            userName: undefined,
            questionItems: [],
            answerItems: [],
        }
    }

    componentDidMount() {
        fetch("http://localhost:8080/api/users")
            .then(res => res.json())
            .then(
                (result) => {
                    result.forEach((item) => {
                        if (item.username == this.props.userName) {
                            this.setState({
                                userId: item.id,
                                userName: item.username
                            })
                        }
                    })
                    return (
                        Promise.all([
                            fetch("http://localhost:8080/api/questions/per-user?userId=" + this.state.userId + "&limit=all")
                                .then(res => res.json())
                                .then(
                                    (result) => {
                                        this.setState({
                                            isLoaded1: true,
                                            questionItems: result
                                        });
                                    },
                                    (error) => {
                                        this.setState({
                                            isLoaded1: true,
                                            error
                                        });
                                    }),
                            fetch("http://localhost:8080/api/answers/per-user?userId=" + this.state.userId + "&limit=all")
                                .then(res => res.json())
                                .then(
                                    (result) => {
                                        this.setState({
                                            isLoaded2: true,
                                            answerItems: result
                                        });
                                    },
                                    (error) => {
                                        this.setState({
                                            isLoaded2: true,
                                            error
                                        });
                                    })
                        ])
                    )
                },
                (error) => {
                    this.setState({
                        error
                    });
                }
            )
    }

    render() {
        const {error, isLoaded1, isLoaded2, questionItems, answerItems} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded1 || !isLoaded2) {
            return <div>Loading...</div>;
        } else {
            return (
                <Container style={{marginTop: 30, marginBottom: 30}}>
                    <Tabs defaultActiveKey="questions">
                        <Tab eventKey="questions" title="Questions">
                            {questionItems.map(item => (
                                <Card key={item.id}>
                                    <Card.Body>
                                        <Card.Title><Link to='/Question' id={item.id} onClick={(e) => this.props.onClickQuestion(e)}>{item.title}</Link></Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">asked <TimeAgo date={item.createdAt}/> by {this.state.userName}</Card.Subtitle>
                                        <Card.Link><Link name='#tag1' to='/QuestionsList' onClick={(e) => this.props.onClickTag(e)}>#tag1</Link></Card.Link>
                                    </Card.Body>
                                </Card>
                            ))}
                        </Tab>
                        <Tab eventKey="answers" title="Answers">
                            {answerItems.map(item => (
                                <Card key={item.id}>
                                    <Card.Body>
                                        <Card.Title><Link to='/Question' id={item.questionId} onClick={(e) => this.props.onClickQuestion(e)}>{item.body}</Link></Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">answered <TimeAgo date={item.createdAt}/> by {this.state.userName}</Card.Subtitle>
                                        <Card.Link><Link name='#tag1' to='/QuestionsList' onClick={(e) => this.props.onClickTag(e)}>#tag1</Link></Card.Link>
                                    </Card.Body>
                                </Card>
                            ))}
                        </Tab>
                    </Tabs>
                </Container>
            )
        }
    }
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

class Signin extends React.Component {
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
        fetch('http://localhost:8080/api/auth/login', requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.error)
                        this.setState({error : result.message})
                    else
                        this.props.onClick(result.access_token)
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

class CreateQuestion extends React.Component{
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
        fetch("http://localhost:8080/api/tags")
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
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.props.access_token},
            body: JSON.stringify({title: this.props.newQuestionTitle, body: this.props.newQuestionBody})
        };
        fetch('http://localhost:8080/api/questions', requestOptions)
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
                                <Form.Label>Tag</Form.Label>
                                {
                                    (this.props.createTag) ?
                                        <Form.Control as="select" disabled >
                                            <option value="0">Choose...</option>
                                        </Form.Control>
                                        :
                                        <Form.Control as="select" name="newQuestionTag" onChange={(e) => this.props.onChange(e)}>
                                            <option value="0">Choose...</option>
                                            {tagItems.map((item, index) => (
                                                <option value={index}>#{item.field}</option>
                                            ))}
                                        </Form.Control>
                                }
                            </Form.Group>
                            <Form.Group controlId="formHorizontalCheck">
                                <Form.Check onClick={() => this.props.onCreateTagRadio()} label="or create your own #tag !"/>
                            </Form.Group>
                            <Form.Group>
                                {
                                    (this.props.createTag) ?
                                        <InputGroup name="newQuestionTag" onChange={(e) => this.props.onChange(e)}>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>#</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl/>
                                        </InputGroup>
                                        :
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>#</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl disabled/>
                                        </InputGroup>
                                }
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

class AnswerQuestion extends React.Component{
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
        fetch("http://localhost:8080/api/questions")
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
        fetch('http://localhost:8080/api/answers', requestOptions)
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
                                    <Question/>
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

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isSigned: false,
            access_token: undefined,
            email: undefined,
            username: "jackie",
            password: "el_presidente",
            tag: undefined,
            questionActive: undefined,
            history: [],
            createTag: false,
            redirect: null,
            newQuestionTitle: undefined,
            newQuestionBody: undefined,
            newQuestionTag: undefined,
            newAnswerBody: undefined
        };
    }

    handleChange = (event) => this.setState({[event.target.name]: event.target.value });

    handleSignin = (access_token) => this.setState({isSigned : true, access_token: access_token, redirect: "/", history: []});

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
                this.setState({tag: name, history:["Tags","#"+name]})
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
        else if (history[0] === "Answer Question")
            this.setState({questionActive: id, history: ["Answer Question", "Question"+id]});
        else if (history[1] === "Answer Question")
            this.setState({questionActive: id, history: ["My Home", "Answer Question", "Question"+id]});
        else {
            history.push("Question"+id)
            this.setState({questionActive: id, history:history});
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
                        <Navbar.Text>Signed in as: <LinkContainer to="/myHome" onClick={()=> this.handleMyHomeLink()}><Link>{this.state.username}</Link></LinkContainer></Navbar.Text>
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
        else if (history[0] == "Answer Question") {
            return(
                <Breadcrumb>
                    <Breadcrumb.Item></Breadcrumb.Item>
                    <LinkContainer to="/AnswerQuestion" onClick={() => this.handleAnswerQuestionButton()}><Breadcrumb.Item>Answer Question</Breadcrumb.Item></LinkContainer>
                    <BreadcrumbItem active>{history[1]}</BreadcrumbItem>
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
                    <LinkContainer to="/ActivityList" onClick={() => this.handleActivityListButton()}><Breadcrumb.Item>{history[1]}</Breadcrumb.Item></LinkContainer>
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
                                userName = {this.state.username}
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
                            <QuestionsList
                                tag = {this.state.tag}
                                onClickQuestion={(event) => this.handleQuestionLink(event)}
                                onClickTag={(event) => this.handleTagButton(event)}
                            />
                        </Route>
                        <Route path="/Question">
                            <Question
                                questionActive = {this.state.questionActive}
                                onClickQuestion={(event) => this.handleQuestionLink(event)}
                                onClickTag={(event) => this.handleTagButton(event)}
                            />
                        </Route>
                        <Route path="/CreateQuestion">
                            <CreateQuestion
                                createTag = {this.state.createTag}
                                isSigned = {this.state.isSigned}
                                newQuestionTitle = {this.state.newQuestionTitle}
                                newQuestionBody = {this.state.newQuestionBody}
                                access_token = {this.state.access_token}
                                onChange = {(e) => this.handleChange(e)}
                                onCreateTagRadio = {() => this.handleCreateTagRadio()}
                            />
                        </Route>
                        <Route path="/AnswerQuestion">
                            <AnswerQuestion
                                isSigned = {this.state.isSigned}
                                newAnswerBody = {this.state.newAnswerBody}
                                questionActive = {this.state.questionActive}
                                access_token = {this.state.access_token}
                                onChange = {(e) => this.handleChange(e)}
                                onQuestionLink = {(e) => this.handleQuestionLink(e)}
                            />
                        </Route>
                        <Route path="/sign_up">
                            <Signup
                                onChange={(event) => this.handleChange(event)}
                                onClick={(event) => this.handleSignin(event)}
                            />
                        </Route>
                        <Route path="/sign_in">
                            <Signin
                                redirect = {this.state.redirect}
                                username = {this.state.username}
                                password = {this.state.password}
                                onChange={(event) => this.handleChange(event)}
                                onClick={(access_token) => this.handleSignin(access_token)}
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