import React, { Component } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import RegisterPage from "../views/RegisterPage/RegisterPage";
import UploadPage from "../views/UploadFile/UploadFile";
import AdminAppPage from "../views/AdminAppPage/AdminAppPage";
import PageLoading from "../components/PageLoading";
import Login from "../views/Login/Login";

import { callApi } from "../utils/index";
import { login } from "../actions/auth";

class Full extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: this.props.authenticated,
      redirect: false,
      user: this.props.user ? this.props.user : null
    };
  }

  render() {
    return (
      <Switch>
        <Route
          path="/auth/adminAppPage"
          name="Admin Menu"
          component={AdminAppPage}
        />
        <Route path="/auth/login" name="Login Page" component={Login} />
        <Route
          path="/auth/register-menu"
          name="Register Menu"
          component={RegisterPage}
        />
        <Route
          path="/auth/uploadFile"
          name="Upload File"
          component={UploadPage}
        />
        <Redirect from="/auth" to="/adminAppPage" />
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

export default connect(mapStateToProps)(Full);
