import React from "react";
import {Accordion, Button, Card, CardDeck, Col, Container, Row} from "react-bootstrap";
import {VictoryPie} from "victory";
import {LinkContainer} from "react-router-bootstrap";
import {stats_url} from "./App";

export class Tags extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            tagItems: [],
        }
    }

    componentDidMount() {
        fetch(stats_url + "/api/stats/popular-tags")
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
                            <Row><Col sm={5}>
                                <Card style={{maxWidth: 450}}>
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
                            </Col></Row>
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
