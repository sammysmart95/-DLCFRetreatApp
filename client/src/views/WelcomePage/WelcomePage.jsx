import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button } from "../../components";
import { Row, Col } from "reactstrap";
import { config } from "../../config";
import Theme from "../../theme";
import "./WelcomePage.css";
import { login } from "../../actions/auth";
import { callApi } from "../../utils/index";
import logo from "../../assets/imgs/logo.png";

class WelcomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: this.props.authenticated
    };
  }

  componentDidMount() {
    if (!this.props.authenticated) {
      callApi("/me")
        .then(response => {
          if (response.authenticated) {
            this.setState({
              authenticated: true
            });
          } else {
            this.setState({ authenticated: false });
          }
        })
        .catch(err => {
          this.setState({ authenticated: false });
        });
    } else {
      this.setState({ authenticated: true });
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-body">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>
            Welcome to {config.programName}, {config.year}
          </h2>
          <h4>(Campus Section)</h4>
        </div>
        <div className="footer-button">
          <Row className="button-container" >
            <Col md={3}>
              <Link to="/app">
                <Button fullWidth color={Theme.BaseGreen}>
                  Go To App
                </Button>
              </Link>
            </Col>
            <Col md={3}>
              <Link
                to={
                  !this.state.authenticated
                    ? "/login"
                    : "/auth/adminAppPage"
                }
              >
                <Button fullWidth color={Theme.BaseRed}>
                  {!this.state.authenticated ? "Admin Login" : "Admin Menu"}
                </Button>
              </Link>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated,
  };
};

export default connect(mapStateToProps)(WelcomePage);
