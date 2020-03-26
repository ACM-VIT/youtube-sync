import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import landingPage from "./pages/landingPage/landingPage";
import dashboard from "./pages/dashboard/dashboard";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={landingPage} />
        <Route path="/dashboard" component={dashboard} />
      </Switch>
    </Router>
  );
}

export default App;
