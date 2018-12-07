import React, { Component } from "react";
import logo from "../../logo.svg";
import "./WelcomePage.css";
import { Button } from "../../components";
import { callApi } from "../../utils";
import { config } from '../../config'

class WelcomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  // verifyServerRunning = () => {
  //   callApi("/express_backend")
  //     .then(data => {
  //       console.log(data)
  //     })
  //     .catch(err => console.log(err));
  // };

  componentDidMount() {
    // this.verifyServerRunning()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to {config.programName}, {config.year}</h2>
          <div className="footer-button">
            <Button fullWidth >Go To App</Button>
          </div>
        </header>
      </div>
    );
  }
}

export default WelcomePage;
