import React from "react";
import {Card, Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import TimeAgo from "react-timeago";
import {backend_url} from "./App";

export class Question extends React.Component {
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
