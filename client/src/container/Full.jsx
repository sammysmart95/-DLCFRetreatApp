import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Toolbar from '../components/Toolbar/Toolbar.jsx'
import Sidebar from '../components/SideBar/SideBar.jsx'
import BackDrop from '../components/BackDrop/BackDrop.jsx'

import WelcomePage from '../views/WelcomePage/WelcomePage.jsx'
import Login from '../views/Login/Login.jsx'
import Register from '../views/Register/Register.jsx'
import AppPage from '../views/AppPage/AppPage.jsx'
import RegisterPage from '../views/RegisterPage/RegisterPage.jsx'
import DownloadPage from '../views/Downloads/Downloads.jsx'
import Feedback from '../views/Feedback/Feedback.jsx'
import AuthContainer from './Auth.jsx'

import './Full.css'
import Testimonies from "../views/Testimonies/Testimonies.jsx";


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
          <Route path='/testimonies' name="Feedback Page" component={Testimonies} />
          <Route path='/admin-register' name="Admin Register Page" component={Register} />
          <Redirect from="/" to="/welcome" />
        </Switch>
        </main>
      </div>
    );
  }
}

export default connect()(Full);
