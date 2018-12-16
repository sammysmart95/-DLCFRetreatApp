import React, { Component } from "react";
import { Card, Button, CardBody, CardHeader, Row, Col } from "reactstrap";
import { showError, showInfo } from "../../actions/feedback";
import { connect } from "react-redux";
import BlockUI from "react-block-ui";
import { callApi } from "../../utils";
import { Link } from 'react-router-dom'
import "./Feedback.css";

class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      blocking: false,
      inputs: {
        fullName: "",
        gender: "",
        address: "",
        phoneNumber: "",
        email: "",
        status: "",
        denomination: "",
        category: "",
        institution: "",
        course: "",
        ageGroup: "",
        group: "",
      },
      success: false
    };
  }

  submit = () => {
    const {
      fullName,
      gender,
      address,
      phoneNumber,
      status,
      denomination,
      category,
      ageGroup,
      group,
    } = this.state.inputs;

    if (!fullName) {
      return this.props.dispatch(showError("Provide a Full Name"));
    }
    if (!gender) {
      return this.props.dispatch(showError("Select gender"));
    }
    if (!address) {
      return this.props.dispatch(showError("Provide address"));
    }
    if (!phoneNumber) {
      return this.props.dispatch(showError("Provide phone number"));
    }
    if (!denomination) {
      return this.props.dispatch(showError("Provide denomination"));
    }
    if (!category || !status) {
      return this.props.dispatch(showError("Select a category"));
    }
    if (status === 'member') {
      if (!group) {
        return this.props.dispatch(showError("Select a group"));
      }
    }
    if (!ageGroup) {
      return this.props.dispatch(showError("Select age group"));
    }
    this.setState({
      ...this.state,
      blocking: true
    });
    callApi("/registerParticipant", this.state.inputs, "POST")
      .then(data => {
        this.props.dispatch(showInfo(data.message));
        this.setState({
          success: true,
          blocking: false
        });
      })
      .catch(err => {
        this.setState({
          blocking: false
        });
        this.props.dispatch(
          showError("Phone number or email has already been used")
        );
      });
  };

  handleInputChange = e => {
    let { name, value } = e.target;
    let expectedInputs = {
      ...this.state.inputs,
      [name]: value
    };
    this.setState({
      ...this.state,
      inputs: {
        ...expectedInputs
      }
    });
  };

  render() {
    const {
      fullName,
      address,
      phoneNumber,
      email,
      denomination,
      institution,
      course,
      group,
      status
    } = this.state.inputs;
    return (
      <div className="body-page-container">
        <div className="header">
          <CardHeader
            style={{
              textAlign: "center",
              backgroundColor: "#fff",
              fontSize: "20px",
              color: "#54688f"
            }}
          >
            Registration
          </CardHeader>
        </div>
        <div className="body-container">
          <BlockUI blocking={this.state.blocking}>
            {!this.state.success ? (
              <Card>
                <CardBody>
                  <Row>
                    <Col md={6}>
                      <label htmlFor="inp" className="inp">
                        <input
                          type="text"
                          id="inp"
                          placeholder="&nbsp;"
                          className="styled-input"
                          name="fullName"
                          value={fullName}
                          onChange={this.handleInputChange}
                        />
                        <span className="label">Full name:</span>
                        <span className="border" />
                      </label>
                    </Col>
                  </Row>
                </CardBody>
                <div className="submit-button">
                  <Button color="info" outline block onClick={this.submit}>
                    {" "}
                    Register{" "}
                  </Button>
                </div>
              </Card>
            ) : (
              <Card>
                <CardBody>
                  <h3 style={{ textAlign: "center" }}>
                    Thanks for Registering <strong>{fullName}.</strong> Please show
                    this to any of the Registration Officials to collect your
                    programme sheet.
                  </h3>
                  <div className="submit-button">
                  <Link to='/app' >
                    <Button color="success" outline block>
                      {" "}
                      Continue{" "}
                    </Button>
                  </Link>
                  </div>
                </CardBody>
              </Card>
            )}
          </BlockUI>
        </div>
      </div>
    );
  }
}

export default connect()(Feedback);
