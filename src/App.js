import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {
    Breadcrumb, BreadcrumbItem, Button, ButtonGroup, Card, CardDeck, Col, Container,
    Form, Jumbotron, Nav, Navbar, Row, Accordion, InputGroup, Alert, Tabs, Tab
} from "react-bootstrap";
import { MemoryRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { VictoryChart, VictoryAxis, VictoryTheme, VictoryPie, VictoryBar } from 'victory'
import TimeAgo from 'react-timeago'

let backend_url = "https://askmeanything2021server.herokuapp.com"

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
        alert(backend_url)
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

    render() {
        const {error, isLoaded, tagItems} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            let data = []
            tagItems.map(item => (
                data.push({x: item.field, y: item.count})
            ))
            return (
                <Container style={{marginTop: 30, marginBottom: 30}}>
                    <h2>Most popular Tags</h2><br/>
                    <Container  >
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
                                            data={data}
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
                            <Card body style={{minWidth: 200}}>
                                <LinkContainer to="/QuestionsList">
                                    <Button onClick={(e) => this.props.onClick(e)} name={item.field}>#{item.field}</Button>
                                </LinkContainer>
                                <small className="text-muted"> ({item.count} questions)</small>
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
            questionStats: [],
            year: this.props.year,
            month: this.props.month
        }
    }

    fetchStats(year, month) {
        fetch(backend_url + "/api/stats/questions-by-date?year=" + year + "&month=" + month)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({questionStats: result, isLoaded: true})
                },
                (error) => {
                    this.setState({error, isLoaded: true})
                }
            )
    }

    onSelectYear(event) {
        let year = event.target.value
        this.setState({year: year})
        this.fetchStats(year, this.state.month)
    }

    onSelectMonth(event) {
        let month = event.target.value
        month = (month <= 9) ? ("0"+month) : month;
        this.setState({month: month})
        this.fetchStats(this.state.year, month)
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
                    return this.fetchStats(this.props.year, this.props.month)
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                })
    }

    render() {
        const {error, isLoaded, questionItems, questionStats} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            let dayStatsData = []
            let monthStatsData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            questionStats.map(item => (
                dayStatsData.push({x: parseInt(item.day), y: parseInt(item.count)}),
                monthStatsData[parseInt(item.month)] += item.count
            ))
            return (
                <Container style={{marginTop: 30, marginBottom: 30}}>
                    {
                        (this.props.tag) ?
                            <h2>Questions with #{this.props.tag} </h2>
                            :
                            <h2>Recent questions</h2>
                    }
                    <Container>
                        <Accordion>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                        View Statistical Graphs !
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Card.Body>
                                    <Accordion.Collapse eventKey="1">
                                        <Row>
                                            <Col sm={2}>
                                                <Form>
                                                    <Form.Group>
                                                        <Form.Label>Select a year</Form.Label>
                                                        <Form.Control as="select" custom onChange={(e) => this.onSelectYear(e)}>
                                                            <option>Choose...</option>
                                                            <option value={2021}>2021</option>
                                                            <option value={2020}>2020</option>
                                                            <option value={2019}>2019</option>
                                                        </Form.Control>
                                                    </Form.Group>
                                                    <Form.Group controlId="exampleForm.SelectCustom">
                                                        <Form.Label>and a month !</Form.Label>
                                                        <Form.Control as="select" custom onChange={(e) => this.onSelectMonth(e)}>
                                                            <option>Choose...</option>
                                                            <option value={1}>Ιανουάριος</option>
                                                            <option value={2}>Φεβρουάριος</option>
                                                            <option value={3}>Μάρτιος</option>
                                                            <option value={4}>Απρίλιος</option>
                                                            <option value={5}>Μάιος</option>
                                                            <option value={6}>Ιούνιος</option>
                                                            <option value={7}>Ιούλιος</option>
                                                            <option value={8}>Αύγουστος</option>
                                                            <option value={9}>Σεπτέμβριος</option>
                                                            <option value={10}>Οκτώμβριος</option>
                                                            <option value={11}>Νοέμβριος</option>
                                                            <option value={12}>Δεκέμβριος</option>
                                                        </Form.Control>
                                                    </Form.Group>
                                                </Form>
                                            </Col>
                                            <Col sm={5}>
                                                <Card>
                                                    <Card.Header>
                                                        Questions per month Graph ! <br/>
                                                        Year: {this.state.year}
                                                    </Card.Header>
                                                    <Card.Body>
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
                                                                         minDomain={0}
                                                                         label="Number of Questions"
                                                                         style={{axisLabel: {fontSize: 20, padding: 30}}}
                                                            />
                                                            <VictoryBar
                                                                style={{ data: { fill: "#c43a31" } }}
                                                                barWidth={8}
                                                                data={monthStatsData}
                                                            />
                                                        </VictoryChart>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                            <Col sm={5}>
                                                <Card>
                                                    <Card.Header>
                                                        Questions per day Graph ! <br/>
                                                        Month: {this.state.month}, Year: {this.state.year}
                                                    </Card.Header>
                                                    <Card.Body>
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
                                                                         label="Number of Questions"
                                                                         style={{axisLabel: {fontSize: 20, padding: 30}}}
                                                            />
                                                            <VictoryBar
                                                                style={{ data: { fill: "#c43a31" } }}
                                                                barWidth={8}
                                                                data={dayStatsData}
                                                            />
                                                        </VictoryChart>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </Accordion.Collapse>
                                </Card.Body>
                            </Card>
                        </Accordion> <br/>
                        {this.props.tag ?
                            questionItems.map(item => (
                                item.tags.map(tag =>
                                    (tag.field === this.props.tag) ?
                                        <Card key={item.id}>
                                            <Card.Body>
                                                <Card.Title><Link to='/Question' id={item.id} onClick={(e) => this.props.onClickQuestion(e)}>{item.title}</Link></Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">asked <TimeAgo date={item.createdAt}/> by {item.user.username}</Card.Subtitle>
                                                {item.tags.map(tag =>
                                                    <Card.Link><Link name={tag.field} onClick={(e) => this.props.onClickTag(e)}>#{tag.field}</Link></Card.Link>
                                                )}
                                            </Card.Body>
                                            <Card.Footer>
                                                <small className="text-muted">Last updated <TimeAgo date={item.updatedAt}/></small>
                                            </Card.Footer>
                                        </Card>
                                        :
                                        <Container />
                                )
                            ))
                            :
                            questionItems.map(item => (
                                <Card key={item.id}>
                                    <Card.Body>
                                        <Card.Title><Link to='/Question' id={item.id} onClick={(e) => this.props.onClickQuestion(e)}>{item.title}</Link></Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">asked <TimeAgo date={item.createdAt}/> by {item.user.username}</Card.Subtitle>
                                        {item.tags.map(tag =>
                                            <Card.Link><Link name={tag.field} onClick={(e) => this.props.onClickTag(e)}>#{tag.field}</Link></Card.Link>
                                        )}
                                    </Card.Body>
                                    <Card.Footer>
                                        <small className="text-muted">Last updated <TimeAgo date={item.updatedAt}/></small>
                                    </Card.Footer>
                                </Card>
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
            questionActive: undefined
        }
    }

    fetchQuestions() {
        fetch(backend_url + "/api/questions/" + this.props.questionActive)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        questionItem: result
                    });
                    const { questionItem } = this.state;
                    return questionItem.answers.map(answer => (
                        fetch(backend_url + "/api/users/" + answer.userId)
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
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                })
    }

    render() {
        let {questionActive} = this.props;
        if (!questionActive)
            return <Container/>
        else if (this.state.questionActive != questionActive) {
            this.setState({questionActive: questionActive})
            this.fetchQuestions()
        }

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
                                {questionItem.tags.map(tag =>
                                    <Card.Link><Link to='/QuestionsList' name={tag.field} onClick={(e) => this.props.onClickTag(e)}>#{tag.field}</Link></Card.Link>
                                )}
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">asked <TimeAgo date={questionItem.createdAt}/> by {questionItem.user.username}</small>
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
            questionItems: [],
            answerItems: [],
        }
    }

    componentDidMount() {
        fetch(backend_url + "/api/questions/per-user?userId=" + this.props.userId + "&limit=all")
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
                })
        fetch(backend_url + "/api/answers/per-user?userId=" + this.props.userId + "&limit=all")
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
                                        <Card.Subtitle className="mb-2 text-muted">asked <TimeAgo date={item.createdAt}/> by {this.props.userName}</Card.Subtitle>
                                        {item.tags.map(tag =>
                                                <Card.Link><Link to='/QuestionsList' name={tag.field} onClick={(e) => this.props.onClickTag(e)}>#{tag.field}</Link></Card.Link>
                                        )}
                                    </Card.Body>
                                </Card>
                            ))}
                        </Tab>
                        <Tab eventKey="answers" title="Answers">
                            {answerItems.map(item => (
                                <Card key={item.id}>
                                    <Card.Body>
                                        <Card.Title><Link to='/Question' id={item.questionId} onClick={(e) => this.props.onClickQuestion(e)}>{item.body}</Link></Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">answered <TimeAgo date={item.createdAt}/> by {this.props.userName}</Card.Subtitle>
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

class ActivityStatistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            questionStats: [],
            answerStats: [],
            year: this.props.year,
            month: this.props.month
        }
    }

    fetchData(year, month) {
        fetch(backend_url + "/api/stats/questions-by-date?userId=" + this.props.userId + "&year=" + year + "&month=" + month)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({questionStats: result, isLoaded: true})
                },
                (error) => {
                    this.setState({error, isLoaded: true})
                }
            )
        fetch(backend_url + "/api/stats/answers-by-date?userId=" + this.props.userId + "&year=" + year + "&month=" + month)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({answerStats: result, isLoaded: true})
                },
                (error) => {
                    this.setState({error, isLoaded: true})
                }
            )
    }

    componentDidMount = () => this.fetchData(this.props.year, this.props.month)

    onSelectYear(event) {
        let year = event.target.value
        this.setState({year: year})
        this.fetchData(year, this.state.month)
    }

    onSelectMonth(event) {
        let month = event.target.value
        month = (month <= 9) ? ("0"+month) : month;
        this.setState({month: month})
        this.fetchData(this.state.year, month)
    }

    render() {
        const {error, isLoaded, questionStats, answerStats} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            let questionData = []
            questionStats.map(item => questionData.push({x: parseInt(item.day), y: parseInt(item.count)}));
            let answerData = []
            answerStats.map(item => answerData.push({x: parseInt(item.day), y: parseInt(item.count)}));
            return (
                <Container style={{marginTop: 30, marginBottom: 30}}>
                    <Row>
                        <Col sm={2}>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Select a year</Form.Label>
                                    <Form.Control as="select" custom onChange={(e) => this.onSelectYear(e)}>
                                        <option>Choose...</option>
                                        <option value={2021}>2021</option>
                                        <option value={2020}>2020</option>
                                        <option value={2019}>2019</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="exampleForm.SelectCustom">
                                    <Form.Label>and a month !</Form.Label>
                                    <Form.Control as="select" custom onChange={(e) => this.onSelectMonth(e)}>
                                        <option>Choose...</option>
                                        <option value={1}>Ιανουάριος</option>
                                        <option value={2}>Φεβρουάριος</option>
                                        <option value={3}>Μάρτιος</option>
                                        <option value={4}>Απρίλιος</option>
                                        <option value={5}>Μάιος</option>
                                        <option value={6}>Ιούνιος</option>
                                        <option value={7}>Ιούλιος</option>
                                        <option value={8}>Αύγουστος</option>
                                        <option value={9}>Σεπτέμβριος</option>
                                        <option value={10}>Οκτώμβριος</option>
                                        <option value={11}>Νοέμβριος</option>
                                        <option value={12}>Δεκέμβριος</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col sm={5}>
                            <Card>
                                <Card.Header>
                                    Questions per day Graph ! <br/>
                                    Month: {this.state.month}, Year: {this.state.year}
                                </Card.Header>
                                <Card.Body>
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
                                                     label="Number of Questions"
                                                     style={{axisLabel: {fontSize: 20, padding: 30}}}
                                        />
                                        <VictoryBar
                                            style={{ data: { fill: "#c43a31" } }}
                                            barWidth={8}
                                            data={questionData}
                                        />
                                    </VictoryChart>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={5}>
                            <Card>
                                <Card.Header>
                                    Answers per day Graph ! <br/>
                                    Month: {this.state.month}, Year: {this.state.year}
                                </Card.Header>
                                <Card.Body>
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
                                                     label="Number of Answers"
                                                     style={{axisLabel: {fontSize: 20, padding: 30}}}
                                        />
                                        <VictoryBar
                                            style={{ data: { fill: "#c43a31" } }}
                                            barWidth={8}
                                            data={answerData}
                                        />
                                    </VictoryChart>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            )
        }
    }
}

