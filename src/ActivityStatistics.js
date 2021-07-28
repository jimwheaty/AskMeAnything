import React from "react";
import {Card, Col, Container, Form, Row} from "react-bootstrap";
import {VictoryAxis, VictoryBar, VictoryChart, VictoryTheme} from "victory";
import {backend_url} from "./App";

export class ActivityStatistics extends React.Component {
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
