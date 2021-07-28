import React from "react";
import {Card, Container, Tab, Tabs} from "react-bootstrap";
import {Link} from "react-router-dom";
import TimeAgo from "react-timeago";
import {backend_url} from "./App";

export class ActivityList extends React.Component {
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
