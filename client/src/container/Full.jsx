import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import WelcomePage from '../views/WelcomePage/WelcomePage'

class Full extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
        <Switch>
          <Route path="/" name="Welcome Page" component={WelcomePage} />
        </Switch>
    );
  }
}

export default connect()(Full);
