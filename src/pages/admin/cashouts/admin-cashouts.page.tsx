import React from "react";
import AdminTopNavbar from "../../../components/shared/admin-top-navbar/admin-top-navbar";
import WithAdminAuth from "../../../hoc/with-admin-auth";

const AdminCashoutsPage = () => {
  return (
    <>
      <AdminTopNavbar />

      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 mt-8">
        <h1 className="text-4xl mb-5">Cashouts</h1>
        <h2>Looks like you don't have any membership yet</h2>
      </div>
    </>
  );
};

export default WithAdminAuth(AdminCashoutsPage);
