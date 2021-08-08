import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/home/home.page";
import NotFoundPage from "./pages/not-found/not-found.page";
import LoginPage from "./pages/user/auth/login/login.page";
// import ProtectedRoute from "./protected-routes";
import DashboardPage from "./pages/user/dashboard/dashboard.page";
import RegisterPage from "./pages/user/auth/register/register.page";
import AdminLoginPage from "./pages/admin/auth/login/admin-login.page";
import AdminDashboardPage from "./pages/admin/dashboard/admin-dashboard.page";
// import AdminProtectedRoute from "./admin-protected-routes";
import AdminMembershipsPage from "./pages/admin/memberships/admin-memberships.page";
import AdminCashoutsPage from "./pages/admin/cashouts/admin-cashouts.page";
import AdminUsersPage from "./pages/admin/users/admin-users.page";
import DownlinesPage from "./pages/user/downlines/downlines.page";
import CashoutPage from "./pages/user/cashout/cashout.page";
import AccountPage from "./pages/user/account/account.page";
import StorePage from "./pages/user/store/store.page";
import SellPage from "./pages/user/sell/sell.page";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/home">
          <HomePage />
        </Route>

        <Route path="/admin/dashboard">
          <AdminDashboardPage />
        </Route>
        <Route path="/admin/memberships">
          <AdminMembershipsPage />
        </Route>
        <Route path="/admin/cashouts">
          <AdminCashoutsPage />
        </Route>
        <Route path="/admin/users">
          <AdminUsersPage />
        </Route>
        <Route path="/admin/auth/login">
          <AdminLoginPage />
        </Route>

        <Route path="/user/dashboard">
          <DashboardPage />
        </Route>
        <Route path="/user/store">
          <StorePage />
        </Route>
        <Route path="/user/downlines/:referrerCode">
          <DownlinesPage />
        </Route>
        <Route path="/user/cashout/:membershipId">
          <CashoutPage />
        </Route>
        <Route path="/user/sell/:membershipId">
          <SellPage />
        </Route>
        <Route path="/user/account">
          <AccountPage />
        </Route>
        <Route path="/user/auth/login">
          <LoginPage />
        </Route>
        <Route path="/user/auth/register">
          <RegisterPage />
        </Route>

        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
