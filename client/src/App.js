import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { callApi } from "./utils";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  verifyServerRunning = () => {
    callApi("/express_backend")
      .then(data => {
        console.log(data)
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.verifyServerRunning()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
