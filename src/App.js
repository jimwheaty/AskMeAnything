import 'bootstrap/dist/css/bootstrap.min.css'; //npm install bootstrap
import logo from './logo.svg';
// import './App.css';

function App() {
  return (
    <div className="App">
      <div className="jumbotron text-center" style={{marginBottom:0}}>
        <h1>Ask me Anything !</h1>
        <p>Welcome to our app </p>
      </div>
      <nav className="navbar bg-dark navbar-dark">
          <a className="navbar-brand" href="#">AskMeAnything</a>
          <ul className="nav navbar-nav navbar-right">
            <li className="nav-item">
                <a className="nav-link" href="#">Sign Up!</a>
            </li>
          </ul>
      </nav>

      <div className="container" style={{marginTop:30}}>
          <div className="row">
              <div className="col-sm-3">
                  <div className="jumbotron">
                      <h2>Questions per keyword</h2>
                      <div className="dropdown">
                          <button className="btn btn-primary dropdown-toggle" type="button"
                                  data-toggle="dropdown">Dropdown Example
                              <span className="caret"></span></button>
                          <ul className="dropdown-menu">
                              <li><a href="#">HTML</a></li>
                              <li><a href="#">CSS</a></li>
                              <li><a href="#">JavaScript</a></li>
                          </ul>
                      </div>
                  </div>
              </div>
              <div className="col-sm-3">
                  <div className="jumbotron">
                      <h2>Questions per day/period</h2>
                  </div>
              </div>
              <div className="col-sm-3">
                  <div className="jumbotron">
                      <h2>Ask a Question</h2>
                  </div>
              </div>
              <div className="col-sm-3">
                  <div className="jumbotron">
                      <h2>Answer a Question</h2>
                  </div>
              </div>
          </div>
      </div>

      <div className="jumbotron text-center" style={{marginBottom:0}}>
          <kbd>Powered by React and Bootstrap</kbd>
      </div>
    </div>
  );
}

export default App;
