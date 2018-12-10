import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components";
import { Row, Col } from "reactstrap";
import { config } from "../../config";
import Theme from "../../theme";
import "./WelcomePage.css";
import { callApi } from '../../utils/index'
import logo from '../../assets/imgs/logo.png'

class WelcomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  verifyServerRunning = () => {
    callApi("/api/me")
      .then(data => {
        console.log(data)
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    // this.verifyServerRunning()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>
            Welcome to {config.programName}, {config.year}
          </h2>
          <div className="footer-button">
            <Row>
              <Col md={3}/>
              <Col md={3}>
                <Link to="/app">
                  <Button fullWidth color={Theme.BaseGreen}>
                    Go To App
                  </Button>
                </Link>
              </Col>
              <Col md={3}>
                <Link to="/login">
                  <Button fullWidth color={Theme.BaseRed}>
                    Admin Login
                  </Button>
                </Link>
              </Col>
            </Row>
          </div>
        </header>
      </div>
    );
  }
}

export default WelcomePage;
