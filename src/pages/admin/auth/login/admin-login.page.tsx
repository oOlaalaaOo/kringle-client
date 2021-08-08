import React from "react";
import { useHistory } from "react-router";
import LoginForm from "../../../../components/shared/login-form/login-form";
import logo from "../../../../assets/images/logo.png";

const AdminLoginPage: React.FC<any> = () => {
  const history = useHistory();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto h-12 w-auto" src={logo} alt="Kringle UK" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <LoginForm
          asAdmin={true}
          onLoginSuccess={(value) => {
            if (value === true) {
              history.push("/admin/dashboard");
            }
          }}
        />
      </div>
    </div>
  );
};

export default AdminLoginPage;
