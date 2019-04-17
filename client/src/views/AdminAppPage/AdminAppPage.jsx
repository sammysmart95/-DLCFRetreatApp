import React, { Component } from "react";
import { connect } from 'react-redux'
import { Card, CardText, CardBody, CardHeader, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "./AdminAppPage.css";

const MainMenu = [
  {
    id: "0001",
    name: "Register",
    route: "/auth/register",
    icon: "icon-edit"
  },
  {
    id: "0002",
    name: "Upload File",
    route: "/auth/uploadFile",
    icon: "icon-download-1"
  },
  {
    id: '003',
    name: 'Participants',
    route: '/auth/participantList',
    icon: 'icon-list'
  }, {
    id: '004',
    name: "Feedbacks",
    route: "/auth/feedbackList",
    icon: 'icon-list'
  }, {
    id: '005',
    name: "Testimonies",
    route: "/auth/testimonyList",
    icon: 'icon-list'
  }
];

class AdminAppPage extends Component {
  render() {
    return (
      <Card className="app-page-container">
        <CardHeader
          style={{
            textAlign: "center",
            backgroundColor: "#fff",
            fontSize: "20px",
            color: "#54688f"
          }}
        >
          Main Menu
        </CardHeader>
        <CardBody>
          <Row className="app-menu-container">
            {MainMenu.map(menu => (
              <Col md={3} key={menu.id}>
                <Link to={menu.route}>
                  <Card className="main-menu">
                    <i className={menu.icon} style={{ fontSize: "80px" }} />
                    <CardText style={{ fontSize: "30px", textAlign: "center" }}>
                      {menu.name}
                    </CardText>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </CardBody>
      </Card>
    );
  }
}

export default connect()(AdminAppPage);
