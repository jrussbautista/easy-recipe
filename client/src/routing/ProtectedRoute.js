import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user, loading } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (user && !loading) {
          return <Component {...rest} {...props} />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
