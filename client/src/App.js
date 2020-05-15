import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  Home,
  NotFound,
  Recipe,
  Login,
  User,
  CreateRecipe,
  Recipes,
  Category,
  Register,
} from "./pages";
import Layout from "./components/Layout";
import ScrollTop from "./components/ScrollTop";
import { useAuth } from "./store";
import AppSkeleton from "./components/AppSkeleton";
import ProtectedRoute from "./components/Routing/ProtectedRoute";

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <AppSkeleton />;
  }

  return (
    <Router>
      <ScrollTop />
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
          <ProtectedRoute
            path="/recipe/create"
            exact
            component={CreateRecipe}
          />
          <Route path="/recipe/:id" exact>
            <Recipe />
          </Route>
          <Route path="/recipes" exact>
            <Recipes />
          </Route>
          <Route path="/category/:id" exact>
            <Category />
          </Route>
          <Route path="/user/:id" exact>
            <User />
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
