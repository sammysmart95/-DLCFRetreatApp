import React, { Component } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import RegisterPage from '../views/RegisterPage/RegisterPage'
import UploadPage from '../views/UploadFile/UploadFile'
import AdminAppPage from '../views/AdminAppPage/AdminAppPage'

class Full extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
        <Switch>
          <Route path='/auth/register-menu' name='Upload File' component={RegisterPage} />
          <Route path='/auth/uploadFile' name='Upload File' component={UploadPage} />
          <Route path='/auth/adminAppPage' name='Admin Menu' component={AdminAppPage} />
          <Redirect from="/" to="/adminAppPage" />
        </Switch>
    );
  }
}

export default connect()(Full);
