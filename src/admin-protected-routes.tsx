import React from "react";
import { Redirect, Route } from "react-router-dom";

const AdminProtectedRoute: React.FC<any> = ({ children, ...rest }) => {
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
              pathname: "/admin/auth/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default AdminProtectedRoute;
