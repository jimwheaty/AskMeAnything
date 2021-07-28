import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {Breadcrumb, BreadcrumbItem, Button, Col, Nav, Navbar} from "react-bootstrap";
import {MemoryRouter, Switch, Route, Link} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';
import {Home} from "./Home"
import {Tags} from "./Tags"
import {QuestionsList} from "./QuestionsList";
import {Question} from "./Question";
import {MyHome} from "./MyHome";
import {ActivityList} from "./ActivityList";
import {ActivityStatistics} from "./ActivityStatistics";
import {Signup} from "./Signup";
import {Signin} from "./Signin";
import {CreateQuestion} from "./CreateQuestion";
import {AnswerQuestion} from "./AnswerQuestion";

<<<<<<< HEAD
export let backend_url = "https://localhost:8080"
export let auth_url = "https://localhost:8070"
export let stats_url = "https://localhost:8060"
=======
export let backend_url = "https://askmeanything2021server.herokuapp.com"
>>>>>>> parent of ff2933f (changing url for soa in heroku)

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
                        <Nav.Item style={{paddingRight:10}}>
                            <LinkContainer to="/sign_up">
                                <Button variant="outline-secondary">Signup !</Button>
                            </LinkContainer>
                        </Nav.Item>
                        <Nav.Item>
                            <LinkContainer to="/sign_in">
                                <Button variant="outline-secondary">Signin !</Button>
                            </LinkContainer>
                        </Nav.Item>
                    </Nav>
                </Navbar>
                :
                <Navbar bg="dark" expand="lg" variant="dark" className="justify-content-between">
                    <LinkContainer to="/" ><Button onClick={()=> this.handleHomeButton()} variant="outline-secondary" >Home</Button></LinkContainer>
                    <Nav>
                        <Navbar.Text style={{paddingRight:10}}>Signed in as: <LinkContainer to="/myHome" onClick={()=> this.handleMyHomeLink()}><Link>{this.state.username}</Link></LinkContainer></Navbar.Text>
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