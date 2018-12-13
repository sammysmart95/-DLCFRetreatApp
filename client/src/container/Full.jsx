import React, { Component } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import WelcomePage from '../views/WelcomePage/WelcomePage'
import Login from '../views/Login/Login'
import AppPage from '../views/AppPage/AppPage'
import Register from '../views/Register/Register'
import RegisterPage from '../views/RegisterPage/RegisterPage'
import UploadPage from '../views/UploadFile/UploadFile'
import DownloadPage from '../views/Downloads/Downloads'
import AuthContainer from './Auth.jsx'

class Full extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
        <Switch>
          <Route path='/register' name="Login Page" component={Register} />
          <Route path='/app' name='App Page' component={AppPage} />
          <Route path='/downloads' name='Upload File' component={DownloadPage} />
          <Route path='/register-menu' name="Register Page" component={RegisterPage} />
          <Route path='/welcome' name="Welcome Page" component={WelcomePage} />
          <Route path='/auth' name="Admin Page" component={AuthContainer} />
          <Redirect from="/" to="/welcome" />
        </Switch>
    );
  }
}

export default connect()(Full);
