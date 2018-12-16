import React, { Component } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import RegisterPage from "../views/RegisterPage/RegisterPage";
import UploadPage from "../views/UploadFile/UploadFile";
import AdminAppPage from "../views/AdminAppPage/AdminAppPage";
import PageLoading from "../components/PageLoading";
import Login from "../views/Login/Login";
import ParticipantList from "../views/ParticipantList/ParticipantList";

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
        <Redirect from="/auth" to="/adminAppPage" />
      </Switch>
    ) : (
      <Switch>
        <Redirect from="/auth" to="/login" />
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
