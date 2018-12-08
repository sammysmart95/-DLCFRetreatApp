import React, { Component } from "react";
import './Login.css'
import logo from "../../logo.svg";
import { Button } from "../../components";
import { callApi } from "../../utils";
import { config } from '../../config'
import Theme from '../../theme'

class WelcomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  // verifyServerRunning = () => {
  //   callApi("/express_backend")
  //     .then(data => {
  //       console.log(data)
  //     })
  //     .catch(err => console.log(err));
  // };

  componentDidMount() {
    // this.verifyServerRunning()
  }

  render() {
    return (
      <div className="login-container" >
      <div className='login-form' >
        <input type="text"/>
      </div>
      </div>
    );
  }
}

export default WelcomePage;
