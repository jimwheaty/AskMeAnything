import React from "react";
import {Accordion, Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {VictoryAxis, VictoryBar, VictoryChart, VictoryTheme} from "victory";
import {Link} from "react-router-dom";
import TimeAgo from "react-timeago";
import {backend_url} from "./App";

export class QuestionsList extends React.Component {
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
