import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";

const App = () => (
  <div>
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));
