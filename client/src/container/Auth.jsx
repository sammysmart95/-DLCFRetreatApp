import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import RegisterPage from "../views/RegisterPage/RegisterPage.jsx";
import UploadPage from "../views/UploadFile/UploadFile.jsx";
import AdminAppPage from "../views/AdminAppPage/AdminAppPage.jsx";
import Login from "../views/Login/Login.jsx";
import ParticipantList from "../views/ParticipantList/ParticipantList.jsx";
import FeedbackList from "../views/FeedbackList/FeedbackList.jsx"
import TestimonyList from "../views/TestimonyList/TestimonyList.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: this.props.authenticated,
      redirect: false,
      user: this.props.user ? this.props.user : null
    };
  }

  render() {
    const { authenticated } = this.state;
    return authenticated ? (
      <Switch>
        <Route
          path="/auth/adminAppPage"
          name="Admin Menu"
          component={AdminAppPage}
        />
        <Route path="/auth/login" name="Login Page" component={Login} />
        <Route
          path="/auth/register"
          name="Register Menu"
          component={RegisterPage}
        />
        <Route
          path="/auth/uploadFile"
          name="Upload File"
          component={UploadPage}
        />
        <Route
          path="/auth/participantList"
          name="Participant List"
          component={ParticipantList}
        />
        <Route
          path="/auth/feedbackList"
          name="Participant List"
          component={FeedbackList}
        />
        <Route path="/auth/testimonyList" name="Testimony List" component={TestimonyList} />
        <Redirect from="/auth/" to="/adminAppPage" />
      </Switch>
    ) : (
      <Switch>
        <Redirect from="/auth/" to="/login" />
      </Switch>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated,
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(App);
