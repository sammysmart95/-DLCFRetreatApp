import React, { Component } from "react";
import { Card, Button, CardBody, CardHeader, Row, Col } from "reactstrap";
import { showError, showInfo } from "../../actions/feedback";
import { connect } from "react-redux";
import BlockUI from "react-block-ui";
import { callApi } from "../../utils";
import { Link } from 'react-router-dom'
import "./Feedback.css";

const TransportOptions = [
  {
    id: '001',
    name: 'Church Vehicle',
  }, {
    id: '002',
    name: 'Public Transport',
  }, {
    id: '003',
    name: 'Personal Vehicle',
  }, {
    id: '004',
    name: 'Others'
  }
]

const messageList = [
  // { id: 'message-0', name: 'Hope for dry bones' },
]

class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      blocking: false,
      inputs: {
        phoneNumber: "",
        message: "",
        transport: "",
        like: "",
        improvements: "",
        experience: "",
        category: "",
      },
      success: false
    };
  }

  submit = () => {
    const {
      phoneNumber, message, transport, like, improvements, experience, category
    } = this.state.inputs;

    console.log({
      phoneNumber, message, transport, like, improvements, experience
    })

    if (!improvements && !message && !transport && !like && !experience) {
      return this.props.dispatch(showError("Cannot submit empty form"))
    }
    if (!category) {
      return this.props.dispatch(showError("Please select a category"))
    }
    callApi('/submitFeedback', this.state.inputs, 'POST').then(data => {
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
      phoneNumber, message, transport, like, improvements, experience
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
            Feedback
          </CardHeader>
        </div>
        <div className="body-container feedback">
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
                          name="phoneNumber"
                          value={phoneNumber}
                          onChange={this.handleInputChange}
                        />
                        <span className="label">Phone Number (optional)</span>
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
                    
                    <Row>
                      <Col xs={5}>
                        <label htmlFor='transport' > How did you get to the camp? </label>
                      </Col>
                      <Col xs={7}>
                        <select name="transport" value={transport} id="transport" onChange={this.handleInputChange} className='styled-input' >
                          <option value="">Mode of Transport</option>
                          {TransportOptions.map(transport => <option value={transport.name} key={transport.id} > {transport.name} </option>)}
                        </select>
                      </Col>
                    </Row>
                    <Col md={6}>
                      <label htmlFor='message' >Which programme touched you the most?</label>
                      <select name="message" value={message} id="message" onChange={this.handleInputChange} className='styled-input' >
                          <option value="">Select message</option>
                          {messageList.map(message => <option value={message.name} key={message.id} > {message.name} </option>)}
                        </select>
                    </Col>
                    <Col md={6}>
                      <span className="label">What do you love the most about this camp?</span>
                      <input
                        type="text"
                        id="inp"
                        placeholder="&nbsp;"
                        className="styled-input"
                        name="like"
                        value={like}
                        onChange={this.handleInputChange}
                      />
                      <span className="border" />
                    </Col>
                    <Col md={6}>
                      <span className="label">What should be improved about this camp?</span>
                      <input
                        type="text"
                        id="inp"
                        value={improvements}
                        placeholder="&nbsp;"
                        className="styled-input"
                        name="improvements"
                        onChange={this.handleInputChange}
                      />
                      <span className="border" />
                    </Col>
                    <Col md={6}>
                      <span className="label">Please summarize your experience in this camp</span>
                      <textarea
                        type="text"
                        id="inp"
                        placeholder="&nbsp;"
                        value={experience}
                        className="styled-input styled-textarea"
                        name="experience"
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
                      Thanks for your feedback. Your spiritual welfare is our utmost concern and priority.
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
