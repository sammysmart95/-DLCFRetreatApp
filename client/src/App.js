import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";

import Full from "./container/Full.jsx";
import Alert from './components/Alert'

// Body Style
import "./App.css"

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// Fontello
import "./fontello/css/fontello.css";

// BlockUI
import 'react-block-ui/style.css'

// Store
import { persistor, store } from "./store";

export const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <PersistGate persistor={persistor}>
            <Router history={history}>
              <Switch>
                <Route path="/" name="Home" component={Full} />
              </Switch>
            </Router>
          </PersistGate>
        <Alert />
        </div>
      </Provider>
    );
  }
}

export default App;
