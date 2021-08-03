import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute: React.FC<any> = ({ children, ...rest }) => {
  const accessToken = localStorage.getItem("accessToken");

  return (
    <Route
      {...rest}
      render={({ location }) =>
        accessToken ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/user/auth/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
