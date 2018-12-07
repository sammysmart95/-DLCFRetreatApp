import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import Full from "./container/Full";

// Store

// import the two exports from the last code snippet.
import { persistor, store } from "./store";
// import your necessary custom components.

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
        </div>
      </Provider>
    );
  }
}

export default App;
