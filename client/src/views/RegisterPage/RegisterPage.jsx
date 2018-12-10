import React, { Component } from "react";
import { Card, Button, CardBody, CardHeader, Row, Col } from "reactstrap";
import { showError, showInfo } from "../../actions/feedback";
import { connect } from 'react-redux'
import BlockUI from "react-block-ui";

import "./RegisterPage.css";
import { Link } from "react-router-dom";

class RegisterPage extends Component {
  constructor() {
    super();
    this.state = {
      blocking: false
    };
  }

  submit = () => {
    this.props.dispatch(showError('Error'))
  }

  render() {
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
                      />
                      <span className="label">Full name:</span>
                      <span className="border" />
                    </label>
                  </Col>
                  <Col md={6}>
                    <div className="select-div">
                      <label className="select-title"> Sex: </label>
                      <label className="select-container">
                        {" "}
                        Female
                        <input
                          type="radio"
                          name="sex"
                          id="sex"
                          value="female"
                        />{" "}
                        <span className="checkmark" />
                      </label>
                      <label className="select-container">
                        {" "}
                        Male
                        <input
                          type="radio"
                          name="sex"
                          id="sex"
                          value="male"
                        />{" "}
                        <span className="checkmark" />
                      </label>
                    </div>
                  </Col>
                  <Col md={6}>
                    <label htmlFor="address" className="inp">
                      <textarea
                        type="text"
                        id="address"
                        placeholder="&nbsp;"
                        className="styled-input styled-textarea"
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
                          value="female"
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
                          value="male"
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
                          value="female"
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
                          value="male"
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
                          value="male"
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
                          value="male"
                        />{" "}
                        <span className="checkmark" />
                      </label>
                    </div>
                  </Col>
                  <Col md={6}>
                    <label htmlFor="institution" className="inp">
                      <input
                        type="text"
                        id="institution"
                        placeholder="&nbsp;"
                        className="styled-input"
                      />
                      <span className="label">Institution</span>
                      <span className="border" />
                    </label>
                  </Col>
                  <Col md={6}>
                    <label htmlFor="course" className="inp">
                      <input
                        type="text"
                        id="course"
                        placeholder="&nbsp;"
                        className="styled-input"
                      />
                      <span className="label">Course of Study</span>
                      <span className="border" />
                    </label>
                  </Col>
                </Row>
              </CardBody>
              <div className="submit-button">
                <Button color="info" outline block onClick={this.submit} >
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
