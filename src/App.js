import 'bootstrap/dist/css/bootstrap.min.css'; //npm install bootstrap
import {Col, Container, Dropdown, FormControl, Jumbotron, Nav, Navbar, NavLink, Row} from "react-bootstrap";

function App() {
  return (
    <Col>
    <div className="jumbotron text-center" style={{marginBottom:0}}>
        <h1>Ask me Anything</h1>
        <p>All your question and answers in one place!!</p>
    </div>
      <Navbar bg="dark" expand="lg" variant="dark" className="justify-content-between">
          <Navbar.Brand href="#home">AskMeAnything</Navbar.Brand>
          <NavLink href="#signup">Sign Up!</NavLink>
      </Navbar>

      <Container style={{marginTop:30}}>
          <Row>
              <Col sm={3}>
                  <Jumbotron>
                      <h2>Questions per keyword</h2>
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
              </Col>
              <Col sm={3}>
                  <Jumbotron>
                      <h2>Questions per day/period</h2>
                  </Jumbotron>
              </Col>
              <Col sm={3}>
                  <Jumbotron>
                      <h2>Ask a Question</h2>
                  </Jumbotron>
              </Col>
              <Col sm={3}>
                  <Jumbotron>
                      <h2>Answer a Question</h2>
                  </Jumbotron>
              </Col>
          </Row>
      </Container>
      <div className="jumbotron text-center" style={{marginBottom:0}}>
          <kbd>Powered by React and Bootstrap</kbd>
      </div>
    </Col>
  );
}

export default App;
