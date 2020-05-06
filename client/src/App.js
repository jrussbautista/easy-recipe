import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home, NotFound, Recipe } from "./pages";
import Layout from "./components/Layout";
import ScrollTop from "./components/ScrollTop";

function App() {
  return (
    <Router>
      <ScrollTop />
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/recipe/:id" exact>
            <Recipe />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
