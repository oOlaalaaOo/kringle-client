import React from "react";
import AdminTopNavbar from "../../../components/shared/admin-top-navbar/admin-top-navbar";
import WithAdminAuth from "../../../hoc/with-admin-auth";

const AdminDashboardPage = () => {
  return (
    <>
      <AdminTopNavbar />

      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 mt-8">
        <h1 className="text-4xl mb-5">Dashboard</h1>
      </div>
    </>
  );
};

export default WithAdminAuth(AdminDashboardPage);
