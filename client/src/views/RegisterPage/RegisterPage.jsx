import React, { Component } from "react";
import { Card, Button, CardBody, CardHeader, Row, Col } from "reactstrap";
import { showError, showInfo } from "../../actions/feedback";
import { connect } from "react-redux";
import BlockUI from "react-block-ui";
import { callApi } from "../../utils";

import { history } from '../../App'

import "./RegisterPage.css";

class RegisterPage extends Component {
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
        ageGroup: ""
      }
    };
  }

  submit = () => {
    const {
      fullName,
      gender,
      address,
      phoneNumber,
      // email,
      status,
      denomination,
      category,
      // institution,
      // course,
      ageGroup
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
    if (!ageGroup) {
      return this.props.dispatch(showError("Select age group"));
    }
    callApi("/registerParticipant", this.state.inputs, "POST")
      .then(data => {
        this.props.dispatch(showInfo(data.message));
        history.push('/app')
      })
      .catch(err =>
        this.props.dispatch(
          showError("Please crosscheck your form and submit again")
        )
      );
  };

  resetState = () => {
    this.setState({
      ...this.state,
      inputs: {}
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
      course
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
                  <Col md={6}>
                    <div className="select-div">
                      <label className="select-title"> Gender: </label>
                      <label className="select-container">
                        {" "}
                        Female
                        <input
                          type="radio"
                          name="gender"
                          id="gender"
                          value="female"
                          onChange={this.handleInputChange}
                        />{" "}
                        <span className="checkmark" />
                      </label>
                      <label className="select-container">
                        {" "}
                        Male
                        <input
                          type="radio"
                          name="gender"
                          id="gender"
                          value="male"
                          onChange={this.handleInputChange}
                        />{" "}
                        <span className="checkmark" />
                      </label>
                    </div>
                  </Col>
                  <Col md={6}>
                    <Row>
                      <Col xs={5}>
                        <label className="select-title"> Age Group: </label>
                      </Col>
                      <Col xs={7}>
                        <label className="select-container">
                          {" "}
                          15 - 25
                          <input
                            type="radio"
                            name="ageGroup"
                            id="ageGroup"
                            value="15 - 25"
                            onChange={this.handleInputChange}
                          />{" "}
                          <span className="checkmark" />
                        </label>
                        <label className="select-container">
                          {" "}
                          26 - 35
                          <input
                            type="radio"
                            name="ageGroup"
                            id="ageGroup"
                            value="26 - 35"
                            onChange={this.handleInputChange}
                          />{" "}
                          <span className="checkmark" />
                        </label>
                        <label className="select-container">
                          {" "}
                          36 - above
                          <input
                            type="radio"
                            name="ageGroup"
                            id="ageGroup"
                            value="36 - above"
                            onChange={this.handleInputChange}
                          />{" "}
                          <span className="checkmark" />
                        </label>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={6}>
                    <label htmlFor="address" className="inp">
                      <textarea
                        type="text"
                        id="address"
                        placeholder="&nbsp;"
                        className="styled-input styled-textarea"
                        name="address"
                        value={address}
                        onChange={this.handleInputChange}
                      />
                      <span className="label">Address</span>
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
                    <label htmlFor="email" className="inp">
                      <input
                        type="text"
                        id="email"
                        placeholder="&nbsp;"
                        className="styled-input"
                        name="email"
                        value={email}
                        onChange={this.handleInputChange}
                      />
                      <span className="label">Email Address</span>
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
                          name="status"
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
                          name="status"
                          id="invitee"
                          value="invitee"
                          onChange={this.handleInputChange}
                        />{" "}
                        <span className="checkmark" />
                      </label>
                    </div>
                  </Col>
                  <Col md={6}>
                    <label htmlFor="denomination" className="inp">
                      <input
                        type="text"
                        id="denomination"
                        placeholder="&nbsp;"
                        className="styled-input"
                        name="denomination"
                        value={denomination}
                        onChange={this.handleInputChange}
                      />
                      <span className="label">
                        Denomination (Eg. Deeper Life){" "}
                      </span>
                      <span className="border" />
                    </label>
                  </Col>
                  <Col md={6}>
                    <div className="select-div">
                      <label className="select-container">
                        {" "}
                        Student
                        <input
                          type="radio"
                          name="category"
                          id="student"
                          value="student"
                          onChange={this.handleInputChange}
                        />{" "}
                        <span className="checkmark" />
                      </label>
                      <label className="select-container">
                        {" "}
                        Corper
                        <input
                          type="radio"
                          name="category"
                          id="corper"
                          value="corper"
                          onChange={this.handleInputChange}
                        />{" "}
                        <span className="checkmark" />
                      </label>
                      <label className="select-container">
                        {" "}
                        Staff
                        <input
                          type="radio"
                          name="category"
                          id="staff"
                          value="staff"
                          onChange={this.handleInputChange}
                        />{" "}
                        <span className="checkmark" />
                      </label>
                      <label className="select-container">
                        {" "}
                        Others
                        <input
                          type="radio"
                          name="category"
                          id="others"
                          value="others"
                          onChange={this.handleInputChange}
                        />{" "}
                        <span className="checkmark" />
                      </label>
                    </div>
                  </Col>
                  <Col md={6}>
                    <label htmlFor="course" className="inp">
                      <input
                        type="text"
                        id="course"
                        placeholder="&nbsp;"
                        className="styled-input"
                        name="course"
                        value={course}
                        onChange={this.handleInputChange}
                      />
                      <span className="label">Course of Study</span>
                      <span className="border" />
                    </label>
                  </Col>
                  <Col md={6}>
                    <label htmlFor="institution" className="inp">
                      <input
                        type="text"
                        id="institution"
                        placeholder="&nbsp;"
                        className="styled-input"
                        name="institution"
                        value={institution}
                        onChange={this.handleInputChange}
                      />
                      <span className="label">Institution</span>
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
          </BlockUI>
        </div>
      </div>
    );
  }
}

export default connect()(RegisterPage);
