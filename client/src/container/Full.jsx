import React, { Component } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Toolbar from '../components/Toolbar/Toolbar'
import Sidebar from '../components/SideBar/SideBar'
import BackDrop from '../components/BackDrop/BackDrop'

import WelcomePage from '../views/WelcomePage/WelcomePage'
import Login from '../views/Login/Login'
import AppPage from '../views/AppPage/AppPage'
import Register from '../views/Register/Register'
import RegisterPage from '../views/RegisterPage/RegisterPage'
import DownloadPage from '../views/Downloads/Downloads'
import Feedback from '../views/Feedback/Feedback'
import AuthContainer from './Auth.jsx'

import './Full.css'


class Full extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideDrawerOpen: false
    }
  }

  handleDrawerToggleClick = () => {
    this.setState(prevState => ({
      sideDrawerOpen: !prevState.sideDrawerOpen
    }))
  }

  handleBackDropClick = () => {
    this.setState({
      sideDrawerOpen: false
    })
  }

  render() {
    const { sideDrawerOpen } = this.state
    let backDrop
    if (sideDrawerOpen) {
      backDrop = <BackDrop backDropClickHandler = {this.handleBackDropClick} />
    }
    return (
      <div className='App' >
        <Toolbar drawerClickHandler = {this.handleDrawerToggleClick} />
        <Sidebar show={sideDrawerOpen} />
        {backDrop}
        <main>
        <Switch>
          <Route path='/login' name="Login Page" component={Login} />
          <Route path='/app' name='App Page' component={AppPage} />
          <Route path='/downloads' name='Upload File' component={DownloadPage} />
          <Route path='/register' name="Register Page" component={RegisterPage} />
          <Route path='/welcome' name="Welcome Page" component={WelcomePage} />
          <Route path='/auth' name="Admin Page" component={AuthContainer} />
          <Route path='/feedback' name="Feedback Page" component={Feedback} />
          <Route path='/admin-register' name="Admin Register Page" component={Register} />
          <Redirect from="/" to="/welcome" />
        </Switch>
        </main>
      </div>
    );
  }
}

export default connect()(Full);