class Signup extends React.Component{
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
        fetch('http://localhost:8080/api/users', requestOptions)
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
        fetch('http://localhost:8080/api/questions', requestOptions)
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
                            fetch('http://localhost:8080/api/tags', requestOptions)
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

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isSigned: false,
            access_token: undefined,
            userId: undefined,
            email: undefined,
            username: "jackie",
            password: "el_presidente",
            tag: undefined,
            questionActive: undefined,
            history: [],
            redirect: null,
            newQuestionTitle: undefined,
            newQuestionBody: undefined,
            newQuestionTags: {old: [], new: [], combined: []},
            newAnswerBody: undefined,
            year: undefined,
            month: undefined,
            day: undefined
        };
    }

    componentDidMount() {
        let today = new Date();
        let month = today.getMonth() + 1;
        month = (month <= 9) ? ("0"+month) : month;
        this.setState({year: today.getFullYear() , month: month , day: today.getDate() });
    }

    handleChange = (event) => this.setState({[event.target.name]: event.target.value });

    handleChangeTags = (event) => {
        let options = event.target.selectedOptions
        let stateTags = this.state.newQuestionTags
        if (options){
            stateTags['old'] = []
            for (let i = 0; i < options.length; i++)
                stateTags['old'] += (' #' + options.item(i).value)
            stateTags['combined'] = stateTags['new'] + stateTags['old']
        }
        else {
            stateTags['new'] = []
            let value = event.target.value
                if (value)
                    value.split(' ').map(item => stateTags['new'] += ' #' + item)
            stateTags['combined'] = stateTags['old'] + stateTags['new']
        }
        stateTags['combined'] = stateTags['combined'].trim()
        this.setState({newQuestionTags: stateTags})
    }

    handleSignin = (access_token) => this.setState({isSigned : true, access_token: access_token, redirect: "/", history: []});

    handleUserId = (userId) => this.setState({userId: userId})

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

    handleCreateQuestionButton = () => {
        const history = this.state.history.slice();
        history.push('Create Question')
        this.setState({history: history})
    }
    handleAnswerQuestionButton = () => {
        let history = this.state.history.slice();
        if (history[0] === "Tags")
            history = ["Questions", history[2]]
        history.push('Answer Question')
        this.setState({history: history})
    }

    CustomNavbar = () => {
        return (
            (this.state.isSigned === false) ?
                <Navbar bg="dark" variant="dark" className="justify-content-between">
                    <LinkContainer to="/" ><Button onClick={()=> this.handleHomeButton()} variant="outline-secondary">Home</Button></LinkContainer>
                    <Nav>
                        <LinkContainer to="/sign_up">
                            <Button variant="outline-secondary">Signup !</Button>
                        </LinkContainer>
                        <LinkContainer to="/sign_in">
                            <Button variant="outline-secondary">Signin !</Button>
                        </LinkContainer>
                    </Nav>
                </Navbar>
                :
                <Navbar bg="dark" expand="lg" variant="dark" className="justify-content-between">
                    <LinkContainer to="/" ><Button onClick={()=> this.handleHomeButton()} variant="outline-secondary" >Home</Button></LinkContainer>
                    <Nav>
                        <Navbar.Text>Signed in as: <LinkContainer to="/myHome" onClick={()=> this.handleMyHomeLink()}><Link>{this.state.username}</Link></LinkContainer></Navbar.Text>
                        <LinkContainer to="/">
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
        else if (history[0] == "Questions") {
            return(
                <Breadcrumb>
                    <Breadcrumb.Item></Breadcrumb.Item>
                    <LinkContainer to="/QuestionsList" onClick={() => this.handleQuestionsListButton()}><Breadcrumb.Item>Questions</Breadcrumb.Item></LinkContainer>
                    <Breadcrumb.Item active>{history[1]}</Breadcrumb.Item>
                </Breadcrumb>
            )
        }
        else if (history[0] == "Tags" && history.length == 2) {
            return(
                <Breadcrumb>
                    <Breadcrumb.Item></Breadcrumb.Item>
                    <LinkContainer to="/Tags" onClick={() => this.handleTagsButton()}><Breadcrumb.Item>Tags</Breadcrumb.Item></LinkContainer>
                    <Breadcrumb.Item active>{history[1]}</Breadcrumb.Item>
                </Breadcrumb>
            )
        }
        else if (history[0] == "Tags") {
            return(
                <Breadcrumb>
                    <Breadcrumb.Item></Breadcrumb.Item>
                    <LinkContainer to="/Tags" onClick={() => this.handleTagsButton()}><Breadcrumb.Item>Tags</Breadcrumb.Item></LinkContainer>
                    <LinkContainer to="/QuestionsList" onClick={(e) => this.handleTagButton(e)}><Breadcrumb.Item>{history[1]}</Breadcrumb.Item></LinkContainer>
                    <Breadcrumb.Item active>{history[2]}</Breadcrumb.Item>
                </Breadcrumb>
            )
        }
        else if (history[0] == "Answer Question") {
            return(
                <Breadcrumb>
                    <Breadcrumb.Item></Breadcrumb.Item>
                    <LinkContainer to="/AnswerQuestion" onClick={() => this.handleAnswerQuestionButton()}><Breadcrumb.Item>Answer Question</Breadcrumb.Item></LinkContainer>
                    <Breadcrumb.Item active>{history[1]}</Breadcrumb.Item>
                </Breadcrumb>
            )
        }
        else if (history[0] == "My Home" && history.length == 2) {
            return(
                <Breadcrumb>
                    <Breadcrumb.Item></Breadcrumb.Item>
                    <LinkContainer to="/myHome" onClick={() => this.handleMyHomeLink()}><Breadcrumb.Item>My Home</Breadcrumb.Item></LinkContainer>
                    <Breadcrumb.Item active>{history[1]}</Breadcrumb.Item>
                </Breadcrumb>
            )
        }
        else if (history[0] == "My Home") {
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
                                userId = {this.state.userId}
                                userName = {this.state.username}
                                onClickQuestion={(event) => this.handleQuestionLink(event)}
                                onClickTag={(event) => this.handleTagButton(event)}
                            />
                        </Route>
                        <Route path="/ActivityStatistics">
                            <ActivityStatistics
                                year = {this.state.year}
                                month = {this.state.month}
                                day = {this.state.day}
                                userId = {this.state.userId}
                            />
                        </Route>
                        <Route path="/Tags">
                            <Tags
                                onClick={(event) => this.handleTagButton(event)}
                            />
                        </Route>
                        <Route path="/QuestionsList">
                            <QuestionsList
                                year = {this.state.year}
                                month = {this.state.month}
                                day = {this.state.day}
                                tag = {this.state.tag}
                                onClickQuestion={(event) => this.handleQuestionLink(event)}
                                onClickTag={(event) => this.handleTagButton(event)}
                            />
                        </Route>
                        <Route path="/Question">
                            <Question
                                questionActive = {this.state.questionActive}
                                onClickTag={(event) => this.handleTagButton(event)}
                            />
                        </Route>
                        <Route path="/CreateQuestion">
                            <CreateQuestion
                                isSigned = {this.state.isSigned}
                                newQuestionTitle = {this.state.newQuestionTitle}
                                newQuestionBody = {this.state.newQuestionBody}
                                newQuestionTags = {this.state.newQuestionTags}
                                access_token = {this.state.access_token}
                                onChange = {(e) => this.handleChange(e)}
                                onChangeTags = {(e) => this.handleChangeTags(e)}
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
                                onClickTag={(event) => this.handleTagButton(event)}
                            />
                        </Route>
                        <Route path="/sign_up">
                            <Signup
                                username = {this.state.username}
                                password = {this.state.password}
                                email = {this.state.email}
                                onChange={(event) => this.handleChange(event)}
                                onClick={(access_token) => this.handleSignin(access_token)}
                            />
                        </Route>
                        <Route path="/sign_in">
                            <Signin
                                redirect = {this.state.redirect}
                                username = {this.state.username}
                                password = {this.state.password}
                                onUserId = {(userId) => this.handleUserId(userId)}
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