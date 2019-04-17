import React, { Component } from "react";
import { Card, Button, CardBody, CardHeader, Row, Col } from "reactstrap";
import { showError, showInfo } from "../../actions/feedback";
import { connect } from "react-redux";
import BlockUI from "react-block-ui";
import { callApi } from "../../utils";
import { Link } from 'react-router-dom'
import "./Testimonies.css";

class Testimonies extends Component {
  constructor() {
    super();
    this.state = {
      blocking: false,
      inputs: {
        phoneNumber: "",
        fullName: "",
        testimony: "",
        category: "",
      },
      success: false
    };
  }

  submit = () => {
    const {
      phoneNumber, fullName, testimony, category
    } = this.state.inputs;
    if (!phoneNumber) {
        return this.props.dispatch(showError("Phone Number is required"))
    }
    if (!fullName) {
        return this.props.dispatch(showError("Provide full name"))
    }
    if (!testimony) {
        return this.props.dispatch(showError("Submit your testimony"))
    }
    if (!category) {
      return this.props.dispatch(showError("Please select a category"))
    }
    callApi('/submitTestimony', this.state.inputs, 'POST').then(data => {
      this.props.dispatch(showInfo("Submitted"))
      this.setState({
        success: true
      })
    }).catch(err => this.props.dispatch(showError("Please try again later")))
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
      phoneNumber,
      fullName,
      testimony
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
            Testimony
          </CardHeader>
        </div>
        <div className="body-container testimonies">
          <BlockUI blocking={this.state.blocking}>
            {!this.state.success ? (
              <Card>
                <CardBody>
                  <Row>
                  <Col md={6}>
                      <label htmlFor="fullName" className="inp">
                        <input
                          type="text"
                          id="fullName"
                          placeholder="&nbsp;"
                          className="styled-input"
                          name="fullName"
                          onChange={this.handleInputChange}
                          value={fullName}
                        />
                        <span className="label">Full Name</span>
                        <span className="border" />
                      </label>
                    </Col>
                    <Col md={6}>
                      <label htmlFor="phoneNumber" className="inp">
                        <input
                          type="text"
                          id="phoneNumber"
                          placeholder="&nbsp;"
                          className="styled-input"
                          name="phoneNumber"
                          value={phoneNumber}
                          onChange={this.handleInputChange}
                        />
                        <span className="label">Phone Number</span>
                        <span className="border" />
                      </label>
                    </Col>
                    <Col md={6}>
                      <div className="select-div">
                        <label className="select-container">
                          {" "}
                          Member
                          <input
                            type="radio"
                            name="category"
                            id="member"
                            value="member"
                            onChange={this.handleInputChange}
                          />{" "}
                          <span className="checkmark" />
                        </label>
                        <label className="select-container">
                          {" "}
                          Invitee
                          <input
                            type="radio"
                            name="category"
                            id="invitee"
                            value="invitee"
                            onChange={this.handleInputChange}
                          />{" "}
                          <span className="checkmark" />
                        </label>
                      </div>
                    </Col>
                    <Col md={6}>
                      <span className="label">Testimony</span>
                      <textarea
                        type="text"
                        id="testimony"
                        placeholder="&nbsp;"
                        className="styled-input styled-textarea"
                        name="testimony"
                        value={testimony}
                        onChange={this.handleInputChange}
                      />
                      <span className="border" />
                    </Col>
                  </Row>
                </CardBody>
                <div className="submit-button">
                  <Button color="info" outline block onClick={this.submit}>
                    {" "}
                    Submit{" "}
                  </Button>
                </div>
              </Card>
            ) : (
                <Card>
                  <CardBody>
                    <h3 style={{ textAlign: "center" }}>
                      Your testimony shall be permanent in Jesus Name. Amen.
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

export default connect()(Testimonies);
