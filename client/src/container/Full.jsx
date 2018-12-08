import React, { Component } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import WelcomePage from '../views/WelcomePage/WelcomePage'
import Login from '../views/Login/Login'
import AppPage from '../views/AppPage/AppPage'
import Register from '../views/Register/Register'

class Full extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
        <Switch>
          <Route path='/login' name="Login Page" component={Login} />
          <Route path='/app' name='App Page' component={AppPage} />
          <Route path='/register' name="Login Page" component={Register} />
          <Route path='/welcome' name="Login Page" component={WelcomePage} />
          <Redirect from="/" to="/welcome" />
        </Switch>
    );
  }
}

export default connect()(Full);
